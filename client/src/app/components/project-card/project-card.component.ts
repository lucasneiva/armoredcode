import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
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
  route = inject(ActivatedRoute); // Inject ActivatedRoute
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

  editProject() {
    console.log("Edit Project button clicked");
    this.router.navigate(['../edit-project', this.project._id], { relativeTo: this.route });
  }

}