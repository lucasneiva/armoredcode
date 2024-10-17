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
    this.searchStateService.setSearchTerm(this.searchTerm); // Update the search term in the service
  }
  
  searchOnEnterKey(event: Event) {
    const keyboardEvent = event as KeyboardEvent; // Cast to KeyboardEvent
    if (keyboardEvent.key === 'Enter') {
      this.searchStateService.setSearchTerm(this.searchTerm);
    }
  }

  closeSearchBar() {
    this.searchStateService.hideSearchBar(); 
    this.searchTerm = ''; // Clear the search term
  }
}