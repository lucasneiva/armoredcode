import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  isLoggedIn: boolean = false;
  profilePath = '../../assets/images/prf_icon.png';
  logoPath = '../../assets/images/logo_branca_sfundo.png';
  menuPath = '../../assets/images/menu-svgrepo-com.svg';

  showMenu: boolean = false;

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(res => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }

  logOut() {
    this.authService.logout();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
