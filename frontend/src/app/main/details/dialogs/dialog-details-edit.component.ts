import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-details-edit',
  templateUrl: 'dialog-details-edit.html',
  styles: [
    '.mat-dialog-actions { justify-content: space-between; }',
    'mat-form-field { display: block }',
    'mat-icon { cursor: pointer }'
  ]
})
export class DialogDetailsEditComponent {
  constructor(public dialogRef: MatDialogRef<DialogDetailsEditComponent>,
              @Inject(MAT_DIALOG_DATA)
    public data: object) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
