import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { apiUrls } from '../api.urls';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    http = inject(HttpClient);

    // Get all chat channels for the current user
    getUserChatChannels(): Observable<ChatChannel[]> {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            withCredentials: true
          };
        return this.http.get<ChatChannel[]>(`${apiUrls.chatServiceApi}/my-chats`, httpOptions)
        .pipe(
          tap((res) => {
            console.log('User Chats fetched:', res);
          }),
          catchError((error) => {
            console.error('Error fetching User Chats:', error);
            throw error;
          })
        );
    }

    // Get chat channel details by ID
    getChatChannelById(channelId: string): Observable<ChatChannel> {
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
            throw error;
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

export type ChatChannel = {
    _id: string;
    projectId: string;
    freelancerId: string;
    clientId: string;
    messages: Message[];
    isActive: boolean;
}

export type Message = {
    senderId: string;
    content: string;
    timestamp: Date;
}