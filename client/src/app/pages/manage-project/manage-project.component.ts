import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { Project, ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-manage-project',
  standalone: true,
  imports: [CommonModule, RouterModule, ProjectCardComponent],
  templateUrl: './manage-project.component.html',
  styleUrl: './manage-project.component.scss'
})
export default class ManageProjectComponent implements OnInit{
  router = inject(Router);
  authService = inject(AuthService);
  projectService = inject(ProjectService);

  isLoading = true; // Flag to track loading state
  userRole: string | null = null; 
  projects: Project[] = []; // Array to store projects

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    if (this.userRole === 'CLIENT' || this.userRole === 'FREELANCER'){
      this.projectService.getProjects().subscribe({
        next: (res) => {
          this.projects = res.data;
          this.isLoading = false; // Set loading to false after projects are loaded
        },
        error: (err) => {
          console.error("Error fetching projects:", err);
          this.isLoading = false; // Set loading to false even on error
        }
      });
    }
    else {
      console.log("invalid role");
    }

  }

}