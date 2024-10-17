import { Component, inject } from '@angular/core';
import { SearchService, SearchStateService } from '../../services/search.service';
import { Project } from '../../services/project.service';
import { Profile } from '../../services/profile.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  providers: [SearchService], // Provide the service here
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  searchService = inject(SearchService);
  searchStateService = inject(SearchStateService); // Inject the service
  isSearchBarVisible = false; // Add a property to track visibility

  projects: Project[] = [];
  freelancers: Profile[] = []; // Create an array to hold freelancer profiles
  
  userRole: string | null = null;
  searchTerm: string = '';

  ngOnInit() {
    this.searchStateService.isSearchBarVisible$.subscribe(isVisible => {
      this.isSearchBarVisible = isVisible;
    });
  }

  search() {
    // Check if the search term is empty, if so, load the initial data (optional)
    if (this.searchTerm.trim() === '') {
      // Load initial data (e.g., all freelancers or all projects)
      if (this.userRole === 'CLIENT') {
        //this.loadFreelancers(); // Your existing method to load all freelancers
      } else if (this.userRole === 'FREELANCER') {
        //this.loadProjects(); // Your existing method to load all projects
      }
      return;
    }

    // Call the appropriate search service method based on the user role
    if (this.userRole === 'CLIENT') {
      this.searchService.searchFreelancers(this.searchTerm).subscribe(
        (freelancers) => {
          this.freelancers = freelancers;

        },
        (error) => {
          console.error("Error searching freelancers:", error);

        }
      );
    } else if (this.userRole === 'FREELANCER') {
      this.searchService.searchProjects(this.searchTerm).subscribe(
        (projects) => {
          this.projects = projects;

        },
        (error) => {
          console.error("Error searching projects:", error);

        }
      );
    }
  }
}
