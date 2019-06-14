import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';

import { MainTablesService } from '../../services/main-tables.service';
// import { DocumentP } from '../../models/document_P';
import { User } from '../../models/user';
import { ManageDataSource } from './manage.datasource';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, AfterViewInit {
  resultLength = 0;
  displayedColumns$: string[];
  // ['id', 'nazwa', 'haslo', 'uprawnienie', 'lokalizacjaId', 'aktywny'];
  dataSource: ManageDataSource;
  kindOfTable: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tablesService: MainTablesService
  ) { }

  ngOnInit() {
    this.dataSource = new ManageDataSource(this.tablesService);
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.kindOfTable = params.get('kind'))
    ).subscribe(() => {
      // this.displayedColumns$ = this.tablesService.getColumnsList(this.kindOfTable);

      this.tablesService.getLength(this.kindOfTable).subscribe(total => {
        this.resultLength = total;
        this.tablesService.getColumnsList(this.kindOfTable).subscribe(data => {
          this.displayedColumns$ = data;
          this.dataSource.loadManageData('asc', 'nazwa', 0, 10, this.kindOfTable);
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

}
