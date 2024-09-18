import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Project } from '../../services/project.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  router = inject(Router);
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
    console.log("Edit Project button clicked");
    this.router.navigate(['edit-project']);
  }
}