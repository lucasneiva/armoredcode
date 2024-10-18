import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService, Project } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { ProjectDetailsComponent } from '../project-details/project-details.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectDetailsComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
  projectService = inject(ProjectService);
  authService = inject(AuthService);

  projects: Project[] = [];
  selectedProjectDetails: Project | null = null;

  @Output() projectSelected = new EventEmitter<Project>();
  @Output() projectListClosed = new EventEmitter<void>(); // New event emitter
  @Output() close = new EventEmitter<void>();

  ngOnInit() {
    this.loadProjects();
  }

  onClose() {
    this.close.emit(); // Emit the close event
  }

  showProjectDetails(project: Project) {
    this.selectedProjectDetails = project;
  }

  closeProjectDetails() {
    this.selectedProjectDetails = null;
  }

  loadProjects() {
    const clientId = this.authService.getUserId();
    if (clientId) {
      this.projectService.getProjects().subscribe({
        next: (res) => {
          this.projects = res.data;
          
        },
        error: (err) => {
          console.error("Error fetching projects:", err);
        }
        
      });
    } else {
      console.error("Client ID is missing!");
    }
  }

  selectProject(project: Project) {
    this.projectSelected.emit(project);
  }

  closeProjectList() {
    this.projectListClosed.emit(); 
  }
}