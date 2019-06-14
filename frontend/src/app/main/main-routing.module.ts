import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddTableComponent } from './add-new/add-table.component';
import { DocumentDetailsComponent } from './details/document-details.component';
import { LookTableComponent } from './look-table/look-table.component';
import { RootComponent } from './user/root.component';
import { ManageComponent } from './manage/manage.component';

import { AuthRoleGuard } from '../services/auth-role-guard.service';


const mainRoutes: Routes = [
  {
    path: '',
    component: RootComponent,
    canActivate: [AuthRoleGuard],
    children: [
        { path: 'add-new/:type', component: AddTableComponent },
        { path: 'look/:type', component: LookTableComponent, },
        { path: 'details/:id', component: DocumentDetailsComponent },
        { path: 'manage/:kind', component: ManageComponent }
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
