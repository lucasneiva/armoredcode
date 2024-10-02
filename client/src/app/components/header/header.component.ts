import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);
  
  profilePath = '../../assets/images/prf_icon.png';
  logoPath = '../../assets/images/logo_branca_sfundo.png';
  menuPath = '../../assets/images/menu-svgrepo-com.svg';

  isLoggedIn: boolean = false;
  userRole: string | null = null;
  showMenu: boolean = false;

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(res => {
      this.userRole = this.authService.getUserRole();
      this.isLoggedIn = this.authService.isLoggedIn();
    });

    // Subscribe to Router events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeMenu(); 
      }
    });
  }

  logOut() {
    this.authService.logout();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

   // Helper function to close the menu
   private closeMenu() {
    this.showMenu = false; 
  }
}
