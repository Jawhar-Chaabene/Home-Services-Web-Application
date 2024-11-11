import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const expectedRole = route.data['expectedRole'];

        return this.authService.getUserRole().pipe(
            map(userRole => {
                if (!userRole || userRole !== expectedRole) {
                    this.router.navigate(['/']); // Redirect to the home page if the user role is not as expected
                    return false;
                }
                return true;
            })
        );
    }
}
