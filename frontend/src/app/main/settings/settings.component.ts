import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {DateAdapter} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import { formatDate } from '@angular/common';

import { SettingsService } from '../../services/settings.service';
import { DialogConfirmationSettingsComponent } from './dialog-confirm-settings.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  activeDate = new FormControl();
  inventDate = new FormControl();

  constructor(
    private settingsService: SettingsService,
    private adapter: DateAdapter<any>,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.adapter.setLocale('pl');
    this.getDates();
  }

  getDates() {
    this.settingsService.getConfigDates().subscribe(data => {
      this.activeDate.setValue((data.data_aktywnych_dokumentow));
      this.inventDate.setValue(data.data_inwentarizacji);

    });
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmationSettingsComponent, {
      width: '300px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        const dateNew = {
          data_aktywnych_dokumentow: formatDate(this.activeDate.value, 'yy/M/d', 'pl'),
          data_inwentarizacji: formatDate(this.inventDate.value, 'yy/M/d', 'pl')
        };
        this.settingsService.updateConfigDates(dateNew).subscribe();
      }
    });
  }

}
