import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FreelancerCardComponent } from '../../components/freelancer-card/freelancer-card.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { Project, ProjectService } from '../../services/project.service';
import { Profile, ProfileService } from '../../services/profile.service';
import { SearchService, SearchStateService } from '../../services/search.service'; // Import SearchStateService
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ProjectCardComponent, FreelancerCardComponent, SearchBarComponent],
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
  searchStateService = inject(SearchStateService);

  homeForm !: FormGroup;

  projects: Project[] = [];
  freelancers: Profile[] = []; // Create an array to hold freelancer profiles

  isLoading = true; // default is true
  userRole: string | null = null;

  // In home.component.ts
  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.searchStateService.searchTerm$.subscribe(searchTerm => {
      if (searchTerm.trim() === '') {
        // Load initial data if search term is empty
        if (this.userRole === 'CLIENT') {
          this.loadFreelancers();
        } else if (this.userRole === 'FREELANCER') {
          this.loadProjects();
        } else {
          console.log("invalid role");
        }
      } else {
        // Perform search based on the search term
        this.isLoading = true;
        if (this.userRole === 'CLIENT') {
          this.searchService.searchFreelancers(searchTerm).subscribe({
            next: (freelancers) => {
              /*debug*/ console.log("Freelancers from search:", freelancers); // Log the response
              this.freelancers = (freelancers.data || []).map((freelancer: { userId: any; }) => {
                return { 
                  ...freelancer, 
                  userId: { _id: freelancer.userId } // Create the userId object
                };
              });
              this.isLoading = false;
            },
            error: (err) => {
              console.error("Error searching freelancers:", err);
              this.isLoading = false;
            }
          });
        } else if (this.userRole === 'FREELANCER') {
          this.searchService.searchProjects(searchTerm).subscribe({
            next: (projects) => {
              console.log("Projects from search:", projects); // Log the response
              this.projects = projects.data || []; // Handle potential missing 'data'
              this.isLoading = false;
            },
            error: (err) => {
              console.error("Error searching projects:", err);
              this.isLoading = false;
            }
          });
        }
      }
    });
  }

  loadProjects() {
    this.projectService.getPostedProjects().subscribe({
      next: (res) => {
        console.log("Initial projects:", res); // Log the initial response
        this.projects = res.data || []; // Handle potential missing 'data'
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
        console.log("Initial freelancers:", res); // Log the initial response
        this.freelancers = res.data || []; // Handle potential missing 'data'
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error fetching freelancer profiles:", err);
        this.isLoading = false;
      }
    });
  }
}
