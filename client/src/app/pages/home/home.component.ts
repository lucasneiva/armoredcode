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
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ProjectCardComponent, FreelancerCardComponent, SearchBarComponent ],
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

  isLoading = false; // default is true
  userRole: string | null = null;

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
        if (this.userRole === 'CLIENT') {
          this.searchService.searchFreelancers(searchTerm).subscribe(freelancers => {
            this.freelancers = freelancers;
            this.isLoading = false;
          });
        } else if (this.userRole === 'FREELANCER') {
          this.searchService.searchProjects(searchTerm).subscribe(projects => {
            this.projects = projects;
            this.isLoading = false;
          });
        }
      }
    });
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
