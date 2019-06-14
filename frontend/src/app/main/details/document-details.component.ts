import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';

import { DocumentsService } from '../../services/documents.service';
import { UsersService } from '../../services/users.service';
// import { DocumentP } from '../../models/document_P';
import { DatailsTableDataSource } from './details.datasource';
import { DialogDetailsComponent } from './dialog-details-component';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit, AfterViewInit {
  resultLength = 0;
  displayedColumns = ['nazwa', 'stan', 'ilosc', 'stanMag', 'uwagi', 'akcje'];
  dataSource: DatailsTableDataSource;
  idN: string;
  userID: string;
  typeDoc$: Observable<string>;
  userRole$: Observable<string>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentsService: DocumentsService,
    private dialog: MatDialog,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    // this.documentsService.getDocumentNLength().subscribe(total => this.resultLength = total);
    this.userID = this.route.parent.snapshot.params.id;
    this.getUserRole(this.userID);
    this.dataSource = new DatailsTableDataSource(this.documentsService);
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.idN = params.get('id');
        // return this.typeDoc = params.get('type');
      })
    ).subscribe(() => {
      this.typeDoc$ = this.documentsService.getDocNType(this.idN);
      this.documentsService.getDocumentPLength(this.idN).subscribe(length => this.resultLength = length);
      this.dataSource.loadDocumentsData('asc', 'nazwa', 0, 10, this.idN);
    });

  }

  getUserRole(id: string): void {
    this.userRole$ = this.usersService.getUserRole(id);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadDocumentsPage())
    )
    .subscribe(data => console.log(data));
  }

  loadDocumentsPage() {
    this.dataSource.loadDocumentsData(
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.idN);
  }

  openDialog(row: any): void {
    const dialogRef = this.dialog.open(DialogDetailsComponent, {
      width: '300px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result && result.stan >= 0 && result.ilosc > 0) {
        this.documentsService.updateDocumentPSingle(result).subscribe(data => console.log(data));
      }
    });
  }

  delete(row: any): void {
    // console.log(this.dataSource);
    console.log(row);
    this.documentsService.deleteDocumentP(row.id).subscribe(data => {
      console.log(data);
      this.documentsService.getDocumentPLength(this.idN).subscribe(length => this.resultLength = length);
      this.loadDocumentsPage();
    });
  }

  makeWz(): void {
    // TODO -> check if the document is bigger the 0
    this.documentsService.copyToWZ(this.idN).subscribe(data => console.log(data));
    // this.router.navigate(['/details', this.idN, 'WZ']);
  }

}
