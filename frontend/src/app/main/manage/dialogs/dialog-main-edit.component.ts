import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainTablesService } from '../../../services/main-tables.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

interface Data {
  row: any;
  table: string;
}

@Component({
  selector: 'app-dialog-main-edit',
  templateUrl: 'dialog-main-edit.html',
  styles: [
    '.mat-dialog-actions { justify-content: space-between; }',
    'mat-form-field { display: block }'
  ]
})
export class DialogMainEditComponent implements OnInit {
  // tslint:disable-next-line: no-string-literal
  checked: number = this.data['aktywny'];
  subTable: any[] = [];
  formControl = new FormControl();
  filteredValues: Observable<any[]>;

  constructor(
    public dialogRef: MatDialogRef<DialogMainEditComponent>,
    private mainTableService: MainTablesService,
    @Inject(MAT_DIALOG_DATA)
    public data: Data
    ) { }

  ngOnInit() {
    if (this.data.table === 'materialy') {
      this.mainTableService.getSubTableForDialogEdit('grupy').subscribe(table => {
        this.data.row.grupa_id = table.find(el => el.nazwa === this.data.row.grupa).id;
        this.formControl.setValue(this.data.row.grupa_id);
        this.subTable = table;
        this.filterFunc();
      });
    } else if (this.data.table === 'uzytkownicy') {
      this.mainTableService.getSubTableForDialogEdit('lokalizacje').subscribe(table => {
          this.data.row.lokalizacjaId = table.find(el => el.nazwa === this.data.row.lokal).id;
          this.formControl.setValue(this.data.row.lokalizacjaId);
          this.subTable = table;
          this.filterFunc();
      });
    } else {
      this.subTable = null;
    }
  }

  filterFunc() {
    this.filteredValues = this.formControl.valueChanges
    .pipe(
      startWith(''),
      map(value =>  this._filter(value))
    );
  }

  private _filter(value: string) {
    let filterValue;
    if (value.length > 0) {
      filterValue = value.toLowerCase();
    } else {
      filterValue = value;
    }
    return this.subTable
      .filter((el: any) => el.nazwa.toLowerCase().includes(filterValue) || el.id === Number(filterValue));
  }

  setID(value: number, el) {
    this.data.row[el.key] = value;
  }

  changeActive(el): void {
    if (el.value) {
      this.data.row[el.key] = 1;
    } else {
      this.data.row[el.key] = 0;
    }
  }

  save(el): void {
    this.data.row[el.key] = el.value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
