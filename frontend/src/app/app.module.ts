import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import {MatPaginatorIntl} from '@angular/material';
import { LoginComponent } from './login/login.component';


import { AuthGuard } from './services/auth-guard.service';
import { AuthRoleGuard } from './services/auth-role-guard.service';
import { DialogComponent } from './main/add-new/DialogComponent';
import { DialogDetailsEditComponent } from './main/details/dialogs/dialog-details-edit.component';
import { DialogAddTowarComponent } from './main/details/dialogs/dialog-add-towar.component';
import { DialogMainEditComponent } from './main/manage/dialogs/dialog-main-edit.component';
import { DialogAddComponent } from './main/manage/dialogs/dialog-add.component';

registerLocaleData(localePl, 'pl');

function getPolishPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Elementy na stronie:';
  paginatorIntl.nextPageLabel = 'Następna strona';
  paginatorIntl.previousPageLabel = 'Poprzednia strona';
  // paginatorIntl.getRangeLabel = dutchRangeLabel;

  return paginatorIntl;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DialogComponent,
    DialogDetailsEditComponent,
    DialogAddTowarComponent,
    DialogMainEditComponent,
    DialogAddComponent
  ],
  entryComponents: [
    DialogComponent,
    DialogDetailsEditComponent,
    DialogAddTowarComponent,
    DialogMainEditComponent,
    DialogAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard, AuthRoleGuard,
    { provide: MatPaginatorIntl, useValue: getPolishPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
