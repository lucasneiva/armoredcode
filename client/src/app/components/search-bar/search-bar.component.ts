import { Component, EventEmitter, inject, Output } from '@angular/core';
import { SearchService, SearchStateService } from '../../services/search.service';
import { Project, ProjectService } from '../../services/project.service';
import { Profile } from '../../services/profile.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpecializationService } from '../../services/specialization.service';
import { SkillService } from '../../services/skill.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  providers: [SearchService],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  searchService = inject(SearchService);
  searchStateService = inject(SearchStateService); 
  skillService = inject(SkillService);
  specializationService = inject(SpecializationService);

  @Output() filtersChanged = new EventEmitter<any>(); // Add an output event
  
  selectedSkillControl = new FormControl('');
  selectedSkillIds: string[] = []; 
  skills: any[] = [];

  specializations: any[] = [];
  projects: Project[] = [];
  projectCategories: any[] = []; // Array to store categories
  freelancers: Profile[] = [];
  
  searchTerm: string = '';
  selectedExperienceLevel: string = ''; 
  selectedProjectCategoryId: string = ''; 
  selectedSpecializationId: string = '';

  isSearchBarVisible = false; // Add a property to track visibility
  userRole: string | null = null;

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    if (this.userRole === 'CLIENT') {
      this.fetchSpecializations(); 
      this.fetchSkills();
    } else if (this.userRole === 'FREELANCER'){
      this.getProjectCategories();
      this.fetchSkills();
    } else {
      console.log("invalid role");
    }
    this.searchStateService.isSearchBarVisible$.subscribe(isVisible => {
      this.isSearchBarVisible = isVisible;
    });
  }

  search() {
    this.searchStateService.setSearchTerm(this.searchTerm);
    if (this.userRole === 'CLIENT') {
      this.searchService.searchFreelancers(
        this.searchTerm, 
        this.selectedSkillIds, 
        this.selectedExperienceLevel, 
        this.selectedSpecializationId 
      ).subscribe(results => {
        console.log("term: ",this.searchTerm);
        console.log("XP Level: ",this.selectedExperienceLevel);
        console.log("Specialization: ",this.selectedSpecializationId);
        console.log("skills: ", this.selectedSkillIds);
      });
    }

    if (this.userRole === 'FREELANCER') {
      this.searchService.searchProjects(
        this.searchTerm, 
        this.selectedProjectCategoryId,
        this.selectedSkillIds
      ).subscribe(results => {
        console.log("term: ",this.searchTerm);
        console.log("Project category: ",this.selectedProjectCategoryId);
        console.log("skills: ", this.selectedSkillIds);
      });
    }

    // Emit the event with the selected filter values
    this.filtersChanged.emit({
      searchTerm: this.searchTerm,
      skillIds: this.selectedSkillIds,
      experienceLevel: this.selectedExperienceLevel,
      specializationId: this.selectedSpecializationId,
      projectCategoryId: this.selectedProjectCategoryId
    });
  
    
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

  fetchSpecializations() {
    this.specializationService.getSpecializations().subscribe(
      (response: any) => {
        this.specializations = response.data;
      },
      (error) => {
        console.error("Error fetching specializations:", error);
      }
    );
  }

  fetchSkills() {
    this.skillService.getSkills().subscribe(response => {
      this.skills = response.data;
    });
  }

  addSelectedSkill(): void {
    const selectedSkillId = this.selectedSkillControl.value;
    if (selectedSkillId && !this.selectedSkillIds.includes(selectedSkillId)) {
      this.selectedSkillIds.push(selectedSkillId);
      this.selectedSkillControl.setValue(''); // Clear the dropdown after adding
    }
  }

  removeSkill(index: number): void {
    this.selectedSkillIds.splice(index, 1);
  }

  hasSelectedSkills(): boolean {
    return this.selectedSkillIds.length > 0;
  }

  getSkillObjectById(skillId: string): any | undefined {
    return this.skills.find((s) => s._id === skillId);
  }

  getSkillNameById(skill: any): string {
    return skill ? skill.skillName : '';
  }

  getProjectCategories() {
    this.projectService.getProjectCategories().subscribe(
      (response: any) => {
        this.projectCategories = response.data;
      },
      (error) => {
        console.error('Error fetching project categories:', error);
      }
    );
  }

}