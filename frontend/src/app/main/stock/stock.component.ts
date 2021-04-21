import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MatPaginator, MatSort } from '@angular/material';
import { merge } from 'rxjs';

import { ProductsService } from '../../services/products.service';
import { MainTablesService } from '../../services/main-tables.service';
import { StanDataSource } from './stan.datasource';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit, AfterViewInit {

  displayedColumns = ['nazwa', 'stan'];
  resultLength = 0;
  dataSource: StanDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productsService: ProductsService,
    private mainTablesService: MainTablesService
  ) { }

  ngOnInit() {
    this.productsService.getProductsLength().subscribe(total => this.resultLength = total);
    this.dataSource = new StanDataSource(this.mainTablesService);
    this.dataSource.loadStanData(
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
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
    this.dataSource.loadStanData(
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize

    );
  }

  print(): void {
    window.print();
  }

}
