import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { UserService } from '../../services/user.service';

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
  route = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthService);
  userService = inject(UserService);

  reviewClientForm !: FormGroup;
  reviewFreelancerForm !: FormGroup;

  isLoading = true; // Flag to track loading state
  userRole: string | null = null;

  clientId!: string;
  freelancerId!: string;
  reviewedUsername !: string;

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    this.createForm(); // Initialize both forms here

    this.route.params.subscribe(params => {
      if (this.userRole === "CLIENT"){
        this.clientId = params['id'];
      } else if (this.userRole === "FREELANCER"){
        this.freelancerId = params['id'];
      } else {
        console.error('invalid role!');
      }

      if (this.clientId) {
        this.loadUser(this.clientId);
        this.isLoading = false; // Set isLoading to false after data is loaded 
      }else if (this.freelancerId){
        this.loadUser(this.freelancerId);
        this.isLoading = false; // Set isLoading to false after data is loaded 
      } else {
        console.error('ID is missing');
      }
    });

  }

  loadUser(userId: string){
    this.userService.getUser(userId).subscribe({
      next: (response) => {
        /*debug*/ //console.log("Full API response:", response);
        this.reviewedUsername = response.data.username;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error loading profile:", error);
        this.isLoading = false;
      }
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
    //TODO LOGICA
    if (this.userRole === 'CLIENT') {
      /*debug*/ console.log(this.reviewFreelancerForm.value); 
    } else if (this.userRole === 'FREELANCER') {
      /*debug*/ console.log(this.reviewClientForm.value); 
    }
    alert("review sent!"); 
    this.router.navigate(['/manage-project']);
  }

  cancelReview() {
    alert("review cancelled!"); 
    this.router.navigate(['/manage-project']);
  }
}

