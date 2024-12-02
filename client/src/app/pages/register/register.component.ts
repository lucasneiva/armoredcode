import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../../app/validators/confirm-password.validator';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export default class RegisterComponent implements OnInit{
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute); 

  registerForm !: FormGroup;
  showPassword = false;

  serverError: string | null = null; 

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['',Validators.required],
      email: ['',Validators.compose ([Validators.required, Validators.email])],
      password: ['',Validators.required],
      role: [this.getRoleFromQueryParams(), Validators.required] 
    },
    );
  }

  private getRoleFromQueryParams(): string {
    const role = this.route.snapshot.queryParams['role'];
    return role ? role : 'CLIENT'; 
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  register() {
    this.serverError = null; 
    this.authService.registerService(this.registerForm.value)
      .subscribe({
        next: (res) => {
          alert("Usuário Criado Com Sucesso!");
          this.registerForm.reset();
          this.router.navigate(['login']);
        },
        error: (err) => {
          if (err.status === 400 && err.error && err.error.message) {  
            const errorMessage = err.error.message;
            if (typeof errorMessage === 'object') {  
                if (errorMessage.username) {
                    this.serverError = errorMessage.username;
                } else if (errorMessage.email) {  
                    this.serverError = errorMessage.email; 
                } else {
                    this.serverError = 'Registration failed. Please try again.'; 
                }
            } else { 
                this.serverError = 'Registration failed. Please try again.'; // Generic error
            }


          } else {
            this.serverError = 'Registration failed. Please try again.'; // Generic error message
            console.error(err);
          }
        }
      });
  }
}
