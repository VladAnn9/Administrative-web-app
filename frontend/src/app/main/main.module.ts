import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material';

import { AddTableComponent } from './add-new/add-table.component';
import { DocumentDetailsComponent } from './details/document-details.component';
import { LookTableComponent } from './look-table/look-table.component';
import { RootComponent } from './user/root.component';
import { ManageComponent } from './manage/manage.component';

import { MainRoutingModule } from './main-routing.module';

@NgModule({
    imports: [
      CommonModule,
      MainRoutingModule,
      MaterialModule
    ],
    declarations: [
        RootComponent,
        LookTableComponent,
        DocumentDetailsComponent,
        AddTableComponent,
        ManageComponent
    ]
  })
  export class MainModule {}
