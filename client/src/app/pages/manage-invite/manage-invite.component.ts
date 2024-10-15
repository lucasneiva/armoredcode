import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InviteCardComponent } from '../../components/invite-card/invite-card.component';
//import { Project, ProjectService } from '../../services/project.service';
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

  isLoading = true; // Flag to track loading state
  userRole: string | null = null; 
  invites: Notification[] = []; // Array to store invites

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    if (this.userRole === 'CLIENT' || this.userRole === 'FREELANCER'){
      const userId = this.authService.getUserId();
      this.notificationService.getFreelancerNotifications(userId).subscribe({
        next: (res) => {
          console.log(res);
          if (res.success) { 
            this.invites = res.data; // Assign res.data to invites
            console.log("invites fetched:", this.invites); 
            this.isLoading = false;
          } else {
            console.error("Failed to fetch invites:", res.message);
            this.isLoading = false;
          }
        },
        // ... your error handling ...
      });
    }
    else {
      console.log("invalid role");
    }

  }
}
