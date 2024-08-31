import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, catchError, map, of, throwError, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    http = inject(HttpClient);

    userService(userObj: any) {
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

}

export type User = {

    _id: string,
    username: string,
    email: string,
    password: string,
    role: string,

}
