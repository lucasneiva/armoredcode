import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ChatChannel, ChatResponse, ChatService, Message } from '../../services/chat.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

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
  userService = inject(UserService);

  showChatBox = false;
  showContacts = true;

  contacts: ChatChannel[] = [];

  currentChatChannel: ChatChannel | null = null;
  messages: Message[] = [];

  currentUserId: string | null = null;
  otherUserId: string | undefined | null = null;

  currentUserName: string | null = null;
  otherUserName: string | null = null;

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
      .subscribe((response: ChatResponse) => {  // Specify the response type
        if (response.success && response.data) {  // Check for success and data
          this.contacts = response.data; // Assign the data array
          console.log("contact data: ", response.data);

          const freelancerId = this.currentChatChannel?.freelancerId;
          const clientId = this.currentChatChannel?.clientId;
          this.currentUserId = this.authService.getUserId();
          /*debug*/console.log("user id: ", this.currentUserId);
          /*debug*/console.log("client id: ", clientId);
          /*debug*/console.log("freelancer id: ", freelancerId);
        
          if (this.currentUserId === freelancerId) {
            this.otherUserId = clientId;
          } else if (this.currentUserId === clientId) {
            this.otherUserId = freelancerId;
          } else {
            console.error("Current user is not part of this chat channel.");
            // Handle this case appropriately, maybe redirect or show an error message.
          }

          if (this.otherUserId && this.currentUserId) {
            this.loadCurrentUserName(this.currentUserId);
            this.loadOtherUserName(this.otherUserId);
          }

        } else {
          // Handle the error or display a message if data is missing.
          console.error("Failed to load contacts:", response.message || "No data received.");
          this.contacts = []; // Or some other default behavior
        }
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

  loadCurrentUserName(userId: string) {
    this.userService.getUser(userId).subscribe(
      (response) => {
        if (response.success) {
          this.currentUserName = response.data.username;
          /*debug*/ console.log("current user name: ",response.data.username);
        } else {
          console.error('Failed to retrieve current user details:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching current user details:', error);
      });
  }

  loadOtherUserName(userId: string) {
    this.userService.getUser(userId).subscribe(
      (response) => {
        if (response.success) {
          this.otherUserName = response.data.username;
          /*debug*/ console.log("contact user name: ",response.data.username);
        } else {
          console.error('Failed to retrieve current user details:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching current user details:', error);
      });
  }
}