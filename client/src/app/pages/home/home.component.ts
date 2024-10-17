import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FreelancerCardComponent } from '../../components/freelancer-card/freelancer-card.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { Project, ProjectService } from '../../services/project.service';
import { Profile, ProfileService } from '../../services/profile.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule, ProjectCardComponent, FreelancerCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  profileService = inject(ProfileService);
  searchService = inject(SearchService);

  projects: Project[] = [];
  freelancers: Profile[] = []; // Create an array to hold freelancer profiles

  homeForm !: FormGroup;

  isLoading = false; // default is true
  userRole: string | null = null;

  searchTerm: string = '';

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    if (this.userRole === 'CLIENT') {
      this.loadFreelancers();
    } else if (this.userRole === 'FREELANCER') {
      this.loadProjects();
    } else {
      console.log("invalid role");
    }
  }

  search() {
    // Check if the search term is empty, if so, load the initial data (optional)
    if (this.searchTerm.trim() === '') {
      // Load initial data (e.g., all freelancers or all projects)
      if (this.userRole === 'CLIENT') {
        this.loadFreelancers(); // Your existing method to load all freelancers
      } else if (this.userRole === 'FREELANCER') {
        this.loadProjects(); // Your existing method to load all projects
      }
      return;
    }

    // Call the appropriate search service method based on the user role
    if (this.userRole === 'CLIENT') {
      this.searchService.searchFreelancers(this.searchTerm).subscribe(
        (freelancers) => {
          this.freelancers = freelancers;
          this.isLoading = false;
        },
        (error) => {
          console.error("Error searching freelancers:", error);
          this.isLoading = false;
        }
      );
    } else if (this.userRole === 'FREELANCER') {
      this.searchService.searchProjects(this.searchTerm).subscribe(
        (projects) => {
          this.projects = projects;
          this.isLoading = false;
        },
        (error) => {
          console.error("Error searching projects:", error);
          this.isLoading = false;
        }
      );
    }
  }

  loadProjects() {
    this.projectService.getPostedProjects().subscribe({
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

  loadFreelancers() {
    this.profileService.getAllFreelancerProfiles().subscribe({
      next: (res) => {
        this.freelancers = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error fetching freelancer profiles:", err);
        this.isLoading = false;
      }
    });
  }

}
