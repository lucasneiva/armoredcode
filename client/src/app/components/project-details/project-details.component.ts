import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  projectService = inject(ProjectService);
  
  showDetails = false;
  
  @Input() project: any;
  @Input() detailedProject: any;
  @Input() creatorName!: string;
  @Input() skills!: string[];
  @Input() userRole!: string | null;

  @Output() close = new EventEmitter<void>();

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
    if (confirm("Are you sure you want to cancel this project?")) {
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

  makeProposal() {
    /*debug*/ //console.log("create Proposal button clicked");
    this.router.navigate(['../create-proposal', this.project._id], { relativeTo: this.route });
  }
}
