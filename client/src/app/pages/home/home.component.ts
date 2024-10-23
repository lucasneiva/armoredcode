import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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
  imports: [CommonModule, RouterModule, ProjectCardComponent, FreelancerCardComponent, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
  router = inject(Router);
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  profileService = inject(ProfileService);
  searchService = inject(SearchService);
  searchStateService = inject(SearchStateService);

  projects: Project[] = [];
  freelancers: Profile[] = []; // Create an array to hold freelancer profiles

  isLoading = true; // default is true
  userRole: string | null = null;

  selectedSkillIds: string[] = []; 
  selectedExperienceLevel: string = ''; 
  selectedSpecializationId: string = '';
  selectedProjectCategoryId: string = ''; 

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
  
    this.searchStateService.searchTerm$.subscribe(searchTerm => {
      this.handleSearch(searchTerm); // Call handleSearch with the search term
    });

    this.searchStateService.isSearchBarVisible$.subscribe(isVisible => {
      if (isVisible) {
        this.isLoading = true; // Set isLoading to true before loading initial data
        if (this.userRole === 'CLIENT') {
          this.loadFreelancers();
        } else if (this.userRole === 'FREELANCER') {
          this.loadProjects();
        }
      }
    });
  }

  handleFiltersChanged(filters: any) {
    this.handleSearch(filters.searchTerm, filters); // Pass filters to handleSearch
  }
  
  handleSearch(searchTerm: string, filters: any = {}) { // Add filters parameter
    this.isLoading = true;
    if (this.userRole === 'CLIENT') {
      this.searchService.searchFreelancers(
        searchTerm, 
        filters.skillIds || [], // Use filters if available, otherwise empty array
        filters.experienceLevel || '',
        filters.specializationId || ''
      ).subscribe({
        next: (freelancers) => {
          console.log("Freelancers from search:", freelancers);
          this.freelancers = (freelancers.data || []).map((freelancer: { userId: any; }) => {
            return {
              ...freelancer,
              userId: { _id: freelancer.userId }
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
      this.searchService.searchProjects(
        searchTerm, 
        filters.projectCategoryId || '',
        filters.skillIds || []
      ).subscribe({
        next: (projects) => {
          console.log("Projects from search:", projects);
          this.projects = projects.data || [];
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Error searching projects:", err);
          this.isLoading = false;
        }
      });
    }
  }

  loadProjects() {
    this.projectService.getPostedProjects().subscribe({
      next: (res) => {
        console.log("Initial projects:", res);
        this.projects = res.data || [];
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
        console.log("Initial freelancers:", res);
        this.freelancers = res.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error fetching freelancer profiles:", err);
        this.isLoading = false;
      }
    });
  }
}
