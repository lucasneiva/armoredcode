import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export default class ProfileComponent {
  fb = inject(FormBuilder);

  profileForm !: FormGroup;

  isClient: boolean = false;

  authService = inject(AuthService);
  isLoggedIn: boolean = false;
  userName = this.Name;
  userId = this.Id;
  userRole = this.Role;

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      //profile edition
    },
    );
    this.checkRole();
  }

  checkRole() {
    try {
      const role = this.userRole;
      this.isClient = role === 'CLIENT';
      this.isClient == true;
    } catch (error) {
      // Handle potential errors
      console.error('Error fetching user role:', error);
    }
  }

  logOut(){
    localStorage.removeItem("user_id");
    this.authService.isLoggedIn$.next(false);
  }

  get Id(){
    return localStorage.getItem("user_id");
  } 

  get Name(){
    return localStorage.getItem("user_name");
  } 

  get Role(){
    return localStorage.getItem("user_role");
  } 
}

