import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { merge, fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, map } from 'rxjs/operators';
import { formatDate } from '@angular/common';

import {MatDialog} from '@angular/material/dialog';
import { DialogConfirmationComponent } from '../details/dialogs/dialog-confirm.component';

import { DocumentsService } from '../../services/documents.service';
import { UsersService } from '../../services/users.service';
import { ProductsDataSource } from '../../services/products.datasource';
import { ProductsService } from '../../services/products.service';

import { DocumentN } from '../../models/document_N';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.scss']
})
export class AddTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[];
  dataSource: ProductsDataSource;
  resultsLength = 0;
  idN: number;
  userID: string;
  userName$: Observable<string>;
  userRole: string;
  docType: string;

  documentN: DocumentN = new DocumentN();

  docDate: string;
  fillError = [];
  coloredRows = [];

  documentPIds: object = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('documentsFilter') input: ElementRef;

  constructor(
    private documentsService: DocumentsService,
    private productsService: ProductsService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.dataSource = new ProductsDataSource(this.documentsService);

    this.getProductsLength();
    this.userID = this.route.parent.snapshot.params.id;


    this.route.paramMap.pipe(
      map((params: ParamMap) => {
        return this.docType = params.get('type');
      })
    ).subscribe(() => {
      this.getUserRole();
      this.idN = 0;
      this.dataSource.loadProducts('', 'asc', 'nazwa', 0, 10, this.idN);
      this.setUpDocumentN();
      this.getUserName(this.userID);

      this.documentPIds = {};
      this.fillError = [];
      this.coloredRows = [];
    });
  }

  getProductsLength(): void {
    this.productsService.getProductsLength().subscribe(total => this.resultsLength = total);
  }

  getUserName(id: string): void {
    this.userName$ = this.usersService.getUserName(id);
  }

  getUserRole(): void {
    this.usersService.getUserRole(this.userID).subscribe(role => {
      this.userRole = role;
      if (this.userRole === 'biuro' || this.userRole === 'inni') {
        this.displayedColumns = ['nazwa', 'grupa', 'uwagi', 'stan', 'ilosc'];
        if (this.docType === 'PZ' || this.docType === 'I') {
          this.displayedColumns = this.displayedColumns.filter(val => val !== 'stan');
        }
      } else {
        this.displayedColumns = ['nazwa', 'grupa', 'uwagi', 'stan', 'ilosc', 'cena'];
        if (this.docType === 'PZ' || this.docType === 'I') {
          this.displayedColumns = this.displayedColumns.filter(val => val !== 'stan');
        }
      }

    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
            this.paginator.pageIndex = 0;

            this.loadProductsPage();
        })
    )
    .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadProductsPage())
    )
    .subscribe();
  }

  loadProductsPage() {
    this.dataSource.loadProducts(
      this.input.nativeElement.value,
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.idN);
  }

  updateTable(value: string, row: any, name: string) {
    if (value.trim().length > 0 || row[name]) {
      row[name] = value;

      if ((row.stan >= 0 && row.ilosc > 0) || ((this.docType === 'PZ' || this.docType === 'I') && Number(row.ilosc) > 0)) {
        if (this.idN) {
          this.save(row);

        } else {
          this.create(row);
        }
        this.coloredRows[row.id] = true;
        this.fillError[row.id] = false;
      } else if (row.stan && !row.ilosc || !row.stan && row.ilosc || !row.stan) {
        this.fillError[row.id] = true;

      }

      const usedRows = Object.values(row).filter(e => e);
      if (usedRows.length <= 3 && this.documentPIds[row.id]) {
        this.documentsService.deleteDocumentP(this.documentPIds[row.id])
        .subscribe(() => {
          delete this.documentPIds[row.id];

          if (Object.values(this.documentPIds).length === 0) {
            this.deleteN();
          }
        });

        this.coloredRows[row.id] = false;
        this.fillError[row.id] = false;


      } else if (usedRows.length <= 3) {
        this.fillError[row.id] = false;
      }
    }
  }

  setUpDocumentN(): void {
    this.docDate = formatDate(new Date(), 'y/M/d', 'pl', 'UTC +2');

    this.documentN.uzytkownik_id = Number(this.userID);
    this.documentN.data = this.docDate;
    this.documentN.rodzaj_dok = this.docType;
    if (this.docType === 'WZ' || this.docType === 'ZN') {
      this.documentN.mnoznik = -1;
    } else if (this.docType === 'Z') {
      this.documentN.mnoznik = 0;
    } else {
      this.documentN.mnoznik = 1;
    }

  }

  deleteN(): void {
    if (this.idN) {
      this.documentsService.deleteDocumentN(this.idN).subscribe();
    }
  }

  create(row: any): void {
    this.documentN.status = 'edycja';
    this.documentsService.addDocument(row, this.documentN).subscribe(data => {

      this.idN = data.IDN;
      this.documentPIds[row.id] = data.idP;
    });
  }

  save(row: any): void {
    this.documentsService.updateDocumentP(row, this.idN).subscribe(data => {

      if (data.idP) {
        this.documentPIds[row.id] = data.idP;
      }
    });
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      disableClose: true,
      data: 'Czy dokument już jest gotowy?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result && Object.values(this.documentPIds).length) {
        this.documentN.status = 'gotowy';
        this.documentN.id = this.idN;
        this.documentsService.updateDocumentN(this.documentN).subscribe(data => {

           this.router.navigate(['../../look', this.docType], { relativeTo: this.route });
        });
      }
    });
  }
}
