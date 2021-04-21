import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { merge } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';

import { DocumentsService } from '../../services/documents.service';
import { LookTableDataSource } from '../../services/look.datasource';
import { UsersService } from '../../services/users.service';
import { DialogDeleteConfirmComponent } from '../manage/dialogs/dialog-delete-confirm.component';

@Component({
  selector: 'app-look-table',
  templateUrl: './look-table.component.html',
  styleUrls: ['./look-table.component.scss']
})
export class LookTableComponent implements OnInit, AfterViewInit {
  resultLength = 0;
  displayedLookColumns = ['id', 'data', 'lokal', 'status', 'akcje'];
  dataSourceLookTable: LookTableDataSource;
  typeOfDoc: string;
  currentUserID: string;
  userRole: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private documentsService: DocumentsService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    public router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.currentUserID = this.route.snapshot.parent.params.id;
    this.usersService.getUserRole(this.currentUserID).subscribe(role => this.userRole = role);

    this.route.paramMap.pipe(
      map((params: ParamMap) => {
        this.typeOfDoc = params.get('type');
        return this.typeOfDoc;
      })
    ).subscribe(() => {
      this.paginator.pageIndex = 0;
      this.documentsService.getDocumentNLength(this.typeOfDoc, this.currentUserID)
        .subscribe(total => this.resultLength = total);
      this.dataSourceLookTable = new LookTableDataSource(this.documentsService);
      this.dataSourceLookTable.loadManageData(
        this.sort.direction || 'desc',
        this.sort.active || 'id',
        0,
        this.paginator.pageSize || 10,
        this.typeOfDoc,
        this.currentUserID
        );
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadProductsPage())
    )
    .subscribe();
  }

  loadProductsPage() {
    this.dataSourceLookTable.loadManageData(
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.typeOfDoc,
      this.currentUserID);
  }

  delete(row: any): void {
    this.documentsService.deleteDocumentN(row.id).subscribe(data => {
      this.documentsService.getDocumentNLength(this.typeOfDoc, this.currentUserID).subscribe(length => this.resultLength = length);
      this.loadProductsPage();
    });
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
