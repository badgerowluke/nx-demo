import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { AuthenticationService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth:AuthenticationService) { }
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
            return this.auth.isAuthenticated$.pipe(
                tap(isAuthentidated => {
                    isAuthentidated || this.auth.loginWithRedirect()
                })
            )
    } 
}