import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProfileService, Profile, ProfileResponse } from '../../services/profile.service';

@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.scss'
})
export default class ManageProfileComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  profileService = inject(ProfileService);

  profileForm !: FormGroup;

  profile: Profile | null = null;
  isLoading = true;
  showConfirmationModal = false; // Flag for the confirmation modal

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

  // Function to show the confirmation modal
  showDeleteConfirmation() {
    this.showConfirmationModal = true;
  }

  // Function to handle the confirmation modal response
  handleConfirmation(confirmed: boolean) {
    this.showConfirmationModal = false; // Close the modal

    if (confirmed) {
      this.deleteProfile(); // Proceed with deletion
    }
  }

  deleteProfile() {
    this.profileService.deleteProfile()
      .subscribe(() => {
        alert("Profile deleted sucessfully!");
        localStorage.removeItem("user_id");
        localStorage.removeItem('user_role');
        localStorage.removeItem('token');
        this.authService.isLoggedIn$.next(false);
        console.log('Profile deleted successfully.');
        this.router.navigate(['login']);
      },
        (error) => {
          // Handle error (e.g., display an error message)
          console.error('Error deleting profile:', error);
        }
      );
  }

  logOut() {
    this.authService.logout();
  }

}