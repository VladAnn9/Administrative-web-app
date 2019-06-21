import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { merge, fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { switchMap } from 'rxjs/operators';

import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../add-new/DialogComponent';

import { DocumentsService } from '../../services/documents.service';
import { UsersService } from '../../services/users.service';
import { ProductsDataSource } from '../../services/products.datasource';
import { ProductsService } from '../../services/products.service';
// import { DocumentP } from '../../models/document_P';
import { DocumentN } from '../../models/document_N';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.scss']
})
export class AddTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nazwa', 'grupa', 'uwagi', 'stan', 'ilosc', 'cena'];
  dataSource: ProductsDataSource;
  resultsLength = 0;
  idN: number;
  userID: number;
  userName$: Observable<string>;
  docType: string;
  // @Output() saveDocument = new EventEmitter();
  documentN: DocumentN = new DocumentN();

  docDate: string;
  fillError = [];
  coloredRows = [];
  // documentP: DocumentP[] = [];
  // pageProducts = [];
  specialProducts = [];
  documentPIds = [];

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
    this.dataSource.loadProducts('', 'asc', 'nazwa', 0, 10, this.idN);
    this.getProductsLength();

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.docType = params.get('type');
      })
    ).subscribe(() => {
      this.userID = this.route.parent.snapshot.params.id;
      this.setUpDocumentN();
      this.getUserName(this.userID);
    });
  }

  getProductsLength(): void {
    this.productsService.getProductsLength().subscribe(total => this.resultsLength = total);
  }

  getUserName(id: number): void {
    this.userName$ = this.usersService.getUserName(id);
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
    .subscribe(data => console.log(data));
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
      // console.log(value);

      if (row.stan >= 0 && row.ilosc > 0) {
        // POST
        if (this.idN) {
          this.save(row);

        } else {
          this.create(row);
        }

        this.coloredRows[row.id] = true;
        this.fillError[row.id] = false;
      } else if (row.stan && !row.ilosc || !row.stan && row.ilosc || !row.stan) {
        // Warning
        this.fillError[row.id] = true;
        // console.log(this.fillError);
      } else {
        // this.fillError[row.id] = true;
      }

      const usedRows = Object.values(row).filter(e => e);
      if (usedRows.length <= 3) {
        this.documentsService.deleteDocumentP(this.documentPIds[row.id])
        .subscribe(data => data ? console.log(data) : '');

        this.coloredRows[row.id] = false;
        this.fillError[row.id] = false;
      }

      console.log(row);
    }
  }

  setUpDocumentN(): void {
    this.docDate = formatDate(new Date(), 'yy/M/d', 'pl', 'UTC +2');
    console.log(this.docDate);
    this.documentN.uzytkownik_id = this.userID;
    this.documentN.data = this.docDate;
    this.documentN.rodzaj_dok = this.docType;
    if (this.docType === 'WZ' || this.docType === 'ZN') {
      this.documentN.mnoznik = -1;
    } else if (this.docType === 'Z') {
      this.documentN.mnoznik = 0;
    } else {
      this.documentN.mnoznik = 1;
    }
    console.log(this.documentN);
  }

  create(row: any): void {
    this.documentN.status = 'edycja';
    this.documentsService.addDocument(row, this.documentN).subscribe(data => {
      console.log(data);
      this.idN = data.IDN;
      this.documentPIds[row.id] = data.idP;
    });
  }

  save(row: any): void {
    this.documentsService.updateDocumentP(row, this.idN).subscribe(data => {
      console.log(data);
      if (data.idP) {
        this.documentPIds[row.id] = data.idP;
      }
    });
  }

  done(): void {
    this.documentN.status = 'gotowy';
    this.documentN.id = this.idN;
    this.documentsService.updateDocumentN(this.documentN).subscribe(data => {
       console.log(data);
       this.router.navigate(['../../look', this.docType], { relativeTo: this.route });
    });
    // this.selectedTab = 1;
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result && result.nazwa && result.stan >= 0 && result.ilosc > 0) {
        this.specialProducts.push(result);
        console.log(this.specialProducts);
      }
    });
  }
}
