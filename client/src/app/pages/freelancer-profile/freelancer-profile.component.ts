import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProfileService, Profile, ProfileResponse } from '../../services/profile.service';
import { Industry, IndustryService } from '../../services/industry.service';
import { Specialization, SpecializationService } from '../../services/specialization.service';
import { SkillService } from '../../services/skill.service';
import { Project } from '../../services/project.service';
import { NotificationService } from '../../services/notification.service';
import { ProjectListComponent } from '../../components/project-list/project-list.component';

@Component({
  selector: 'app-freelancer-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ProjectListComponent],
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.scss']
})
export default class FreelancerProfileComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  profileService = inject(ProfileService);
  industryService = inject(IndustryService);
  specializationService = inject(SpecializationService);
  skillService = inject(SkillService);
  notificationService = inject(NotificationService);

  freelancerForm!: FormGroup;

  profile: Profile | null = null;
  industry: Industry | null = null;
  specialization: Specialization | null = null;
  skills: string[] = [];

  isLoading = true;
  freelancerId!: string;

  showProjectList = false;
  selectedProject: Project | null = null;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.freelancerId = params['id'];
      if (this.freelancerId) {
        this.loadProfile(this.freelancerId); 
      } else {
        console.error('Profile ID is missing');
      }
    });
  }

  loadProfile(userId: string) {
    this.isLoading = true;
    this.profileService.getProfile(userId) 
      .subscribe({
        next: (response: ProfileResponse) => {
          /*debug*/ //console.log("Full API response:", response);
          if (response.data && response.data.hasProfile) {
            this.profile = response.data.profile;
          } else {
            console.log('No profile found for this user.');
          }
          if (this.profile?.industryId) {
            this.loadIndustry(this.profile.industryId);
          }
          if (this.profile?.specializationId) {
            this.loadSpecialization(this.profile.specializationId);
          }
          if (this.profile?.skillIds) {
            this.loadSkills(this.profile.skillIds);
          }

          this.isLoading = false;
        },
        error: (error) => {
          console.error("Error loading profile:", error);
          this.isLoading = false;
        }
      });
  }

  loadSpecialization(specializationId: string) {
    this.specializationService.getSpecializationById(specializationId)
      .subscribe({
        next: (specializationData) => {
          this.specialization = specializationData.data.specializationName;
        },
        error: (error) => {
          console.error("Error loading specialization:", error);
        }
      });
  }

  loadIndustry(industryId: string) {
    this.industryService.getIndustryById(industryId)
      .subscribe({
        next: (industryData) => {
          this.industry = industryData.data;
        },
        error: (error) => {
          console.error("Error loading industry:", error);
        }
      });
  }

  loadSkills(skillIds: any[]) {
    skillIds.forEach((skillId) => {
      this.skillService.getSkillById(skillId)
        .subscribe({
          next: (skillData) => {
            this.skills.push(skillData.data.skillName);
          },
          error: (error) => {
            console.error("Error loading skill:", error);
          }
        });
    });
  }

  sendInvite() {
    console.log("invite button clicked");
    this.showProjectList = true; // Show the project list when "Send Invite" is clicked
  }
  
  handleProjectSelection(project: Project) {
    this.selectedProject = project;
    this.showProjectList = false; // Hide the list after selection
    const clientId = this.authService.getUserId(); // Assuming you have a method to get the logged-in client's ID
    const freelancerId = this.freelancerId;
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