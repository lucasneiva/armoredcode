import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, Observable } from 'rxjs';

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
    return this.http.get<any>(`${apiUrls.notificationServiceApi}/${freelancerId}`, httpOptions);
  }

  getInviteById(inviteId: string | null): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.get<any>(`${apiUrls.notificationServiceApi}/${inviteId}`, httpOptions).pipe(
      //tap(response => console.log('API response:', response))  // Log API response
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

}
export type Notification = {
  clientId: {
    type: String,
    required: true,
  }
  freelancerId: {
    type: String,
    required: true,
  }
  projectId?: {
    type: String,
    required: false,
  }
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: false,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}