import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-confirm',
    templateUrl: 'dialog-confirm.html',
    styles: [
      '.mat-dialog-actions { justify-content: space-around; }',
      'mat-form-field { display: block }'
    ]
  })
  export class DialogConfirmationComponent {
    constructor(public dialogRef: MatDialogRef<DialogConfirmationComponent>,
                @Inject(MAT_DIALOG_DATA)
      public data: string) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  }
