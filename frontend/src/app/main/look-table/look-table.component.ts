import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { merge, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

import { DocumentsService } from '../../services/documents.service';
import { DocumentN } from '../../models/document_N';
import { LookTableDataSource } from '../../services/look.datasource';

@Component({
  selector: 'app-look-table',
  templateUrl: './look-table.component.html',
  styleUrls: ['./look-table.component.scss']
})
export class LookTableComponent implements OnInit, AfterViewInit {
  resultLength = 0;
  displayedLookColumns = ['id', 'data', 'lokal', 'status'];
  dataSourceLookTable: LookTableDataSource;
  typeOfDoc: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private documentsService: DocumentsService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.typeOfDoc = params.get('type');
      })
    ).subscribe(() => {
      this.documentsService.getDocumentNLength(this.typeOfDoc).subscribe(total => this.resultLength = total);
      this.dataSourceLookTable = new LookTableDataSource(this.documentsService);
      this.dataSourceLookTable.loadManageData('desc', 'data', 0, 10, this.typeOfDoc);
      console.log(this.typeOfDoc);
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadProductsPage())
    )
    .subscribe(data => console.log(data));
  }

  loadProductsPage() {
    this.dataSourceLookTable.loadManageData(
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.typeOfDoc);
  }

  details(row: any) {
    console.log(row);
    // this.router.navigate(['../details', row], { relativeTo: this.route });
  }

}
