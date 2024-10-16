import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
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
  menuRotated: boolean = false; // Add a flag to track rotation

  showHeader: boolean = true;
  previousScrollPosition: number = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition === 0) {
      this.showHeader = true;
    } else if (currentScrollPosition < this.previousScrollPosition) {
      this.showHeader = true;
    } else if (currentScrollPosition > this.previousScrollPosition) {
      this.showHeader = false;
    }

    this.previousScrollPosition = currentScrollPosition;
  }

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
    this.router.navigate(['login']);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    this.menuRotated = !this.menuRotated; // Toggle rotation flag

    setTimeout(() => { 
      const mobileMenu = document.querySelector('.mobile-menu');
      if (this.showMenu) {
        mobileMenu?.classList.add('open');
      } else {
        mobileMenu?.classList.remove('open');
      }
    }, 0); 
  }

  private closeMenu() {
    this.showMenu = false; 
  }
}
