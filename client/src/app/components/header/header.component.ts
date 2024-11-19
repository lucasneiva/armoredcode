import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Router, RouterModule, NavigationStart, NavigationEnd } from '@angular/router';
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

  isLoading: boolean = true;
  isLoggedIn: boolean = false;
  userRole: string | null = null;

  showMenu: boolean = false;
  menuRotated: boolean = false;

  showHeader: boolean = true;
  previousScrollPosition: number = 0;

  currentRoute: string = '';

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
      this.isLoading = false;
    });

    // Subscribe to Router events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd || event instanceof NavigationStart) {
        this.closeMenu();
      }
    });
    // Subscribe to Router events to track the current route
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
      }
    });
  }

  // Helper function to check if a route is active or a parent route is active
  isRouteActive(route: string): boolean {
    return this.currentRoute === route || this.currentRoute.startsWith(route + '/');
  }

  logOut() {
    this.authService.logout()
      .then(() => {
        this.closeMenu();
        this.router.navigate(['login']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    this.menuRotated = !this.menuRotated;

    setTimeout(() => {
      const mobileMenu = document.querySelector('.mobile-menu');
      if (this.showMenu) {
        mobileMenu?.classList.add('open');
      } else {
        mobileMenu?.classList.remove('open');
        this.menuRotated = false;
      }
    }, 0);
  }

  closeMenu() {
    this.showMenu = false;
    this.menuRotated = false;
  }
}
