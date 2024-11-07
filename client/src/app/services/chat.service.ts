import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  http = inject(HttpClient);

  getUserChatChannels(): Observable<ChatResponse> { // Correct return type
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    return this.http.get<ChatResponse>(`${apiUrls.chatServiceApi}/my-chats`, httpOptions)
      .pipe(
        tap((res) => {
          console.log('User Chats fetched:', res);
        }),
        catchError((error) => {
          console.error('Error fetching User Chats:', error);
          return of({ success: false, status: 500, message: 'Error fetching chats.', data: [] }); // Return a default ApiResponse on error
        })
      );
  }

  getChatChannelById(channelId: string): Observable<ChatChannel | null> { // Added | null for type safety
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    return this.http.get<ChatChannel>(`${apiUrls.chatServiceApi}/${channelId}`, httpOptions)
      .pipe(
        tap((res) => {
          console.log('Chat fetched:', res);
        }),
        catchError((error) => {
          console.error('Error fetching Chat:', error);
          // Option 1: Return null (handle error in component)
          return of(null); // More concise
          
          // Option 2: Re-throw error (using throwError)
          // return throwError(() => new Error("Failed to fetch chat channel.")); //  More explicit error handling
        })
      );
  }

  // Send a message to a chat channel
  sendMessage(channelId: string, message: { content: string }): Observable<ChatChannel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    return this.http.post<ChatChannel>(`${apiUrls.chatServiceApi}/${channelId}/messages`, message, httpOptions);
  }

}

export type ChatResponse = { // Define ApiResponse type in service
  success: boolean;
  status: number;
  message: string;
  data: ChatChannel[];
}

export type ChatChannel = {
  success: any;
  data: any;
  _id: string;
  projectId: string;
  freelancerId: string;
  clientId: string;
  messages: Message[];
  isActive: boolean;
}

export type Message = {
  _id: string;
  senderId: string;
  content: string;
  timestamp: Date;
}