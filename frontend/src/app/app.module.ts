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
import { LoginComponent } from './login/login.component';


import { AuthGuard } from './services/auth-guard.service';
import { AuthRoleGuard } from './services/auth-role-guard.service';
import { DialogComponent } from './main/add-new/DialogComponent';
import { DialogDetailsComponent } from './main/details/dialog-details-component';

registerLocaleData(localePl, 'pl');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DialogComponent,
    DialogDetailsComponent,
  ],
  entryComponents: [
    DialogComponent,
    DialogDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, AuthRoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
