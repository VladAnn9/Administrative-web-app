import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRoleGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const role = this.auth.getRole();
        const token = this.auth.getToken();
        // const expectedRole = route.data.expectedRole;

        if (!token) {
            this.router.navigate(['/login'], { queryParams: { letsLogin: state.url }});
            return false;
        }
        return true;

    }
}
