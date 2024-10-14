import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  http = inject(HttpClient);
  
  createNotification(notificationObj: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.post<any>(`${apiUrls.notificationServiceApi}`, notificationObj, httpOptions);
  }
  
  getFreelancerNotifications(freelancerId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true 
    };
    return this.http.get<any>(`${apiUrls.notificationServiceApi}/${freelancerId}`, httpOptions);
  }

  getNotificationById(notificationId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  // Include cookies in requests
    };
    return this.http.get<any>(`${apiUrls.notificationServiceApi}/${notificationId}`, httpOptions);
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
    timestamp: Date;
    isRead: {
        type: Boolean,
        default: false,
    },
}