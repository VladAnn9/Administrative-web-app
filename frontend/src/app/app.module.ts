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

import { AuthRoleGuard } from './services/auth-role-guard.service';
import { DialogDetailsEditComponent } from './main/details/dialogs/dialog-details-edit.component';
import { DialogAddTowarComponent } from './main/details/dialogs/dialog-add-towar.component';
import { DialogConfirmationComponent } from './main/details/dialogs/dialog-confirm.component';
import { DialogMainEditComponent } from './main/manage/dialogs/dialog-main-edit.component';
import { DialogAddComponent } from './main/manage/dialogs/dialog-add.component';
import { DialogDeleteConfirmComponent } from './main/manage/dialogs/dialog-delete-confirm.component';
import { DialogConfirmationSettingsComponent } from './main/settings/dialog-confirm-settings.component';

registerLocaleData(localePl, 'pl');

function getPolishPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Elementy na stronie:';
  paginatorIntl.nextPageLabel = 'Następna strona';
  paginatorIntl.previousPageLabel = 'Poprzednia strona';

  return paginatorIntl;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DialogDetailsEditComponent,
    DialogAddTowarComponent,
    DialogMainEditComponent,
    DialogAddComponent,
    DialogConfirmationComponent,
    DialogConfirmationSettingsComponent,
    DialogDeleteConfirmComponent
  ],
  entryComponents: [
    DialogDetailsEditComponent,
    DialogAddTowarComponent,
    DialogMainEditComponent,
    DialogAddComponent,
    DialogConfirmationComponent,
    DialogConfirmationSettingsComponent,
    DialogDeleteConfirmComponent
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
  providers: [ AuthRoleGuard,
    { provide: MatPaginatorIntl, useValue: getPolishPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
