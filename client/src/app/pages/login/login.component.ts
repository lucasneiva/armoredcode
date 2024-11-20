import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Profile, ProfileResponse, ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  profileService = inject(ProfileService);
  router = inject(Router);

  loginForm !: FormGroup;

  profile: Profile | null = null;
  showPassword = false;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    },
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.authService.loginService(this.loginForm.value)
      .subscribe({
        next: (res) => {
          //alert("Login is Success!");
          localStorage.setItem("user_id", res.data._id);
          localStorage.setItem('user_role', res.userRole);
          localStorage.setItem('token', res.token);
          this.authService.isLoggedIn$.next(true);

          const userId = this.authService.getUserId();
          this.profileService.getProfile(userId)
            .subscribe({
              next: (response: ProfileResponse) => {
                /*debug*/ //console.log("Full API response:", response);
                if (response.data && response.data.hasProfile) {
                  this.router.navigate(['home']);
                } else {
                  // if no profile
                  console.log('No profile found for this user.');
                  this.router.navigate(['create-profile']);
                }
              },
              error: (error) => {
                console.error("Error loading profile:", error);
              }
            });
        },
        error: (err) => {
          if (err.status === 404) {
            alert(err.error.message || 'User not found.');
          } else if (err.status === 400) {
            alert(err.error.message || 'Incorrect password.');
          } else {
            console.error(err);
            alert(err.error || 'An error occurred. Please try again.');
          }
          console.log(err);
        }
      });
  }
}

