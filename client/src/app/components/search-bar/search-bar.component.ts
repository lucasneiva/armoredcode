import { Component, inject } from '@angular/core';
import { SearchService, SearchStateService } from '../../services/search.service';
import { Project } from '../../services/project.service';
import { Profile } from '../../services/profile.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpecializationService } from '../../services/specialization.service';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  providers: [SearchService],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  searchService = inject(SearchService);
  searchStateService = inject(SearchStateService); 
  specializationService = inject(SpecializationService);
  skillService = inject(SkillService);
  
  selectedSkillControl = new FormControl('');
  selectedSkillIds: string[] = []; 
  skills: any[] = [];

  specializations: any[] = [];
  projects: Project[] = [];
  freelancers: Profile[] = [];
  
  searchTerm: string = '';
  selectedExperienceLevel: string = ''; 
  selectedSpecializationId: string = '';

  isSearchBarVisible = false; // Add a property to track visibility
  userRole: string | null = null;

  ngOnInit() {
    this.fetchSpecializations(); 
    this.fetchSkills();
    this.searchStateService.isSearchBarVisible$.subscribe(isVisible => {
      this.isSearchBarVisible = isVisible;
    });
  }

  search() {
    this.searchStateService.setSearchTerm(this.searchTerm);
    this.searchService.searchFreelancers(
      this.searchTerm, 
      this.selectedSkillIds, 
      this.selectedExperienceLevel, 
      this.selectedSpecializationId 
    ).subscribe(results => {
      console.log("term: ",this.searchTerm);
      console.log("skills: ", this.selectedSkillIds);
      console.log("XP Level: ",this.selectedExperienceLevel);
      console.log("Specialization: ",this.selectedSpecializationId);
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

}