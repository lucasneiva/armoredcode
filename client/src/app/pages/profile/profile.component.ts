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

  profileForm !: FormGroup;

  isClient: boolean = false;

  authService = inject(AuthService);
  isLoggedIn: boolean = false;
  userName = 'User_name';
  userId = 'User_ID';

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(res=>{
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }

  logOut(){
    localStorage.removeItem("user_id");
    this.authService.isLoggedIn$.next(false);
  }
}
