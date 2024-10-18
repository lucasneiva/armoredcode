import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService, Project } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { UserService } from '../../services/user.service';

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
  userService = inject(UserService); // Inject UserService

  projects: Project[] = [];
  selectedProjectDetails: any | null = null; // Change type to any to accommodate extra data
  creatorName = '';
  skills: string[] = []; 
  userRole: string | null = this.authService.getUserRole(); 

  @Output() projectSelected = new EventEmitter<Project>();
  @Output() projectListClosed = new EventEmitter<void>(); 
  @Output() close = new EventEmitter<void>();

  ngOnInit() {
    this.loadProjects();
  }

  onClose() {
    this.close.emit(); 
  }

  showProjectDetails(project: Project) {
    this.projectService.getProjectById(project._id).subscribe({
      next: (res) => {
        this.selectedProjectDetails = res.data; 
        /*debug*/ //console.log(this.selectedProjectDetails);
        this.loadCreatorName(this.selectedProjectDetails.clientId._id); // Fetch creator name
        this.skills = this.selectedProjectDetails.skills || []; // Extract skills
      },
      error: (err) => {
        console.error("Error fetching project details:", err);
      }
    });
  }

  loadCreatorName(userId: string) {
    this.userService.getUser(userId).subscribe(
      (response) => {
        if (response.success) {
          this.creatorName = response.data.username;
        } else {
          console.error('Failed to retrieve creator details:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching creator details:', error);
      });
  }

  closeProjectDetails() {
    this.selectedProjectDetails = null;
    this.creatorName = "";
    this.skills = [];
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