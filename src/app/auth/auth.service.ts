import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    
    constructor(private http: HttpClient) {}
    
    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAHzxxfhxqs1pBA5Kl5de4pmCrf4Ph8Bqc',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(errorRes => {
            let errorMessage = "Unknown error occured !!!!";
            
            if(!errorRes.error || !errorRes.error.error)
                return throwError(errorMessage);
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
                    
            }

            return throwError(errorMessage);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAHzxxfhxqs1pBA5Kl5de4pmCrf4Ph8Bqc',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        );
    }
}