import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';

import { DocumentsService } from '../../services/documents.service';
import { ProductsService } from '../../services/products.service';
import { UsersService } from '../../services/users.service';
import { DocumentN } from '../../models/document_N';
import { DocumentP } from '../../models/document_P';
import { Product } from '../../models/product';
import { DatailsTableDataSource } from './details.datasource';
import { DialogDetailsEditComponent } from './dialogs/dialog-details-edit.component';
import { DialogAddTowarComponent } from './dialogs/dialog-add-towar.component';
import { DialogConfirmationComponent } from './dialogs/dialog-confirm.component';
import { DialogDeleteConfirmComponent } from '../manage/dialogs/dialog-delete-confirm.component';


@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit, AfterViewInit {
  resultLength: number;
  displayedColumns = ['nazwa', 'stan', 'ilosc', 'stanMag', 'uwagi', 'cena', 'akcje'];
  dataSource: DatailsTableDataSource;
  idN: string;
  userID: string;
  typeDoc: string;
  status: string;
  documentN: DocumentN;
  userRole: string;
  products: Product[];
  docUserName$: Observable<string>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentsService: DocumentsService,
    private dialog: MatDialog,
    private usersService: UsersService,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.userID = this.route.parent.snapshot.params.id;
    this.getUserRole(this.userID);
    this.dataSource = new DatailsTableDataSource(this.documentsService);
    this.route.paramMap.pipe(
        map((params: ParamMap) => params.get('id')
      )
    ).subscribe((id) => {
      this.idN = id;
      this.paginator.pageIndex = 0;
      this.documentsService.getDocumentN(this.idN).subscribe(data => {

        this.status = data.status;
        this.typeDoc = data.rodzaj_dok;
        this.documentN = data;
        this.getDocumentNUserName(data.uzytkownik_id.toString());
      });

      this.getDocumentPLength();
      this.dataSource.loadDocumentsData(
        this.sort.direction || 'asc',
        this.sort.active || 'nazwa',
        0,
        this.paginator.pageSize || 10,
        this.idN
      );

      this.getProducts();
    });
  }

  getUserRole(id: string): void {
    this.usersService.getUserRole(id).subscribe(data => {
      this.userRole = data;
      if (this.userRole === 'biuro' || this.userRole === 'inni') {
        this.displayedColumns = ['nazwa', 'stan', 'ilosc', 'uwagi', 'akcje'];
      }
    });
  }

  getDocumentNUserName(id: string) {
    this.docUserName$ = this.usersService.getUserName(id);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadDocumentsPage())
    )
    .subscribe();
  }

  loadDocumentsPage() {
    this.dataSource.loadDocumentsData(
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.idN);
  }

  getProducts(): void {
    this.productsService.getDistinctProducts(this.idN).subscribe(prod => this.products = prod);
  }

  getDocumentPLength(): void {
    this.documentsService.getDocumentPLength(this.idN).subscribe(length => this.resultLength = length);
  }

  openEditDialog(row: any): void {
    const dialogRef = this.dialog.open(DialogDetailsEditComponent, {
      width: '300px',
      data: {
        row,
        role: this.userRole
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result && result.stan >= 0 && result.ilosc > 0) {
        this.documentsService.updateDocumentPSingle(result).subscribe(data => {

          this.loadDocumentsPage();
        });
      }
    });
  }

  openAddTowarDialog(): void {
    const documentP: DocumentP = new DocumentP();
    const dialogRef = this.dialog.open(DialogAddTowarComponent, {
      width: '400px',
      data: {
        products: this.products,
        documentP,
        role: this.userRole
      }

    });

    dialogRef.afterClosed().subscribe((result: DocumentP) => {

      if (result && result.stan >= 0 && result.ilosc > 0 && result.id) {
        this.documentsService.updateDocumentP(result, this.idN).subscribe(data => {

          this.getDocumentPLength();
          this.loadDocumentsPage();
          this.getProducts();
        });
      } else if (result && !result.id) {
       alert('Nie dobrze wypełniony formular! Sprobuj ponownie.');
      }
    });
  }

  openConfirmDialog(status: string): void {
    let msg: string;
    if (status === 'anulowany') {
      msg = 'Czy napewno chcesz anulować dokument?';
    } else {
      msg = 'Czy dokument już jest gotowy?';
    }

    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      disableClose: true,
      data: msg
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.updateStatus(status);
      }
    });
  }

  delete(row: any): void {
    this.documentsService.deleteDocumentP(row.id).subscribe(data => {
      this.getDocumentPLength();
      this.loadDocumentsPage();
      this.getProducts();
    });

  }

  makeWz(): void {
    this.documentsService.copyToWZ(this.idN).subscribe();
    this.updateStatus('zrobione wz');
  }

  updateStatus(status: string): void {
    this.documentsService.updateStatus(this.idN, status).subscribe(data => {
      this.router.navigate(['../../look', this.typeDoc], { relativeTo: this.route });
    });
  }

  print(): void {
    window.print();
  }

  openDeleteConfirm(row: any): void {
    const dialogRef = this.dialog.open(DialogDeleteConfirmComponent, {
      width: '300px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(row);
      }
    });
  }

}
