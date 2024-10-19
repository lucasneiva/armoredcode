import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  http = inject(HttpClient);

  createNotification(notificationObj: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.post<any>(`${apiUrls.notificationServiceApi}`, notificationObj, httpOptions);
  }

  getFreelancerNotifications(freelancerId: string | null): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    return this.http.get<any>(`${apiUrls.notificationServiceApi}/freelancer/${freelancerId}`, httpOptions).pipe(
      /*tap(response => console.log('API response:', response)),
      catchError(error => {
        console.error('Error fetching notifications:', error);
        // Return an empty array or throw an error as needed:
        return of({ success: false, data: [] }); // Or throwError(() => error);
      })*/
    );
  }

  getInviteById(inviteId: string | null): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.get<any>(`${apiUrls.notificationServiceApi}/${inviteId}`, httpOptions).pipe(
      //tap(response => console.log('API response to this invite:', response))  // Log API response
    );
  }

  acceptInvite(inviteId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    return this.http.patch<any>(`${apiUrls.notificationServiceApi}/${inviteId}/accept`, {}, httpOptions);
  }

  rejectInvite(inviteId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    return this.http.patch<any>(`${apiUrls.notificationServiceApi}/${inviteId}/reject`, {}, httpOptions);
  }

  markInviteAsRead(inviteId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    return this.http.put<any>(`${apiUrls.notificationServiceApi}/${inviteId}`, { isRead: true }, httpOptions);
  }

}
export type Notification = {
  _id: string;
  clientId: string;
  freelancerId: string;
  projectId?: string; // Optional
  message: string;
  timestamp: string; // Note the Date type
  status: string;
  isRead: boolean;
};