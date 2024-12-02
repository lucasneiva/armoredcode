import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProfileService, Profile, ProfileResponse } from '../../services/profile.service';
import { Industry, IndustryService } from '../../services/industry.service';
import { Specialization, SpecializationService } from '../../services/specialization.service';
import { SkillService } from '../../services/skill.service';
import { __values } from 'tslib';
import { UserService } from '../../services/user.service';
import { StarDisplayComponent } from "../../components/star-display/star-display.component";

@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, StarDisplayComponent],
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.scss'
})
export default class ManageProfileComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  profileService = inject(ProfileService);
  industryService = inject(IndustryService);
  specializationService = inject(SpecializationService);
  skillService = inject(SkillService);
  userService = inject(UserService);

  profileForm !: FormGroup;

  profile: Profile | null = null;
  industry: Industry | null = null;
  specialization: Specialization | null = null;
  skills: string[] = [];
  skillImages: { [key: string]: string } = {};

  isLoading = true;
  showConfirmationModal = false;

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.isLoading = true;
    const userId = this.authService.getUserId();
    this.profileService.getProfile(userId) 
      .subscribe({
        next: (response: ProfileResponse) => {
          console.log("Full API response:", response);
          if (response.data && response.data.hasProfile) {
            this.profile = response.data.profile;
          } else {
            // Handle the case where there is no profile, maybe set a flag
            console.log('No profile found for this user.');
          }
          if (this.profile?.industryId) {
            this.loadIndustry(this.profile.industryId);
          }
          if (this.profile?.specializationId) {
            /*debug*/ //console.log('Specialization ID being passed:', this.profile.specializationId);
            this.loadSpecialization(this.profile.specializationId);
          }
          if (this.profile?.skillIds) {
            /*debug*/ //console.log(this.profile.skillIds);
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
          /*debug*/ //console.log(specializationData);
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
          /*debug*/ //console.log(industryData);
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
            const skillName = skillData.data.skillName;
            this.skills.push(skillName);
            this.skillImages[skillName] = skillData.data.skillImage; // Store the image URL
          },
          error: (error) => {
            console.error("Error loading skill:", error);
          }
        });
    });
  }

  getImageUrl(relativePath: string | undefined): string | undefined {
    if (!relativePath) return undefined; // Handle cases where there's no image
    return `${window.location.origin}/${relativePath}`;
  }

  // Function to show the confirmation modal
  showDeleteConfirmation() {
    this.showConfirmationModal = true;
  }

  // Function to handle the confirmation modal response
  handleConfirmation(confirmed: boolean) {
    this.showConfirmationModal = false; 

    if (confirmed) {
      this.deleteProfile();
    }
  }

  deleteProfile() {
    this.profileService.deleteProfile()
      .subscribe({
        next: () => {
          // Profile deletion successful, now delete the user
          this.userService.deleteUser()
            .subscribe({
              next: () => {
                alert("Perfil Deletado com Sucesso!");
                localStorage.removeItem("user_id");
                localStorage.removeItem('user_role');
                localStorage.removeItem('token');
                this.authService.isLoggedIn$.next(false);
                console.log('Profile and user deleted successfully.');
                this.router.navigate(['login']);
              },
              error: (error) => {
                // Handle error deleting user (e.g., display an error message)
                console.error('Error deleting user:', error);
              }
            });
        },
        error: (error) => {
          // Handle error deleting profile (e.g., display an error message)
          console.error('Error deleting profile:', error);
        }
      });
  }

  logOut() {
    this.authService.logout();
  }

}
