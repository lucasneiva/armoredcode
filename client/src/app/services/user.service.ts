import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, catchError, map, of, throwError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  
  getlogin(loginObj: any){
    return this.http.get<any>(`${apiUrls.authServiceApi}login`, loginObj);
  }

  getUserRole(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true 
    };
    return this.http.get<any>(`${apiUrls.userServiceApi}/:id/role`, httpOptions);
  }
}

export type User = {
  _id: string,
  username: string,
  email: string,
  password: string,
  role: string,
}