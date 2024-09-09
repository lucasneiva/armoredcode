import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProfileService, Profile, ProfileResponse } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export default class ProfileComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  profileService = inject(ProfileService);

  profileForm !: FormGroup;

  profile: Profile | null = null;
  isLoading = true;

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.isLoading = true;
    const userId = this.authService.getUserId();
    this.profileService.getProfile(userId) // Replace with how you get the user ID
      .subscribe({
        next: (response: ProfileResponse) => {
          console.log("Full API response:", response);
          if (response.data && response.data.hasProfile) {
            this.profile = response.data.profile;
          } else {
            // Handle the case where there is no profile, maybe set a flag
            console.log('No profile found for this user.');
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error("Error loading profile:", error);
          this.isLoading = false;
        }
      });
  }

  logOut() {
    this.authService.logout();
  }

}

