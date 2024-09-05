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

  logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role');
    localStorage.removeItem('token');
    this.isLoggedIn$.next(false);
    // Potentially redirect to login or perform other logout actions
  }
  
  getUserRole(): string | null {
    const role = localStorage.getItem('user_role');
    /*console.log("User Role from localStorage:", role); //debug */
    return role;
  }

  getUserId(): string | null {
    const user_id = localStorage.getItem('user_id');
    /*console.log("User Role from localStorage:", role); //debug */
    return user_id;
  }
}
