import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isAdmin = this.auth.getRole();
        const token = this.auth.getToken();
        console.log('auth-guard' + token);
        console.log(isAdmin);
        console.log(route);
        console.log(state);

        if (!token || isAdmin === 'admin') {
            this.router.navigate(['/login'], { queryParams: { letsLogin: state.url }});
            return false;
        }
        return true;

    }
}
