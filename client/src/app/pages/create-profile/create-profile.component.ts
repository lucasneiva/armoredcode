import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss'
})
export default class CreateProfileComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  profileForm !: FormGroup;

  isClient: boolean = true; //false is default

  ngOnInit(): void {
    this.profileForm = this.fb.group({

    },
    );
  }
}
