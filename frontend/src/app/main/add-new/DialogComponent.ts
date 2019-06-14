import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html',
  styles: [
    '.mat-dialog-actions { justify-content: space-between; }',
    'mat-form-field { display: block }'
  ]
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA)
    public data: object) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
