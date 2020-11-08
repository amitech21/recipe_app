import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

// to inject services in constructor
@Injectable()
export class AuthEffects {
    
    @Effect()
    authLogin = this.actions$
    .pipe(
        // filter use to fetch exact action , we want to proccess
        ofType(AuthActions.LOGIN_START),
        // Switch to new Observable
        switchMap((authData: AuthActions.LoginStart) => {
            // return An Observable of the HTTPResponse for the request, 
            // with a response body in the requested type.
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                map(resData => {
                    const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000 ));
                    // of() to create new Observable
                    return new AuthActions.Login({
                            email: resData.email,
                            userId: resData.localId,
                            token: resData.idToken,
                            expirationDate: expirationDate
                    })
                    
                }),
                catchError(errorRes => {

                    let errorMessage = "Unknown error occured !!!!";
                    
                    if(!errorRes.error || !errorRes.error.error)
                        return of(new AuthActions.LoginFail(errorMessage));
                    // return throwError(errorMessage);
                    console.log(errorRes.error.error.message);    
                    switch(errorRes.error.error.message) {
                        case 'INVALID_EMAIL': {
                            errorMessage = "Invalid email entered.";
                            break;
                        }

                        case 'EMAIL_EXISTS': {
                            errorMessage = "Email already exist.";
                            break;
                        }

                        case 'EMAIL_NOT_FOUND': {
                            errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted.";
                            break;
                        }

                        case 'INVALID_PASSWORD': {
                            errorMessage = "The password is invalid or the user does not have a password.";
                            break;
                        }

                        case 'USER_DISABLED': {
                            errorMessage = "The user account has been disabled by an administrator.";
                            break;
                        }
                    }
                    // of() to create new Observable
                    return of(new AuthActions.LoginFail(errorMessage));
                })
                
            );
        })
    );

    @Effect({ dispatch: false })
    authSuccess = this.actions$
        .pipe(
            ofType(AuthActions.LOGIN),
            tap(() => {
                this.router.navigate(['/recipes']);
            })
        )

    constructor(
        private actions$: Actions, 
        private http: HttpClient,
        private router: Router
    ) {}
}