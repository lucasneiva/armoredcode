import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export default class ChatComponent {

}
