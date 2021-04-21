import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthRoleGuard } from './services/auth-role-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'user/:id', loadChildren: './main/main.module#MainModule', canActivate: [AuthRoleGuard] },

  { path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
