import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FreelancerCardComponent } from '../../components/freelancer-card/freelancer-card.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { Project, ProjectService } from '../../services/project.service';
import { Profile, ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ProjectCardComponent, FreelancerCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  profileService = inject(ProfileService);

  projects: Project[] = [];
  //freelancers: Freelancer[] = [];
  
  homeForm !: FormGroup;

  isLoading = false; // default is true
  userRole: string | null = null; 
  isClient: boolean = false; 

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();

    if (this.userRole === 'CLIENT') {
      this.isClient = true;
      this.loadFreelancers();
    } else if (this.userRole === 'FREELANCER') {
      this.isClient = false;
      this.loadProjects();
    } else {
      console.log("invalid role");
    }

  }
  loadProjects() {
    this.projectService.getAllProjects().subscribe({
      next: (res) => {
        this.projects = res.data; // Assuming your API response structure
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error fetching projects:", err);
        this.isLoading = false;
      }
    });
  }

  loadFreelancers(){
    //TODO
  }
  
}
