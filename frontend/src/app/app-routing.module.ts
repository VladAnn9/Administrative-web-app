import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { NormalUserComponent } from './normal-user/normal-user.component';
import { LoginComponent } from './login/login.component';
// import { AdminComponent } from './admin/admin.component';
// import { OtherUserComponent } from './other-user/other-user.component';
// import { RootComponent } from './user/user/root.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthRoleGuard } from './services/auth-role-guard.service';
// import { DocumentDetailsComponent } from './document-details/document-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'biuro', component: NormalUserComponent, canActivate: [AuthRoleGuard], data: {
  //   expectedRole: 'biuro'
  // } },
  // { path: 'admin', component: AdminComponent, canActivate: [AuthRoleGuard], data: {
  //   expectedRole: 'admin'
  // } },
  { path: 'user/:id', loadChildren: './main/main.module#MainModule', canActivate: [AuthRoleGuard] },
  // { path: 'inni', component: OtherUserComponent, canActivate: [AuthRoleGuard], data: {
  //   expectedRole: 'inni'
  // } },

  { path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
