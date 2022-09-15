
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    user$: Observable<any> = this.auth.user$;
    isAuthenticated$:Observable<boolean> = this.auth.isAuthenticated$;

    constructor(private auth: AuthService) { }

    loginWithRedirect(): Observable<void> {
        return (this.auth.loginWithRedirect())
    }

    logout(): void {
        this.auth.logout( { returnTo: window.location.origin } )
    }

    // registerUser:(newUser:any) => Observable<any> = (newUser:any) => {
    //     return this.http.post<any>(`${this.env.apiUrl}/coaches/ClubStaff`, newUser)
    // }
}