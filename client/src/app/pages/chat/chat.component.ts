import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ChatChannel, ChatService, Message } from '../../services/chat.service';
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

  showChatBox = false;
  showContacts = true;

  contacts: ChatChannel[] = [];
  currentChatChannel: ChatChannel | null = null;
  messages: Message[] = [];

  newMessageForm = this.fb.group({
    content: ['']
  });
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loadContacts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadContacts() {
    this.chatService.getUserChatChannels()
      .pipe(takeUntil(this.destroy$))
      .subscribe(chatChannels => {
        this.contacts = chatChannels;
      });
  }

  openChat(channelId: string) {
    this.showChatBox = true;
    this.showContacts = false;
    this.loadChatChannel(channelId);
  }

  loadChatChannel(channelId: string) {
    this.chatService.getChatChannelById(channelId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(channel => {
        this.currentChatChannel = channel;
        this.messages = channel.messages;
      });
  }

  sendMessage() {
    if (this.currentChatChannel && this.newMessageForm.valid) {
      const newMessage = { content: this.newMessageForm.value.content! };
      this.chatService.sendMessage(this.currentChatChannel._id, newMessage)
        .pipe(takeUntil(this.destroy$))
        .subscribe(updatedChannel => {
          this.currentChatChannel = updatedChannel;
          this.messages = updatedChannel.messages;
          this.newMessageForm.reset();
        });
    }
  }

  closeChat() {
    this.showChatBox = false;
    this.showContacts = true;
    this.currentChatChannel = null;
    this.messages = [];
  }

  get currentUser() {
    return this.authService.getUserId();
  }
}