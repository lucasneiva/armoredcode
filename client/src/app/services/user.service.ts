import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, catchError, map, of, throwError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);

  // Method to get the user role
  getUserRole(userId: string): Observable<string | null> {
    const url = `${apiUrls.userServiceApi}/${userId}/role`; 
    return this.http.get<any>(url)
      .pipe(
        map(response => response.role), // Assuming the response has a "role" property
        catchError(error => {
          console.error('Error fetching user role:', error);
          return of(null);
        })
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