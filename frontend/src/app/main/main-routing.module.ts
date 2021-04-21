import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddTableComponent } from './add-new/add-table.component';
import { DocumentDetailsComponent } from './details/document-details.component';
import { LookTableComponent } from './look-table/look-table.component';
import { RootComponent } from './user/root.component';
import { ManageComponent } from './manage/manage.component';
import { SettingsComponent } from './settings/settings.component';
import { StockComponent } from './stock/stock.component';

import { AuthSettingsGuard } from './auth-guard-settings.service';
import { AuthStanGuard } from './auth-guard-stan.service';

const mainRoutes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
        { path: 'add-new/:type', component: AddTableComponent },
        { path: 'look/:type', component: LookTableComponent, },
        { path: 'details/:id', component: DocumentDetailsComponent },
        { path: 'manage/:kind', component: ManageComponent },
        { path: 'settings', component: SettingsComponent, canActivate: [AuthSettingsGuard] },
        { path: 'stan', component: StockComponent, canActivate: [AuthStanGuard] }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule {}
