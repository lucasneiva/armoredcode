import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, catchError, map, of, tap, throwError } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  userService = inject(UserService);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  registerService(registerObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
  }

  /*
  loginService(loginObj: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj, httpOptions);
  }
  */
  loginService(loginObj: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };

    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj, httpOptions)
      .pipe(
        tap((res: any) => {
          // Handle successful login response from backend (if any)
          console.log("Login response:", res); // Debugging line

          // Fetch user data (regardless of whether backend sends it or not)
          this.userService.getCurrentUser().subscribe();

          // Update the login status based on backend response
          this.isLoggedIn$.next(true); // Assuming login was successful
          // Store any relevant data in localStorage (like user ID) if needed
        }),
        catchError(error => {
          console.error('Login error:', error);
          // Handle login errors (e.g., display error message, clear local storage)
          this.isLoggedIn$.next(false);
          return throwError(() => error); // Re-throw the error to be handled by the component 
        })
      );
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

  /*
  logout() {
    localStorage.removeItem('user_id');
    this.isLoggedIn$.next(false);
    // Potentially redirect to login or perform other logout actions
  }
  */

  /*
  getCurrentUser() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.get<any>(`${apiUrls.authServiceApi}user/${userId}`, { headers, withCredentials: true }).pipe(
        catchError(error => {
          console.error('Error fetching user data:', error);
          // ... (Your error handling logic here)
          return of(null); 
        })
      );
    } else {
      return of(null); 
    }
  }

  // Modify getUserRole to handle the Observable
  getUserRole(): string | null {
    const userObservable = this.getCurrentUser();
    let userRole: string | null = null; // Store the role

    // Subscribe to the Observable to get the user object
    userObservable.subscribe((user: { role: string | null; }) => {
      userRole = user ? user.role : null;
    });
  
    return userRole; 
  }  
  */
}
