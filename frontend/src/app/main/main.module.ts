import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPrintModule} from 'ngx-print';

import { AddTableComponent } from './add-new/add-table.component';
import { DocumentDetailsComponent } from './details/document-details.component';
import { LookTableComponent } from './look-table/look-table.component';
import { RootComponent } from './user/root.component';
import { ManageComponent } from './manage/manage.component';

import { MainRoutingModule } from './main-routing.module';
import { SettingsComponent } from './settings/settings.component';

import { AuthSettingsGuard } from './auth-guard-settings.service';
import { AuthStanGuard } from './auth-guard-stan.service';
import { StockComponent } from './stock/stock.component';

@NgModule({
    imports: [
      CommonModule,
      MainRoutingModule,
      MaterialModule,
      ReactiveFormsModule,
      NgxPrintModule
    ],
    declarations: [
        RootComponent,
        LookTableComponent,
        DocumentDetailsComponent,
        AddTableComponent,
        ManageComponent,
        SettingsComponent,
        StockComponent
    ],
    providers: [AuthSettingsGuard, AuthStanGuard]
  })
  export class MainModule {}
