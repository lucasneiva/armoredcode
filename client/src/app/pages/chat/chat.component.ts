import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export default class ChatComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  router = inject(Router);
  chatService = inject(ChatService);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);

  channelId: string | null = null;
  chatChannel: any; // Replace 'any' with the actual ChatChannel type from your service
  messages: any[] = []; // Replace 'any' with the actual Message type from your service
  newMessageForm = this.fb.group({
    content: ['']
  });
  private destroy$ = new Subject<void>(); 

  ngOnInit(): void {
    this.route.paramMap
    .pipe(takeUntil(this.destroy$))
    .subscribe(params => {
      this.channelId = params.get('id'); 
      if (this.channelId) {
        this.loadChatChannel(this.channelId);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadChatChannel(channelId: string) {
    this.chatService.getChatChannelById(channelId)
    .pipe(takeUntil(this.destroy$))
    .subscribe(channel => {
      this.chatChannel = channel;
      this.messages = channel.messages; 
    });
  }

  sendMessage() {
    if (this.channelId && this.newMessageForm.valid) {
      const newMessage = { content: this.newMessageForm.value.content! }; // Non-null assertion
      this.chatService.sendMessage(this.channelId, newMessage)
      .pipe(takeUntil(this.destroy$))
      .subscribe(updatedChannel => {
        this.chatChannel = updatedChannel;
        this.messages = updatedChannel.messages; 
        this.newMessageForm.reset(); 
      });
    }
  }

  get currentUser() {
    return this.authService.getUserId();
  }
}
