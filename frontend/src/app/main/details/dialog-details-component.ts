import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-details',
  templateUrl: 'dialog-details.html',
  styles: [
    '.mat-dialog-actions { justify-content: space-between; }',
    'mat-form-field { display: block }',
    'mat-icon { cursor: pointer }'
  ]
})
export class DialogDetailsComponent {
  constructor(public dialogRef: MatDialogRef<DialogDetailsComponent>,
              @Inject(MAT_DIALOG_DATA)
    public data: object) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
