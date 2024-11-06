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
  otherUserNames: { [channelId: string]: string } = {}; // Store other user names per channel

  currentChatChannel: ChatChannel | null = null;
  messages: Message[] = [];

  currentUserId: string = "";
  otherUserId: string | undefined | null = null;

  currentUserName: string | null = null;
  otherUserName: string | null = null;

  newMessageForm = this.fb.group({
    content: ['']
  });
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId() || ""; // Get current user ID
    this.loadContacts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadContacts() {
    this.chatService.getUserChatChannels()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: ChatResponse) => {
        if (response.success && response.data) {
          this.contacts = response.data;
          console.log("contacts: ",this.contacts);
          console.log("response: ",response.data);

          // Iterate through each contact to determine and load the other user's name
          this.contacts.forEach(contact => {
            this.getOtherUserIdAndLoadName(contact);
          });

        } else {
          console.error("Failed to load contacts:", response.message || "No data received.");
          this.contacts = [];
        }
      });
  }

  getOtherUserName(contact: ChatChannel): string {
    return this.otherUserNames[contact._id] || "Loading..."; // Use stored name or "Loading..."
  }

  getOtherUserIdAndLoadName(contact: ChatChannel) {
    const otherUserId = this.getOtherUserId(contact);
    console.log("other user Id: ",otherUserId);

    if (!otherUserId) {
      console.error("Current user is not part of this chat channel:", contact._id);
      return;
    }

    this.userService.getUser(otherUserId).subscribe({
      next: (response) => {
        if (response.success) {
          this.otherUserNames[contact._id] = response.data.username;
        } else {
          console.error(`Failed to retrieve other user details for channel ${contact._id}:`, response.message);
          this.otherUserNames[contact._id] = "Unknown User";
        }
      },
      error: (error) => {
        console.error(`Error fetching other user details for channel ${contact._id}:`, error);
        this.otherUserNames[contact._id] = "Unknown User";
      }
    });
  }


  getOtherUserId(contact: ChatChannel): string | null {
    console.log("clientID: ",contact.clientId);
    console.log("freelancerID: ",contact.freelancerId);
    return (this.currentUserId === contact.freelancerId) ? contact.clientId :
           (this.currentUserId === contact.clientId) ? contact.freelancerId : null;
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
}