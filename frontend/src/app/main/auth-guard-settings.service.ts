import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthSettingsGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: AuthenticationService
    ) {}

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const role = this.auth.getRole();
        const id = route.parent.params.id;

        if (role !== 'root') {
            this.router.navigate([`/user/${id}`], { queryParams: { Rejected: 'no-permission' }});
            return false;
        }
        return true;

    }
}
