import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, catchError, map, of, throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);

  userService(userObj: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.post<any>(`${apiUrls.userServiceApi}`, userObj, httpOptions);
  }

  getUsers(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true 
    };
    return this.http.get<any>(`${apiUrls.userServiceApi}`, httpOptions);
  }
 /*
  getCurrentUser() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.get<any>(`${apiUrls.userServiceApi}user/${userId}`, { headers, withCredentials: true }).pipe(
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

export type User = {
  
    _id: string,
    username: string,
    email: string,
    password: string,
    role: string,
    
}
