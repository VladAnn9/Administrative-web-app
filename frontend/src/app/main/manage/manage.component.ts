import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';

import { MainTablesService } from '../../services/main-tables.service';
// import { DocumentP } from '../../models/document_P';
import { User } from '../../models/user';
import { ManageDataSource } from './manage.datasource';
import { DialogMainEditComponent } from './dialogs/dialog-main-edit.component';
import { DialogAddComponent } from './dialogs/dialog-add.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, AfterViewInit {
  resultLength = 0;
  displayedColumns: string[];
  // ['id', 'nazwa', 'haslo', 'uprawnienie', 'lokalizacjaId', 'aktywny'];
  dataSource: ManageDataSource;
  kindOfTable: string;
  columnsForAddDialog: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tablesService: MainTablesService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSource = new ManageDataSource(this.tablesService);
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.kindOfTable = params.get('kind'))
    ).subscribe(() => {

      // create forkJoin function
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
            this.kindOfTable);
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
    .subscribe(data => console.log(data));
  }

  loadTablePage() {
    this.dataSource.loadManageData(
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.kindOfTable);
  }

  delete(row: any): void {
    console.log(row);

    this.tablesService.deleteMainTable(row.id, this.kindOfTable).subscribe(data => {
      console.log(data);
      this.tablesService.getLength(this.kindOfTable).subscribe(total => this.resultLength = total);
      this.loadTablePage();
    });

  }

  openEditDialog(row: any): void {
    console.log(row);
    const dialogRef = this.dialog.open(DialogMainEditComponent, {
      width: '350px',
      data: {
        row,
        table: this.kindOfTable
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit dialog was closed');
      console.log(result);

      if (result && result.nazwa && !isNaN(Number(result.ilosc_alarm))) {
        this.tablesService.updateMainTable(result, this.kindOfTable).subscribe(data => {
          console.log(data);
          this.loadTablePage();
        });
      } else if (result && result.nazwa && !result.ilosc_alarm) {
        this.tablesService.updateMainTable(result, this.kindOfTable).subscribe(data => {
          console.log(data);
          this.loadTablePage();
        });
      }
      this.loadTablePage();
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
      console.log('The add dialog was closed');
      console.log(result);
      let serverRespond: any;
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
          console.log(data);
          this.loadTablePage();
        });
      }
    });
  }

}
