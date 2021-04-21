import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DocumentP} from '../../../models/document_P';
import {Product} from '../../../models/product';


@Component({
  selector: 'app-dialog-add-towar',
  templateUrl: 'dialog-add-towar.html',
  styles: [
    '.mat-dialog-actions { justify-content: space-between; }',
    'mat-form-field { display: block }',
    'mat-icon { cursor: pointer }'
  ]
})
export class DialogAddTowarComponent implements OnInit {
// tslint:disable-next-line: no-string-literal
    documentP: DocumentP = this.data['documentP'];
    formControl = new FormControl();
    filteredProducts: Observable<Product[]>;
  constructor(public dialogRef: MatDialogRef<DialogAddTowarComponent>,
              @Inject(MAT_DIALOG_DATA)
    public data: any
    ) {
    }

    ngOnInit() {
        this.filteredProducts = this.formControl.valueChanges
        .pipe(
          startWith(''),
          map(value =>  this._filter(value))
        );
    }

    private _filter(value: string): Product[] {
        const filterValue = value.toLowerCase();
        // tslint:disable-next-line: no-string-literal
        return this.data['products'].filter((product: Product) => product.nazwa.toLowerCase().includes(filterValue));
    }

    findID(value: string) {
        // tslint:disable-next-line: no-string-literal
        this.documentP.id = this.data['products'].find((p: Product) => p.nazwa === value).id;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
