import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-invite-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './invite-card.component.html',
  styleUrl: './invite-card.component.scss'
})
export class InviteCardComponent {
  router = inject(Router);
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  notificationService = inject(NotificationService);
  userService = inject(UserService);
  
  userRole: string | null = null; 

  @Input() invite: any;
  project: any;

  creatorName = '';
  freelancerName = '';

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    if (this.userRole === 'CLIENT' || this.userRole === 'FREELANCER') {
      this.loadInviteDetails();
    } else {
      console.log("invalid role");
    }
  }

  loadInviteDetails() {
    const inviteId = this.invite._id;
    this.notificationService.getInviteById(inviteId).subscribe(
      (response: { success: any; data: any; message: any; }) => {
        if (response.success) {
          this.invite = response.data;
          /*debug*/ //console.log('Full Invite Data:', this.invite);
          const userId = this.invite.freelancerId;
          const creatorId = this.invite.clientId;
          const projectId = this.invite.projectId;
          this.loadProject(projectId); 
          this.loadCreatorName(creatorId); 
          this.loadFreelancerName(userId); 
        } else {
          console.error('Failed to retrieve invite details:', response.message);
        }
      },
      (error: any) => {
        console.error('Error fetching invite details:', error);
      }
    );
  }

  loadProject(projectId: string | null): void {
    this.projectService.getProjectById(projectId).subscribe(response => {
      this.project = response.data;
      /*Debug*/ //console.log('Project loaded:', this.project);  
    });
  }

  loadCreatorName(userId: string) {
    this.userService.getUser(userId).subscribe(
      (response) => {
        if (response.success) {
          this.creatorName = response.data.username;
        } else {
          console.error('Failed to retrieve project creator details:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching project creator details:', error);
      });
  }

  loadFreelancerName(userId: string) {
    this.userService.getUser(userId).subscribe(
      (response) => {
        if (response.success) {
          this.freelancerName = response.data.username;
        } else {
          console.error('Failed to retrieve project creator details:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching project creator details:', error);
      });
  }

  acceptInvite() {
    const inviteId = this.invite._id;
    if (confirm("Are you sure you want to accept this invite?")) {
      this.notificationService.acceptInvite(inviteId).subscribe(
        (response: { success: any; message: any; }) => {
          if (response.success) {
            console.log('Invite accepted successfully');

            // 1. Update proposal status in the UI
            this.invite.status = 'ACCEPTED';

            // 2. Update the project with freelancer ID
            const projectId = this.invite.projectId;
            const freelancerId = this.invite.freelancerId;

            this.projectService.updateProjectFreelancer(projectId, freelancerId).subscribe(
              (updateResponse) => {
                if (updateResponse.success) {
                  console.log('Project freelancerId updated successfully');
                  // You might want to update the project object in your component if needed:
                  this.project.freelancerId = freelancerId; 
                } else {
                  console.error('Error updating project freelancerId:', updateResponse.message);
                  // Handle error (e.g., show an error message to the user)
                }
              },
              (error) => {
                console.error('Error updating project freelancerId:', error);
                // Handle error (e.g., show an error message to the user)
              }
            );
            this.projectService.updateProjectStatus(projectId, 'IN-PROGRESS').subscribe(
              (updateStatusResponse) => {
                if (updateStatusResponse.success) {
                  console.log('Project status updated successfully');
                  this.project.projectStatus = 'IN-PROGRESS'; // Update status in the component
                } else {
                  console.error('Error updating project status:', updateStatusResponse.message);
                  // Handle error (e.g., show an error message to the user)
                }
              },
              (error) => {
                console.error('Error updating project status:', error);
                // Handle error (e.g., show an error message to the user)
              }
            );
            window.location.reload();

          } else {
            console.error('Error accepting invite:', response.message);
          }
        },
        (error: any) => {
          console.error('Error accepting invite:', error);
        }
      );
    }
  }

  rejectInvite() {
    const inviteId = this.invite._id;
    if (confirm("Are you sure you want to reject this proposal?")) {
      this.notificationService.rejectInvite(inviteId).subscribe(
        (response: { success: any; message: any; }) => {
          if (response.success) {
            console.log('Proposal rejected successfully');
            // Update the proposal status in the UI or reload the page
            this.invite.status = 'REJECTED'; 
            window.location.reload();
          } else {
            console.error('Error rejecting proposal:', response.message);
          }
        },
        (error: any) => {
          console.error('Error rejecting proposal:', error);
        }
      );
    }
  }
}
