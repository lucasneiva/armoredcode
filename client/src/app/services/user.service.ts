import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, catchError, map, of, throwError, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  authService = inject(AuthService);  // Inject it
  
  getUser(userId: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true 
    };
    return this.http.get<any>(`${apiUrls.userServiceApi}/${userId}`, httpOptions);
  }

  deleteUser(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };

    const userId = this.authService.getUserId(); // Assuming authService has a method to get userId

    if (!userId) {
      // Handle the case where the user ID is not found (maybe redirect to login)
      console.error("User ID not found!");
      return throwError(() => new Error("User ID not found!"));
    }

    return this.http.delete<any>(`${apiUrls.userServiceApi}/${userId}`, httpOptions)
      .pipe(
        tap((res) => {
          console.log('user deleted:', res);
        }),
        catchError((error) => {
          console.error('Error deleting user:', error);
          throw error;
        })
      );
  }

  getUserRole(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true 
    };
    return this.http.get<any>(`${apiUrls.userServiceApi}:id/role`, httpOptions);
  }
}

export type User = {
  _id: string,
  username: string,
  email: string,
  password: string,
  role: string,
}