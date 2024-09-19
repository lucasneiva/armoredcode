import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  router = inject(Router);
  projectService = inject(ProjectService);

  @Input() project: any;
  detailedProject: any = null;  // Separate object for detailed data
  showDetails = false; // Flag to control showing details

  toggleDetails() {
    if (this.showDetails) {
      this.detailedProject = null; // Clear project details when closing
    } else {
      this.loadProjectDetails(); // Load new data when opening
    }
    this.showDetails = !this.showDetails;
  }  

  loadProjectDetails() {
    const projectId = this.project._id;
    this.projectService.getProjectById(projectId).subscribe(
      (response) => {
        if (response.success) {
          this.detailedProject = response.data;  // Access the 'data' property from the response
          //debug /* console.log('Full Project Data:', this.detailedProject); */
        } else {
          console.error('Failed to retrieve project details:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching project details:', error);
      }
    );
  }

  postProject() {
    // Implement logic to post the project (e.g., make an API call)
    console.log("Post Project button clicked");
  }

  cancelProject() {
    // Implement logic to cancel the project (e.g., make an API call)
    console.log("Cancel Project button clicked");
  }

  editProject() {
    console.log("Edit Project button clicked");
    this.router.navigate(['edit-project']);
  }
}