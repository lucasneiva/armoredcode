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

  serverError: string | null = null; // To display server error messages

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
    return role ? role : 'CLIENT'; // Default to 'CLIENT' if no role is provided
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  /*
  register(){
    this.authService.registerService(this.registerForm.value)
    .subscribe({
      next:(res)=>{
        alert("User Created!")
        this.registerForm.reset();
        this.router.navigate(['login'])
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  */
  register() {
    this.serverError = null; // Clear previous errors
    this.authService.registerService(this.registerForm.value)
      .subscribe({
        next: (res) => {
          alert("User Created!");
          this.registerForm.reset();
          this.router.navigate(['login']);
        },
        error: (err) => {
          if (err.status === 400 && err.error && err.error.message) {  // Check for 400 Bad Request and specific error structure
            const errorMessage = err.error.message;
            if (typeof errorMessage === 'object') {  // Check if it's an object
                if (errorMessage.username) {
                    this.serverError = errorMessage.username;
                } else if (errorMessage.email) {  // Handle the case where email already exists
                    this.serverError = errorMessage.email; 
                } else {
                    this.serverError = 'Registration failed. Please try again.'; // Generic error if other fields are invalid
                }
            } else { // If it's not an object
                this.serverError = 'Registration failed. Please try again.'; // Generic error
            }


          } else {
            this.serverError = 'Registration failed. Please try again.'; // Generic error message
            console.error(err); // Log the full error for debugging
          }
        }
      });
  }
}
