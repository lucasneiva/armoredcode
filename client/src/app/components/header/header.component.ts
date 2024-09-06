import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <span *ngIf="isVisible">This text will disappear at certain resolutions.</span>
  `,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  isLoggedIn: boolean = false;
  profilePath = '../../assets/images/prf_icon.png';
  logoPath = '../../assets/images/logo_branca_sfundo.png';
  menuPath = '../../assets/images/menu-svgrepo-com.svg';

  isVisible = true;
  showMenu: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isVisible = this.checkResolution();
  }

  checkResolution(): boolean {
    const targetWidth = 1150;
    // const targetHeight = ???; 

    return window.innerWidth > targetWidth;
  }

  ngOnInit(): void {
    this.isVisible = this.checkResolution();
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
