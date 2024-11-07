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
          /*debug*/ //console.log("contacts: ",this.contacts);

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

  getOtherUserId(contact: ChatChannel): string | null {
    const clientId = this.getId(contact.clientId);
    const freelancerId = this.getId(contact.freelancerId);
  
    /*debug*/ //console.log("Current User ID:", this.currentUserId); // Log current user ID
    /*debug*/ //console.log("Client ID:", clientId);
    /*debug*/ //console.log("Freelancer ID:", freelancerId);
  
    if (!clientId || !freelancerId) {
      console.error("Missing client or freelancer ID in contact:", contact);
      return null;
    }
  
    //  More robust comparison (important!)
    if (this.currentUserId === clientId) {
      return freelancerId;
    } else if (this.currentUserId === freelancerId) {
      return clientId;
    } else {
      console.error("Current user is not part of this chat:", this.currentUserId, contact);
      return null; 
    }
  }
  
  getId(user: string | { _id: string } | null | undefined): string | null {
      if (user == null) return null; // Handle null or undefined
  
      return typeof user === 'string' ? user : user._id; // Simplified
  }

  getOtherUserName(contact: ChatChannel): string {
    return this.otherUserNames[contact._id] || "Loading..."; // Use stored name or "Loading..."
  }

  getOtherUserIdAndLoadName(contact: ChatChannel) {
    const otherUserId = this.getOtherUserId(contact);
    /*debug*/ //console.log("other user Id: ",otherUserId);

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

  openChat(channelId: string) {
    this.showChatBox = true;
    this.showContacts = false;

    this.chatService.getChatChannelById(channelId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: channel => {
          if (channel) { // Check if channel is not null
            this.currentChatChannel = channel;
            this.messages = this.currentChatChannel.messages;
            console.log("Channel received:", this.currentChatChannel);
          } else {
            console.error("Chat channel not found or error fetching.");
            this.closeChat(); // Close the chat or handle the error as needed
          }
        },
        error: error => { // Handle network or HTTP errors
          console.error("Error loading chat channel:", error);
          this.closeChat();  // Close the chat or handle the error
        }
      });
  }

  sendMessage() {
    if (this.currentChatChannel && this.newMessageForm.valid) {
      console.log("Message from Channel Id:", this.currentChatChannel._id);
      const newMessage = { content: this.newMessageForm.value.content! };
      this.chatService.sendMessage(this.currentChatChannel._id, newMessage)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: updatedChannel => {
            this.currentChatChannel = updatedChannel;
            this.messages = updatedChannel.messages;
            this.newMessageForm.reset(); // Clear input after sending
          },
          error: error => {
            console.error("Error sending message:", error);
            // More robust error handling:
            // 1. Display an error message to the user (e.g., using a snackbar or alert).
            // 2. Potentially retry the send operation or take other corrective actions.
            // Example using an alert (replace with your preferred method):
            alert("Failed to send message. Please try again."); 
          }
        });
    } else {
      console.warn("Cannot send message: No chat selected or form invalid.");
      // Optionally inform the user (if no chat selected, maybe prompt them to select one).
    }
  }

  closeChat() {
    this.showChatBox = false;
    this.showContacts = true;
    this.currentChatChannel = null;
    this.messages = [];
  }
}