import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

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
        switchMap((authData: AuthActions.LoginStart) => {
            console.log('in auth effect');
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
                    return of(
                        new AuthActions.Login({
                            email: resData.email,
                            userId: resData.localId,
                            token: resData.idToken,
                            expirationDate: expirationDate
                        })
                    );
                }),
                catchError(error => {
                    // of() to create new Observable
                    return of();
                })
                
            );
        }),
    );

    constructor(private actions$: Actions, private http: HttpClient) {}
}