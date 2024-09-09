import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProfileService, Profile } from '../../services/profile.service';

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
    const userId = this.authService.getUserId(); // Assuming you have a method to get the logged-in user ID
    if (!userId) {
      // Handle cases where the user ID is not available
      console.error("User ID not found!");
      this.isLoading = false;
      return;
    }

    this.profileService.getProfile(userId).subscribe({
      next: (response) => { 
        console.log("Full API response:", response); 
        this.profile = response.data;   // Update the component's profile property
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.isLoading = false;
        // Handle errors, e.g., redirect to login if unauthorized
      }
    });
  }

  logOut() {
    this.authService.logout();
  }

}

