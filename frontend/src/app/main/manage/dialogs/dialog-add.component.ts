import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DocumentP} from '../../../models/document_P';
import {Product} from '../../../models/product';

import { MainTablesService } from '../../../services/main-tables.service';

@Component({
  selector: 'app-dialog-add',
  templateUrl: 'dialog-add.html',
  styles: [
    '.mat-dialog-actions { justify-content: space-between; }',
    'mat-form-field { display: block }'
  ]
})
export class DialogAddComponent implements OnInit {
  result: any = {};
  subTable: any[] = [];
  formControl = new FormControl();
  filteredValues: Observable<any[]>;

  constructor(
    public dialogRef: MatDialogRef<DialogAddComponent>,
    private mainTableService: MainTablesService,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {
    console.log(this.data);
  }

  ngOnInit() {
    if (this.data.table === 'materialy') {
      this.mainTableService.getSubTableForDialogEdit('grupy').subscribe(table => {
        this.subTable = table;
        this.filterFunc();
      });
    } else if (this.data.table === 'uzytkownicy') {
      this.mainTableService.getSubTableForDialogEdit('lokalizacje').subscribe(table => {
          this.subTable = table;
          this.filterFunc();
      });
    } else {
      this.subTable = null;
    }

// tslint:disable-next-line: no-string-literal
    this.result['aktywny'] = 1;
  }

  filterFunc() {
    this.filteredValues = this.formControl.valueChanges
    .pipe(
      startWith(''),
      map(value =>  this._filter(value))
    );
  }

  private _filter(value: string): Product[] {
    let filterValue;
    if (value.length > 0) {
      filterValue = value.toLowerCase();
    } else {
      filterValue = value;
    }
    return this.subTable
      .filter((el: any) => el.nazwa.toLowerCase().includes(filterValue) || el.id === Number(filterValue));
  }

  setID(value: number, col: string) {
    console.log(value);
    console.log(col);
    this.result[col] = value;
  }

  changeActive(e: any, col: string): void {
    console.log(e.checked);
    if (e.checked) {
      this.result[col] = 1;
    } else {
      this.result[col] = 0;
    }
  }

  save(value: string | number, col: string): void {
    if (value) {
      this.result[col] = value;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
