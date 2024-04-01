import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export default class ForgetPasswordComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  forgetForm !: FormGroup;

  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email: ['',Validators.compose ([Validators.required, Validators.email])]
    })
  }

  submit(){
    this.authService.sendEmailService(this.forgetForm.value.email)
    .subscribe({
      next: (res)=>{
        alert(res.message);
        this.forgetForm.reset;
      },
      error: (err)=>{
        alert(err.error.message);
      }
    })
  }
}
