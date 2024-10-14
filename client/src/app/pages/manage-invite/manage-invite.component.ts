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
      this.notificationService.getFreelancerNotifications(this.authService.getUserId()).subscribe({
        next: (res) => {
          this.invites = res.data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Error fetching projects:", err);
          this.isLoading = false;
        }
      });
    }
    else {
      console.log("invalid role");
    }

  }
}
