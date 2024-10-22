import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StarRatingComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export default class ReviewComponent {
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthService);

  reviewClientForm !: FormGroup;
  reviewFreelancerForm !: FormGroup;

  isLoading = true; // Flag to track loading state
  userRole: string | null = null;
  clientName!: string;
  freelancerName!: string;

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    this.createForm(); // Initialize both forms here
    
    this.activatedRoute.params.subscribe(params => {
      this.clientName = params['clientName'] || 'Nome do Cliente';
      this.freelancerName = params['freelancerName'] || 'Nome do Freelancer';
      this.isLoading = false; // Set isLoading to false after data is loaded 
    });
  }

  createForm() {
    this.reviewClientForm = this.fb.group({
      professionalism: [0, Validators.required],
      communication: [0, Validators.required],
      costBenefit: [0, Validators.required],
      quality: [0, Validators.required],
      comment: ['']
    });

    this.reviewFreelancerForm = this.fb.group({
      professionalism: [0, Validators.required],
      communication: [0, Validators.required],
      clarity: [0, Validators.required],
      payments: [0, Validators.required],
      feedback: [0, Validators.required],
      comment: ['']
    });
  }

  submitReview() {
    if (this.userRole === 'CLIENT') {
      /*debug*/ console.log(this.reviewFreelancerForm.value); 
    } else if (this.userRole === 'FREELANCER') {
      /*debug*/ console.log(this.reviewClientForm.value); 
    }
    console.log("review sent!"); 
    this.router.navigate(['/manage-project']);
  }

  cancelReview() {
    console.log("review cancelled!"); 
    this.router.navigate(['/manage-project']);
  }
}

