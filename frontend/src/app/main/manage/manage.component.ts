import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';

import { MainTablesService } from '../../services/main-tables.service';
import { ManageDataSource } from './manage.datasource';
import { DialogMainEditComponent } from './dialogs/dialog-main-edit.component';
import { DialogAddComponent } from './dialogs/dialog-add.component';
import { DialogDeleteConfirmComponent } from './dialogs/dialog-delete-confirm.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, AfterViewInit {
  resultLength = 0;
  displayedColumns: string[] = [];
  dataSource: ManageDataSource;
  kindOfTable: string;
  columnsForAddDialog: any;
  currentUserID: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private tablesService: MainTablesService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.currentUserID = this.route.snapshot.parent.params.id;
    this.dataSource = new ManageDataSource(this.tablesService);
    this.route.paramMap.pipe(
      map((params: ParamMap) => this.kindOfTable = params.get('kind'))
    ).subscribe(() => {
      this.paginator.pageIndex = 0;
      // fork Join
      this.tablesService.getLength(this.kindOfTable).subscribe(total => {
        this.resultLength = total;
        this.tablesService.getColumnsList(this.kindOfTable).subscribe(columns => {
          this.displayedColumns = columns;
          this.displayedColumns.push('akcje');

          const active = this.displayedColumns.includes(this.sort.active);
          this.sort.active = active ? this.sort.active : 'nazwa';
          this.dataSource.loadManageData(
            this.sort.direction,
            this.sort.active,
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.kindOfTable,
            this.currentUserID
          );
        });
      });
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadTablePage())
    )
    .subscribe();
  }

  loadTablePage() {
    this.dataSource.loadManageData(
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.kindOfTable,
      this.currentUserID
    );
  }

  delete(row: any): void {
    this.tablesService.deleteMainTable(row.id, this.kindOfTable).subscribe(data => {
      this.tablesService.getLength(this.kindOfTable).subscribe(total => this.resultLength = total);
      this.loadTablePage();
    });

  }

  openEditDialog(row: any): void {
    const dialogRef = this.dialog.open(DialogMainEditComponent, {
      width: '350px',
      data: {
        row,
        table: this.kindOfTable
      }
    });

    dialogRef.afterClosed().subscribe(result => {


      if (result && result.nazwa && !isNaN(Number(result.ilosc_alarm))) {
        this.tablesService.updateMainTable(result, this.kindOfTable).subscribe(data => {
          this.loadTablePage();
        });
      } else if (result && result.nazwa && !result.ilosc_alarm) {
        this.tablesService.updateMainTable(result, this.kindOfTable).subscribe(data => {
          this.loadTablePage();
        });
      } else {
        this.loadTablePage();
      }
    });
  }

  openAddDialog(): void {
    this.columnsForAddDialog = this.displayedColumns.filter(el => el !== 'id' && el !== 'akcje');
    const dialogRef = this.dialog.open(DialogAddComponent, {
      width: '350px',
      data: {
        columns: this.columnsForAddDialog,
        table: this.kindOfTable
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      let serverRespond: Observable<any>;
      if (result && (this.kindOfTable === 'materialy' || this.kindOfTable === 'uzytkownicy')) {
        if (result.grupa_id || result.lokalizacjaId) {

          if (Object.keys(result).length >= 3 && result.nazwa && !isNaN(Number(result.ilosc_alarm))) {
            serverRespond = this.tablesService.addToMainTable(result, this.kindOfTable);
          } else if (Object.keys(result).length >= 3 && result.nazwa && !result.ilosc_alarm) {
            serverRespond = this.tablesService.addToMainTable(result, this.kindOfTable);
          }
        }
      } else {
        if (result && result.nazwa && !isNaN(Number(result.ilosc_alarm))) {
          serverRespond = this.tablesService.addToMainTable(result, this.kindOfTable);
        } else if (result && result.nazwa && !result.ilosc_alarm) {
          serverRespond = this.tablesService.addToMainTable(result, this.kindOfTable);
        }
      }
      if (serverRespond) {
        serverRespond.subscribe((data: any) => {
          if (data) { alert(data); }

          this.tablesService.getLength(this.kindOfTable).subscribe(total => this.resultLength = total);
          this.loadTablePage();
        });
      }
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
