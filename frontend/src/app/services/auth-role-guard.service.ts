import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UsersService } from './users.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRoleGuard implements CanActivate {
    role: string;

    constructor(
        private router: Router,
        private auth: AuthenticationService,
        private usersService: UsersService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.auth.getToken();
        const storageRole = this.auth.getRole();
        const id = route.params.id;

        this.usersService.getUserRole(id).subscribe(role => {
            this.role = role;

            if (!token || storageRole !== this.role) {
                this.router.navigate(['/login'], { queryParams: { letsLogin: state.url }});
                this.auth.logout();
                return false;
            }
        });
        return true;
    }
}
