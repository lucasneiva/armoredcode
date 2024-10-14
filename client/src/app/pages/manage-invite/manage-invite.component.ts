import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-invite',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manage-invite.component.html',
  styleUrl: './manage-invite.component.scss'
})
export default class ManageInviteComponent {

}
