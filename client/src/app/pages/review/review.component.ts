import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { UserService } from '../../services/user.service';
import { ProjectService, Rating } from '../../services/project.service';

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
  projectService = inject(ProjectService);
  projectId!: string; 

  reviewTheFreelancerForm !: FormGroup;
  reviewTheClientForm !: FormGroup;

  isLoading = true; 
  userRole: string | null = null;

  clientId!: string;
  freelancerId!: string;
  reviewedUsername !: string;
  evaluatedUserId !: string;

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    this.createForm(); 

    this.route.params.subscribe(params => {
      if (this.userRole === "CLIENT"){
        this.clientId = params['id'];
        this.projectId = params['projectId'];
      } else if (this.userRole === "FREELANCER"){
        this.freelancerId = params['id'];
        this.projectId = params['projectId'];
      } else {
        console.error('invalid role!');
      }

      if (this.clientId) {
        this.loadUser(this.clientId);
        this.isLoading = false; 
      }else if (this.freelancerId){
        this.loadUser(this.freelancerId);
        this.isLoading = false; 
      } else {
        console.error('ID is missing');
      }
    });

  }

  loadUser(userId: string){
    this.userService.getUser(userId).subscribe({
      next: (response) => {
        /*debug*/ console.log("Full API response:", response);
        this.reviewedUsername = response.data.username;
        this.evaluatedUserId = response.data._id;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error loading profile:", error);
        this.isLoading = false;
      }
    });
    
  }

  createForm() {
    this.reviewTheFreelancerForm = this.fb.group({ // For reviewing a FREELANCER
      workQuality: [0, Validators.required],
      communication: [0, Validators.required],
      professionalism: [0, Validators.required],
      costBenefit: [0, Validators.required],
      payments: [0, Validators.required],
      feedback: [0, Validators.required], 
      comment: ['']
    });

    this.reviewTheClientForm = this.fb.group({ // For reviewing a CLIENT
      workQuality: [0, Validators.required],
      communication: [0, Validators.required],
      professionalism: [0, Validators.required],
      clarityDescription: [0, Validators.required], 
      comment: ['']
    });
  }

  submitReview() {
    if (this.userRole === 'CLIENT') {
      const reviewData: Rating = { // Use Rating type
        projectId: this.projectId, 
        evaluatorId: this.authService.getUserId(), 
        evaluatedId: this.evaluatedUserId,
        evaluatorType: 'CLIENT',
        workQuality: this.reviewTheFreelancerForm.get('workQuality')?.value,
        communication: this.reviewTheFreelancerForm.get('communication')?.value,
        professionalism: this.reviewTheFreelancerForm.get('professionalism')?.value,
        costBenefit: this.reviewTheFreelancerForm.get('costBenefit')?.value,
        payments: this.reviewTheFreelancerForm.get('payments')?.value,
        feedback: this.reviewTheFreelancerForm.get('feedback')?.value, 
        comment: this.reviewTheFreelancerForm.get('comment')?.value 
      };
      /*debug*/ console.log(reviewData);
      this.projectService.createRating(reviewData).subscribe({
        next: (response) => {
          if (response.success) {
            alert("Avaliação enviada com Sucesso!");
            this.router.navigate(['/manage-project']);
          } else {
            // Handle error
            alert("Error submitting review");
          }
        },
        error: (error) => {
          // Handle error
          alert("Error submitting review: " + error.message);
        }
      });

    } else if (this.userRole === 'FREELANCER') {
      const reviewData: Rating = { // Use Rating type
        projectId: this.projectId,
        evaluatorId: this.authService.getUserId(),
        evaluatedId: this.evaluatedUserId,
        evaluatorType: "FREELANCER", 
        workQuality: this.reviewTheClientForm.get('workQuality')?.value,
        communication: this.reviewTheClientForm.get('communication')?.value,
        professionalism: this.reviewTheClientForm.get('professionalism')?.value,
        clarityDescription: this.reviewTheClientForm.get('clarityDescription')?.value, 
        comment: this.reviewTheClientForm.get('comment')?.value 
      };
      /*debug*/ console.log(reviewData);
      this.projectService.createRating(reviewData).subscribe({
        next: (response) => {
          if (response.success) {
            alert("Avaliação enviada com Sucesso!");
            this.router.navigate(['/manage-project']);
          } else {
            // Handle error
            alert("Error submitting review: " + response.message);
          }
        },
        error: (error) => {
          // Handle error
          alert("Error submitting review: " + error.message);
        }
      });
    }
  }

  cancelReview() {
    alert("Avaliação Cancelada!"); 
    this.router.navigate(['/manage-project']);
  }
}

