import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export default class ChatComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  chatService = inject(ChatService);

  
}
