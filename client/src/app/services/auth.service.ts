import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  registerService(registerObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
  }

  loginService(loginObj: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj, httpOptions);
  }

  sendEmailService(email: string) {
    return this.http.post<any>(`${apiUrls.authServiceApi}send-email`, { email: email });
  }

  resetPasswordService(resetObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}reset-password`, resetObj);
  }

  isLoggedIn() {
    return !!localStorage.getItem("user_id");
  }

  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_role');
        localStorage.removeItem('token');
        this.isLoggedIn$.next(false);
        resolve(); // Resolve the Promise when logout is successful
      } catch (error) {
        reject(error); // Reject the Promise if an error occurs
      }
    });
  }

  getUserRole(): string | null {
    const role = localStorage.getItem('user_role');
    /*debug*/ //console.log("User Role from localStorage:", role);
    return role;
  }

  getUserId(): string | null {
    const user_id = localStorage.getItem('user_id');
    /*debug*/ //console.log("User Role from localStorage:", role);
    return user_id;
  }
}
