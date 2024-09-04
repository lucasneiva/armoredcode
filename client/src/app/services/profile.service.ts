import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);
  authService = inject(AuthService);  // Inject it
  hasProfile$ = new BehaviorSubject<boolean>(false);
  /*
  createProfile(profileObj: any, userId: string): Observable<any> { // Pass userId explicitly
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  
    };

    // Include userId in the request body
    return this.http.post<any>(`${apiUrls.profileServiceApi}`, 
      { ...profileObj, userId },  
      httpOptions
    );
  }
  */
  createProfile(profileData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };

    const userRole = this.authService.getUserRole();
    if (!userRole) {
      // Handle the case where the user role is not found (maybe redirect to login)
      console.error("User role not found!");
      return throwError(() => new Error("User role not found!"));
    }

    // Include the role in the profileData
    const dataToSend = { ...profileData, role: userRole };

    return this.http.post<any>(`${apiUrls.profileServiceApi}`, dataToSend, httpOptions)
      .pipe(
        tap((res) => {
          console.log('Profile created:', res);
          this.hasProfile$.next(true);
        }),
        catchError((error) => {
          console.error('Error creating profile:', error);
          throw error;
        })
      );
  }

  getProfile(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    return this.http.get<any>(`${apiUrls.profileServiceApi}`, httpOptions);
  }
}
export type Profile = {



}