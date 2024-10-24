import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrls } from '../api.urls';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    http = inject(HttpClient);

    // Get chat channel details by ID
    getChatChannelById(channelId: string): Observable<ChatChannel> {
        return this.http.get<ChatChannel>(`${apiUrls.chatServiceApi}/${channelId}`);
    }

    // Send a message to a chat channel
    sendMessage(channelId: string, message: { content: string }): Observable<ChatChannel> {
        return this.http.post<ChatChannel>(`${apiUrls.chatServiceApi}/${channelId}/messages`, message);
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