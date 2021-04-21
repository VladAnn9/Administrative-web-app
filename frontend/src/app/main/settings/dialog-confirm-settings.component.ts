import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-confirm-settings',
    templateUrl: 'dialog-confirm-settings.html',
    styles: [
      '.mat-dialog-actions { justify-content: space-around; }',
      'mat-form-field { display: block }'
    ]
  })
  export class DialogConfirmationSettingsComponent {
    constructor(public dialogRef: MatDialogRef<DialogConfirmationSettingsComponent>,
                @Inject(MAT_DIALOG_DATA)
      public data: string) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  }
