import { Component, inject, Input, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-invite-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ProjectDetailsComponent],
  templateUrl: './invite-card.component.html',
  styleUrl: './invite-card.component.scss'
})
export class InviteCardComponent {
  router = inject(Router);
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  notificationService = inject(NotificationService);
  userService = inject(UserService);
  skillService = inject(SkillService);

  userRole: string | null = null;

  @Input() invite: any;
  project: any;
  detailedProject: any; // To store the detailed project data
  creatorName = '';
  freelancerName = '';
  skills: string[] = [];

  showProjectDetails = false; // To control the visibility of the project details

  @ViewChild('projectDetails') projectDetailsComponent!: ProjectDetailsComponent; // Get a reference to the child component

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
      this.detailedProject = response.data; // Store detailed project data
      const skillIds = this.detailedProject.skillIds;
      this.loadSkills(skillIds);
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

  loadSkills(skillIds: any[]) {
    skillIds.forEach((skillId) => {
      const skillIdValue = skillId._id;
      this.skillService.getSkillById(skillIdValue)
        .subscribe({
          next: (skillData) => {
            this.skills.push(skillData.data.skillName);
            /*debug*/ //console.log("skill: " + this.skills); console.log("id: " + skillIdValue);
          },
          error: (error) => {
            console.error("Error loading skill:", error);
          }
        });
    });
  }

  // Function to show the project details
  toggleProjectDetails() {
    this.showProjectDetails = !this.showProjectDetails;
  }

  // Function to handle the close event from the project details component
  handleCloseProjectDetails() {
    this.showProjectDetails = false;
  }
}
