import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InviteCardComponent } from '../../components/invite-card/invite-card.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-manage-invite',
  standalone: true,
  imports: [CommonModule, RouterModule, InviteCardComponent],
  templateUrl: './manage-invite.component.html',
  styleUrl: './manage-invite.component.scss'
})
export default class ManageInviteComponent implements OnInit{
  router = inject(Router);
  authService = inject(AuthService);
  notificationService = inject(NotificationService);

  isLoading = true; 
  userRole: string | null = null; 
  invites: Notification[] = []; 

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    if (this.userRole === 'CLIENT' || this.userRole === 'FREELANCER'){
      const userId = this.authService.getUserId();
      this.notificationService.getFreelancerNotifications(userId).subscribe({
        next: (res) => {
          /*debug*/ //console.log("API response: ",res);
          if (res.success) { 
            this.invites = res.data; 
            /*debug*/ //console.log("invites fetched:", this.invites); 
            this.isLoading = false;
          } else {
            console.error("Failed to fetch invites:", res.message);
            this.isLoading = false;
          }
        },
      });
    }
    else {
      console.log("invalid role");
    }

  }
}
