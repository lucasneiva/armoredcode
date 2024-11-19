import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FreelancerCardComponent } from '../../components/freelancer-card/freelancer-card.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { Project, ProjectService } from '../../services/project.service';
import { Profile, ProfileService } from '../../services/profile.service';
import { SearchService, SearchStateService } from '../../services/search.service';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpecializationService } from '../../services/specialization.service';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:
    [CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      ProjectCardComponent,
      FreelancerCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
  private destroy$ = new Subject<void>();

  router = inject(Router);
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  profileService = inject(ProfileService);
  searchService = inject(SearchService);
  searchStateService = inject(SearchStateService);
  skillService = inject(SkillService);
  specializationService = inject(SpecializationService);

  skills: any[] = [];
  specializations: any[] = [];
  projectCategories: any[] = [];

  projects: Project[] = [];
  freelancers: Profile[] = [];
  isLoading = true;
  userRole: string | null = null;

  // Filter properties (initialize with defaults)
  searchTerm = '';
  skillIds: string[] = [];
  selectedSkillControl = new FormControl(''); // Add FormControl
  experienceLevel = '';
  specializationId = '';
  projectCategoryId = '';

  isFiltersVisible = true;

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();

    // Subscribe to searchTerm changes
    this.searchStateService.searchTerm$
      .pipe(takeUntil(this.destroy$))
      .subscribe(term => {
        this.searchTerm = term;
        this.performSearch(); // Perform search when search term changes
      });

    // Initial data load and search based on user role
    if (this.userRole === 'CLIENT') {
      this.fetchSpecializations();
      this.fetchSkills();
      this.loadFreelancers(() => this.performSearch());
    } else if (this.userRole === 'FREELANCER') {
      this.getProjectCategories();
      this.fetchSkills();
      this.loadProjects(() => this.performSearch());
    }

  }

  toogleFiltersSidebar(){
  this.isFiltersVisible = !this.isFiltersVisible;
  }

  handleFiltersChanged(filters: any): void {
    this.searchTerm = filters.searchTerm;
    this.skillIds = filters.skillIds || [];
    this.experienceLevel = filters.experienceLevel || '';
    this.specializationId = filters.specializationId || '';
    this.projectCategoryId = filters.projectCategoryId || '';

    this.performSearch(); // Perform search when filters change
  }

  performSearch(): void {
    this.isLoading = true;

    if (this.userRole === 'CLIENT') {
      this.searchService.searchFreelancers(this.searchTerm, this.skillIds, this.experienceLevel, this.specializationId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (freelancers) => {
            this.freelancers = (freelancers.data || []).map((freelancer: any) => ({
              ...freelancer,
              userId: { _id: freelancer.userId } // Fix userId
            }));
            this.isLoading = false;
          },
          error: (err) => {
            console.error("Error searching freelancers:", err);
            this.isLoading = false;
          }
        });


    } else if (this.userRole === 'FREELANCER') {
      this.searchService.searchProjects(this.searchTerm, this.projectCategoryId, this.skillIds)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (projects) => {
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

  loadProjects(callback?: () => void): void {
    this.projectService.getPostedProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.projects = res.data || [];
          this.isLoading = false;
          if (callback) callback();
        },
        error: (err) => {
          console.error("Error fetching projects:", err);
          this.isLoading = false;
        }
      });
  }

  loadFreelancers(callback?: () => void): void {
    this.profileService.getAllFreelancerProfiles()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {

          this.freelancers = res.data || [];
          this.isLoading = false;
          if (callback) callback();
        },
        error: (err) => {
          console.error("Error fetching freelancer profiles:", err);
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchOnEnterKey(event: Event) {
    const keyboardEvent = event as KeyboardEvent; // Cast to KeyboardEvent
    if (keyboardEvent.key === 'Enter') {
      this.searchStateService.setSearchTerm(this.searchTerm);
    }
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

  addSelectedSkill() {
    const selectedSkillId = this.selectedSkillControl.value;
    if (selectedSkillId && !this.skillIds.includes(selectedSkillId)) {
      this.skillIds.push(selectedSkillId);
      //this.selectedSkillControl.reset(); // Optional: Clear the selection
    }
  }

  removeSkill(index: number): void {  // Add this method
    this.skillIds.splice(index, 1);
}

  getSkillNameById(skillId: string): string {
    const skill = this.skills.find(s => s._id === skillId);
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
