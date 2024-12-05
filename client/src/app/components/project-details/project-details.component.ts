import { CommonModule, formatDate } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ProjectService, Rating } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit{
  router = inject(Router);
  route = inject(ActivatedRoute);
  projectService = inject(ProjectService);
  authService = inject(AuthService);
  userService = inject(UserService);
  
  showDetails = false;

  showReviewButton = false; // Add flag for review button visibility
  ratings: Rating[] = []; // Store retrieved ratings

  creationDate: string | null = null; // Add creationDate property
  
  @Input() project: any;
  @Input() projectCategoryName!: string; // Add input for project category name
  @Input() detailedProject: any;
  @Input() creatorName!: string;
  @Input() skills!: string[];
  @Input() userRole!: string | null;

  @Output() close = new EventEmitter<void>();

  ngOnInit(): void { // Implement ngOnInit lifecycle hook
    if (this.detailedProject && this.detailedProject.createdAt) {
      this.creationDate = formatDate(this.detailedProject.createdAt, 'dd/MM/yyyy', 'en-US');
    }
    if (this.project && this.project._id && this.project.projectStatus === 'COMPLETED') {
      this.checkRatingCompletion(); // Check ratings on component initialization
    }
  }

  onClose() {
    this.close.emit(); // Emit the close event
  }

  postProject() {
    const projectId = this.project._id;
    this.projectService.updateProjectStatus(projectId, 'POSTED').subscribe(
      (response) => {
        if (response.success) {
          console.log('Project posted successfully');
          this.project.projectStatus = 'POSTED'; // Update the local project status
          this.detailedProject.projectStatus = 'POSTED'; // Update the detailed project status
          // You might need to emit an event to notify a parent component
        } else {
          console.error('Error posting project:', response.message);
          // Show an error message to the user
        }
        window.location.reload();
      },
      (error: any) => {
        console.error('Error posting project:', error);
        // Show an error message to the user
      }
    );
  }

  editProject() {
    /*debug*/ //console.log("Edit Project button clicked");
    this.router.navigate(['../edit-project', this.project._id], { relativeTo: this.route });
  }

  cancelProject() {
    const projectId = this.project._id;
    if (confirm("Você tem certeza que quer cancelar este projeto?")) {
      this.projectService.deleteProject(projectId).subscribe(
        (response) => {
          if (response.success) {
            console.log('Project cancelled successfully');
            window.location.reload();
            // You might need to emit an event to notify a parent component
          } else {
            console.error('Error cancelling project:', response.message);
            // Show an error message to the user
          }
        },
        (error) => {
          console.error('Error cancelling project:', error);
          // Show an error message to the user
        }
      );
    }
  }

  finishProject() {
    const projectId = this.project._id;
    this.projectService.updateProjectStatus(projectId, 'COMPLETED').subscribe(
      (response) => {
        if (response.success) {
          console.log('Project finished successfully');
          this.project.projectStatus = 'COMPLETED'; 
          this.detailedProject.projectStatus = 'COMPLETED'; 
          // You might need to emit an event to notify a parent component
        } else {
          console.error('Error finishing project:', response.message);
          // Show an error message to the user
        }
        window.location.reload();
      },
      (error) => {
        console.error('Error finishing project:', error);
        // Show an error message to the user
      }
    );
  }
  
  goToReview() {
    if (this.userRole === 'CLIENT' && this.detailedProject.freelancerId) {
      this.router.navigate(['../review',this.project._id ,this.detailedProject.freelancerId._id], { relativeTo: this.route });
    } else if (this.userRole === 'FREELANCER') {
      this.router.navigate(['../review',this.project._id ,this.detailedProject.clientId._id], { relativeTo: this.route });
    }
  }

  checkRatingCompletion() {
    this.projectService.checkRatingCompletion(this.project._id).subscribe({
      next: (response) => {
        if (response && response.success) {
          this.showReviewButton = !response.data.complete; // Show button if ratings are NOT complete
        } else {
          console.error("Error checking rating completion:", response?.message || "Unknown error");
          this.showReviewButton = false; // Handle errors (potentially show the button or an error message)
        }
      },
      error: (error) => {
        console.error("Error checking rating completion:", error);
        this.showReviewButton = false; // Handle errors
      }
    });
  }

  makeProposal() {
    /*debug*/ //console.log("create Proposal button clicked");
    this.router.navigate(['../create-proposal', this.project._id], { relativeTo: this.route });
  }
}
