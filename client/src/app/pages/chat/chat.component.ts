import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ChatChannel, ChatResponse, ChatService, Message } from '../../services/chat.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export default class ChatComponent implements OnInit, OnDestroy, OnChanges {
  fb = inject(FormBuilder);
  cdRef = inject(ChangeDetectorRef);
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

  private destroy$ = new Subject<void>();

  newMessageForm: FormGroup = this.fb.group({ // Define as FormGroup
    content: ['', Validators.required] // Add required validator
  });

  trackByMessage(index: number, message: Message): string {
    return message._id || index.toString();
  }

  ngOnInit() {
    this.currentUserId = this.authService.getUserId() || "";
    /*debug*/ //console.log("userID: ", this.currentUserId);
    this.loadContacts(); // loadContacts is safe here, it's independent from userId.
    // now we can safely subscribe to the route changes because userId will be there.
    this.route.params.pipe(
      switchMap(({ channelId }) => {
        if (channelId) {
          return this.chatService.getChatChannelById(channelId);
        } else {
          return of(null);
        }
      })
    ).subscribe(channel => {
      if (channel) {
        this.openChat(channel._id);
      }
      // else: nothing to be done because there is no channel Id to open automatically.
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentChatChannel'] && this.currentChatChannel) {
      this.loadMessages(this.currentChatChannel._id);
    }
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
    this.loadMessages(channelId).then(() => { // Use a promise to ensure messages are loaded
      this.chatService.getChatChannelById(channelId).subscribe({
        next: (channel) => {
          if (channel) {
            this.currentChatChannel = channel;
            this.showChatBox = true; // Show AFTER messages are loaded
            this.showContacts = false;

            /*debug*///console.log(this.currentChatChannel.data);
            // loadCurrentChatChannelUser start
            let currentContactId = "";
            if (this.currentUserId !== this.currentChatChannel.data.clientId){
              currentContactId = this.currentChatChannel.data.clientId;
            } else{
              currentContactId = this.currentChatChannel.data.freelancerId;
            }
            this.userService.getUser(currentContactId).subscribe({
              next: (response) => {
                if (response.success) {
                  this.otherUserName = response.data.username;
                } else {
                  console.error(`Failed to retrieve other user details from this channel`, response.message);
                  this.otherUserName = "Unknown User";
                }
              },
              error: (error) => {
                console.error(`Error fetching other user details from this channel`, error);
                this.otherUserName = "Unknown User";
              }
            });
            // loadCurrentChatChannelUser end
          }
        },
        error: (error) => {
          console.error('Error fetching Channel:', error);
          // Possibly handle the UI here to indicate a failed load
        }
      });
    });
  }

  closeChat() {
    this.showChatBox = false;
    this.showContacts = true;
    this.currentChatChannel = null;
    this.messages = [];
  }

  loadMessages(channelId: string): Promise<void> { // Return a promise
    return new Promise<void>((resolve, reject) => {  // Wrap in a promise
      this.chatService.getChatChannelById(channelId).subscribe({
        next: (response) => {
          if (response && response.data && Array.isArray(response.data.messages)) {
            this.messages = [...response.data.messages];
            /*debug*/ //console.log("messages: ", this.messages);
            this.cdRef.detectChanges(); // Essential if using OnPush, consider if not
            resolve(); // Resolve the promise
          } else {
            this.messages = [];
            console.error("Invalid response format or messages not an array:", response);
            reject(new Error("Invalid message data")); // Reject if there's an issue
          }
        },
        error: (error) => {
          console.error('Error loading message:', error);
          reject(error); // Reject with the error
        }
      });
    });
  }

  sendMessage() {
    if (this.newMessageForm.valid && this.currentChatChannel && this.currentChatChannel.data._id) {
      const messageContent = this.newMessageForm.value.content;
      const channelId = this.currentChatChannel.data._id;

      const newMessage: Message = {
        content: messageContent,
        senderId: this.currentUserId,
        timestamp: new Date(),
        _id: ''
      };

      this.chatService.sendMessage(channelId, { content: newMessage.content })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response.success && response.data && Array.isArray(response.data.messages)) {
              this.messages = [...response.data.messages];
              this.newMessageForm.reset();
              this.cdRef.detectChanges();

              /* Logging for verification:
              console.log("currentUserId (trimmed):", this.currentUserId.trim());
              this.messages.forEach(message => {
                console.log("message.senderId (processed):", this.getSenderId(message), "Comparison Result:", this.getSenderId(message) === this.currentUserId.trim());
              });
              */
            } else {
              console.error("Invalid response format or messages not an array:", response);
              // Optional: Display an error message to the user
            }
          },
          error: (error) => {
            console.error('Error sending message:', error);
            // Optional: Display an error message to the user
          }
        });
    }
  }

  // In your component
  getSenderId(message: Message): string {
    return typeof message.senderId === 'string'
      ? message.senderId.trim()  // If it's already a string, trim it
      : (message.senderId as any)._id?.trim() || ''; // Safely access _id if it's an object
  }

  openChatProject(){

  }
}