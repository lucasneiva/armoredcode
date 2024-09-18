import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Project } from '../../services/project.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input({required: true}) project!: Project;
  showDetails = false; // Flag to control showing details

  toggleDetails() {
    this.showDetails = !this.showDetails;
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
    // Implement logic to navigate to the "edit-project" page
    console.log("Edit Project button clicked");
    // Example: navigate to /edit-project/:id
  }
}