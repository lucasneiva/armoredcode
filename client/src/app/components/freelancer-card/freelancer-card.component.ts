import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ProfileService } from '../../services/profile.service';
import { SkillService } from '../../services/skill.service';
import { UserService } from '../../services/user.service';
import { SpecializationService } from '../../services/specialization.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { ProjectListComponent } from '../project-list/project-list.component';
import { Project } from '../../services/project.service';

@Component({
  selector: 'app-freelancer-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ProjectListComponent],
  templateUrl: './freelancer-card.component.html',
  styleUrl: './freelancer-card.component.scss'
})
export class FreelancerCardComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  profileService = inject(ProfileService);
  skillService = inject(SkillService);
  specializationService = inject(SpecializationService);
  userService = inject(UserService);
  authService = inject(AuthService);
  notificationService = inject(NotificationService);

  userRole: string | null = null;

  @Input() freelancer: any;
  detailedfreelancer: any = null;
  showDetails = false; // Flag to control showing details
  showProjectList = false;
  selectedProject: Project | null = null;

  freelancerName = '';
  specializationName: string = '';
  skills: string[] = [];

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    if (this.userRole === 'CLIENT') {
      this.loadFreelancerDetails();
    } else {
      console.log("invalid role");
    }
  }

  toggleDetails() {
    if (this.showDetails) {
      this.detailedfreelancer = null; // Clear project details when closing
    } else {
      this.loadFreelancerDetails(); // Load new data when opening
    }
    this.showDetails = !this.showDetails;
  }

  loadFreelancerDetails() {
    const freelancerId = this.freelancer.userId._id; // Access the _id property
    /*debug*/ //console.log("Freelancer data:", this.freelancer);
    this.profileService.getProfile(freelancerId).subscribe(
      (response) => {
        if (response.success) {
          this.detailedfreelancer = response.data.profile;
          /*debug*/ //console.log("Detailed Freelancer:", this.detailedfreelancer);
          const skillIds = this.detailedfreelancer.skillIds || []; // Handle null skillIds
          this.loadFreelancerName(freelancerId);
          this.loadSkills(skillIds);
          if (this.detailedfreelancer.specializationId) {
            this.loadSpecializationName(this.detailedfreelancer.specializationId);
          }
        } else {
          console.error('Failed to retrieve freelancer details:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching freelancer details:', error);
      }
    );
  }

  loadFreelancerName(userId: string) {
    this.userService.getUser(userId).subscribe(
      (response) => {
        if (response.success) {
          this.freelancerName = response.data.username;
        } else {
          console.error('Failed to retrieve freelancer name:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching freelancer name:', error);
      });
  }

  loadSpecializationName(specializationId: string) {
    this.specializationService.getSpecializationById(specializationId).subscribe(
      (response) => {
        if (response.success) {
          this.specializationName = response.data.specializationName; // Assuming the name is in the 'specializationName' field
          /*debug*/ //console.log(this.specializationName);
        } else {
          console.error('Failed to retrieve specialization details:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching specialization details:', error);
      }
    );
  }

  loadSkills(skillIds: string[]) {
    skillIds.forEach((skillId) => {
      this.skillService.getSkillById(skillId).subscribe({
        next: (skillData) => {
          const skillName = skillData.data.skillName;

          // Check if the skill is already in the array
          if (!this.skills.includes(skillName)) {
            this.skills.push(skillName);
          }
        },
        error: (error) => {
          console.error("Error loading skill:", error);
        }
      });
    });
  }

  viewFreelancerProfile() {
    /*debug*/ //console.log("view Profile button clicked");
    this.router.navigate(['../freelancer-profile', this.freelancer.userId._id], { relativeTo: this.route });
  }

  sendInvite() {
    this.showProjectList = true; // Show the project list when "Send Invite" is clicked
  }
  
  handleProjectSelection(project: Project) {
    this.selectedProject = project;
    this.showProjectList = false; // Hide the list after selection
    const clientId = this.authService.getUserId(); // Assuming you have a method to get the logged-in client's ID
    const freelancerId = this.freelancer.userId._id;
    const projectId = this.selectedProject?._id; // Get the selected project ID 

    if (clientId && freelancerId) {
      const notificationObj = {
        clientId: clientId,
        freelancerId: freelancerId,
        projectId: projectId,
        message: "Você foi convidado para este projeto!", // Customize the message as needed
      };

      /*debug*/ //console.log(notificationObj);

      this.notificationService.createNotification(notificationObj).subscribe({
        next: (response) => {
          if (response.success) {
            alert("Invite sent successfully!");
            // You can add a success message or other actions here, like disabling the button
          } else {
            console.error("Failed to send invite:", response.message);
            // Handle error, e.g., show an error message to the user
          }
        },
        error: (error) => {
          console.error("Error sending invite:", error);
          // Handle error, e.g., show an error message to the user
        }
      });
    } else {
      console.error("Client ID or Freelancer ID is missing!");
      // Handle the case where IDs are not available 
    }
  }
}
