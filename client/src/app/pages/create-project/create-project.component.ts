import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,
        ReactiveFormsModule, Validators} from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SkillService } from '../../services/skill.service';
import { hourlyRateValidator } from '../../validators/hourly-rate.validator';
import { endDateValidator } from '../../validators/date.validator';
import { budgetValidator } from '../../validators/budget.validator';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
})
export default class CreateProjectComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  skillService = inject(SkillService); 

  createProjectForm!: FormGroup;

  datePipe: any;
  projectCategories: any[] = []; // Array to store categories
  skills: any[] = []; //array to store skills
  filteredSkills: any[] = []; // Array to store filtered skills
  
  currentPage = 1; // Start with the first page
  totalPages = 3; // Total number of pages
  pageNumbers: number[] = []; 
  showSkillsList: boolean = false; 

  ngOnInit() {
    // Correctly initialize pageNumbers array:
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.fetchSkills();
    this.getProjectCategories();
    this.createProjectForm = this.fb.group({
      clientId: [this.authService.getUserId(), Validators.required],
      freelancerId: [],
      projectCategoryId: ['', Validators.required],
      skillIds: [[]], // Initialize as an empty array
      projectTitle: ['', Validators.required],
      projectDescription: ['', Validators.required],
      projectHourlyRate: this.fb.group({
        min: [, Validators.required],
        max: [, Validators.required],
        currency: ['R$'],
      }, { validators: hourlyRateValidator }), 
      projectBudget: this.fb.group({
        min: [, Validators.required],
        max: [, Validators.required],
        currency: ['R$'],
      }, { validators: budgetValidator }),
      pricingType: ['BUDGET', Validators.required],
      estimatedDuration: ['', Validators.required],
      projectSize: ['SMALL'],
      projectStatus: [''],
      experienceLevel: ['ENTRY-LEVEL'],
      workModel: ['REMOTE', Validators.required],
      location: this.fb.group({
        streetAddress: ['Av. Eng. Carlos Reinaldo Mendes, 2015'],
        neighborhood: ['EDEN'],
        city: ['SOROCABA'],
        state: ['SP'],
        cep: ['19180-000'],
        country: ['BRAZIL'],
      }),

      // CAMPOS CALCULADOS
      startDate: [''],
      endDate: ['', [endDateValidator]], // Apply endDateValidator here
    });
     // Subscribe to pricingType changes to enable/disable fields
     this.createProjectForm.get('pricingType')?.valueChanges.subscribe(pricingType => {
      const BudgetControl = this.createProjectForm.get('projectBudget');
      const hourlyRateControl = this.createProjectForm.get('projectHourlyRate');
      if (pricingType === 'BUDGET') {
        hourlyRateControl?.disable(); 
        hourlyRateControl?.reset();
        BudgetControl?.enable();
      } else {
        BudgetControl?.disable(); 
        BudgetControl?.reset();
        hourlyRateControl?.enable();
      }
    });
  }

  nextPage() {
    this.currentPage++;
    /*debug*///alert(this.currentPage);
  }

  previousPage() {
    this.currentPage--;
    /*debug*///alert(this.currentPage);
  }

  showPage(pageNumber: number): boolean {
    return this.currentPage === pageNumber;
  }

  CreateProject() {
    this.createProjectForm.patchValue({ projectStatus: 'DRAFT' });
    /*debug*/ //console.log(this.createProjectForm.value);
    this.projectService
      .createProjectService(this.createProjectForm.value)
      .subscribe({
        next: (res) => {
          alert('project Created!');
          this.projectService.isDraft$.next(true);
          this.createProjectForm.reset();
          this.router.navigate(['manage-project']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  PostProject() {
    this.createProjectForm.patchValue({ projectStatus: 'POSTED' });
    /*debug*/ //console.log(this.createProjectForm.value);
    this.projectService
      .createProjectService(this.createProjectForm.value)
      .subscribe({
        next: (res) => {
          alert('project Created and Posted!');
          this.projectService.isPosted$.next(true);
          this.router.navigate(['manage-project']);
          this.createProjectForm.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  CancelProject() {
    alert('project Canceled!');
    this.router.navigate(['manage-project']);
    this.createProjectForm.reset();
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

  fetchSkills() {
    this.skillService.getSkills().subscribe(
      (response: any) => {
        this.skills = response.data;
        this.filteredSkills = this.skills; // Initialize filteredSkills
      },
      (error) => {
        console.error('Error fetching skills:', error);
      }
    );
  }

  // Method to filter skills based on search input
  searchSkills(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.showSkillsList = searchTerm.length > 0; // Show if search term is not empty

    if (this.showSkillsList) { 
      this.filteredSkills = this.skills.filter((skill) =>
        skill.skillName.toLowerCase().includes(searchTerm)
      );
    }
  }

  // Method to get skill name by ID
  getSkillNameById(skillId: string): string {
    const skill = this.skills.find((s) => s._id === skillId);
    return skill ? skill.skillName : ''; // Return skill name or empty string if not found
  }

  // Method to add a skill to the project
  addSkill(skillId: string) {
    const skillIdsControl = this.createProjectForm.get('skillIds') as FormControl;
    const skillIds = skillIdsControl.value;

    if (!skillIds.includes(skillId)) {
      skillIdsControl.setValue([...skillIds, skillId]);
    }
  }

  // Method to remove a skill from the project
  removeSkill(skillId: string) {
    const skillIdsControl = this.createProjectForm.get('skillIds') as FormControl;
    const skillIds = skillIdsControl.value;
    skillIdsControl.setValue(skillIds.filter((id: string) => id !== skillId));
  }

  // Method to determine if a skill should be visible
  isSkillVisible(skillId: string): boolean {
    const skillIdsControl = this.createProjectForm.get('skillIds') as FormControl;
    return skillIdsControl.value.includes(skillId);
  }

  // Helper method to check if any skills are selected
  hasSelectedSkills(): boolean {
    const skillIdsControl = this.createProjectForm.get('skillIds') as FormControl;
    return skillIdsControl.value.length > 0; 
  }

}