import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService, Project } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
  projectService = inject(ProjectService);
  authService = inject(AuthService);

  projects: Project[] = [];

  @Output() projectSelected = new EventEmitter<Project>();

  ngOnInit() {
    this.loadProjects();
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
}