import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export default class ProfileComponent {
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
