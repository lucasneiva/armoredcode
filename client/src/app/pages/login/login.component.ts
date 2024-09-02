import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm !: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    },
    );
  }

  //modified
  login() {
    this.authService.loginService(this.loginForm.value)
      .subscribe({
        next: (res) => {
          alert("Login is Success!");
          localStorage.setItem("user_id", res.data._id);
          // Store user role in localStorage 
          localStorage.setItem('user_role', res.userRole);
          localStorage.setItem('token', res.token);
          this.authService.isLoggedIn$.next(true);

          // Use the hasProfile flag directly from the response:
          if (res.hasProfile) {
            this.router.navigate(['home']);
          } else {
            this.router.navigate(['create-profile']);
          }

          this.loginForm.reset();
        },
        error: (err) => {
          console.log(err);
          alert(err.error);
        }
      });
  }

  /*
  login(){
    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        alert("Login is Success!");
        localStorage.setItem("user_id", res.data._id);
        localStorage.getItem("has_profile"); //arrumar
        this.authService.isLoggedIn$.next(true);
        
        if(!!localStorage.getItem("has_profile") == true){
          this.router.navigate(['home']);
        }
        else{
          this.router.navigate(['create-profile']);
        }
        
        this.router.navigate(['create-profile']);//arrumar
        this.loginForm.reset();
      },
      error:(err)=>{
        console.log(err);
        alert(err.error);
      }
    })
  }
    */
}

