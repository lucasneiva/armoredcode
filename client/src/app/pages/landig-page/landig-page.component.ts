import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landig-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,],
  templateUrl: './landig-page.component.html',
  styleUrl: './landig-page.component.scss'
})
export class LandigPageComponent {

}
