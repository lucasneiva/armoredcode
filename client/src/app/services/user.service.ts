import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, catchError, map, of, throwError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  getCurrentUser(): Observable<User | null> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    return this.http.get<User | null>(`${apiUrls.userServiceApi}/`, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error fetching user data:', error);
          return of(null);
        }),
        tap(user => this.currentUserSubject.next(user)) // Update the subject
      );
  }
}


export type User = {
  _id: string,
  username: string,
  email: string,
  password: string,
  role: string,
}