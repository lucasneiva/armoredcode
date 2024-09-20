import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';  // Adjust the path if necessary
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SkillService } from '../../services/skill.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export default class EditProjectComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  skillService = inject(SkillService);
  route = inject(ActivatedRoute);

  editProjectForm!: FormGroup;
  isLoading = true;
  project: any;
  projectCategories: any[] = [];
  skills: any[] = [];
  filteredSkills: any[] = [];
  currentPage = 1;
  totalPages = 5;
  pageNumbers: number[] = [];
  showSkillsList = false;
  projectId!: string;

  ngOnInit(): void {
    this.initForms();  // Initialize the form early in ngOnInit
    // Add this log to check if projectId is being correctly passed
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      console.log('Project ID:', this.projectId);  // Log projectId for debugging
  
      if (this.projectId) {
        this.loadProject();  // Load the project only if projectId is valid
      } else {
        console.error('Project ID is missing');
      }
    });
  }
  

  // Initialize form structure
  initForms(): void {
    this.editProjectForm = this.fb.group({
      clientId: [this.authService.getUserId(), Validators.required],
      freelancerId: [''],
      projectCategoryId: ['', Validators.required],
      skillIds: [[], Validators.required],
      projectTitle: ['', Validators.required],
      projectDescription: ['', Validators.required],
      projectHourlyRate: this.fb.group({
        min: [, Validators.required],
        max: [, Validators.required],
      }),
      projectBudget: this.fb.group({
        min: [, Validators.required],
        max: [, Validators.required],
      }),
      pricingType: ['BUDGET', Validators.required],
      estimatedDuration: ['', Validators.required],
      projectSize: [''],
      experienceLevel: [''],
      workModel: ['', Validators.required],
      location: this.fb.group({
        streetAddress: [''],
        neighborhood: [''],
        city: [''],
        state: [''],
        cep: [''],
        country: [''],
      }),
      startDate: [''],
      endDate: [''],
    });
  }

  loadProject(): Promise<void> {
    this.isLoading = true;
    return firstValueFrom(this.projectService.getProjectById(this.projectId)).then(response => {
      this.project = response.data;
      console.log('Project loaded:', this.project);  // Debug log
      this.isLoading = false;
    }).catch(error => {
      console.error('Error loading project:', error);
      this.isLoading = false;
    });
  }
  
  // Fetch project categories
  getProjectCategories(): void {
    this.projectService.getProjectCategories().subscribe(response => {
      this.projectCategories = response.data;
    }, error => {
      console.error('Error fetching project categories:', error);
    });
  }

  // Fetch available skills
  fetchSkills(): void {
    this.skillService.getSkills().subscribe(response => {
      this.skills = response.data;
      this.filteredSkills = this.skills;
    }, error => {
      console.error('Error fetching skills:', error);
    });
  }

  // Search for skills
  searchSkills(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.showSkillsList = searchTerm.length > 0;
    if (this.showSkillsList) {
      this.filteredSkills = this.skills.filter(skill => skill.skillName.toLowerCase().includes(searchTerm));
    }
  }

  // Method to get skill name by ID
  getSkillNameById(skillId: string): string {
    const skill = this.skills.find((s) => s._id === skillId);
    return skill ? skill.skillName : ''; // Return skill name or empty string if not found
  }

  // Add selected skill
  addSkill(skillId: string): void {
    const skillIdsControl = this.editProjectForm.get('skillIds') as FormControl;
    const skillIds = skillIdsControl.value;
    if (!skillIds.includes(skillId)) {
      skillIdsControl.setValue([...skillIds, skillId]);
    }
  }

  // Remove skill
  removeSkill(skillId: string): void {
    const skillIdsControl = this.editProjectForm.get('skillIds') as FormControl;
    const updatedSkillIds = skillIdsControl.value.filter((id: string) => id !== skillId);
    skillIdsControl.setValue(updatedSkillIds);
  }

  // Check if skills are selected
  hasSelectedSkills(): boolean {
    const skillIdsControl = this.editProjectForm.get('skillIds') as FormControl;
    return skillIdsControl.value.length > 0;
  }

  TestValue(selectedOption: string) {
    this.editProjectForm.patchValue({ pricingType: selectedOption });

    switch (selectedOption) {
      case 'BUDGET':
        this.editProjectForm.patchValue({ projectHourlyRate: null });
        this.updateHourlyRate(0, 0);
        break;
      case 'HOURLY_RATE':
        this.editProjectForm.patchValue({ projectBudget: null });
        this.updateBudget(0, 0);
        break;
      default:
        // Handle default values or reset to initial values
        break;
    }
  }

  updateHourlyRate(newMin: number, newMax: number) {
    this.editProjectForm.patchValue({
      projectHourlyRate: {
        min: newMin,
        max: newMax,
      },
    });
  }

  updateBudget(newMin: number, newMax: number) {
    this.editProjectForm.patchValue({
      projectBudget: {
        min: newMin,
        max: newMax,
      },
    });
  }

  // Populate form with fetched project data
  populateForms(project: any): void {
    if (project) {
      this.editProjectForm.patchValue({
        clientId: project.clientId,
        freelancerId: project.freelancerId,
        projectCategoryId: project.projectCategoryId,
        projectTitle: project.projectTitle,
        projectDescription: project.projectDescription,
        pricingType: project.pricingType,
        estimatedDuration: project.estimatedDuration,
        projectSize: project.projectSize,
        experienceLevel: project.experienceLevel,
        workModel: project.workModel,
        location: project.location || {},
        startDate: project.startDate,
        endDate: project.endDate,
      });
      // Populate budget or hourly rate based on pricing type
      if (project.pricingType === 'BUDGET') {
        this.editProjectForm.get('projectBudget')?.patchValue(project.projectBudget);
      } else {
        this.editProjectForm.get('projectHourlyRate')?.patchValue(project.projectHourlyRate);
      }
    }
  }

  showPage(pageNumber: number): boolean {
    return this.currentPage === pageNumber;
  }

  // Navigation between form pages
  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  // Form submission methods
  EditProject(): void {
    if (this.editProjectForm.valid) {
      this.editProjectForm.patchValue({ projectStatus: 'DRAFT' });
      this.projectService.updateProject(this.projectId, this.editProjectForm.value).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    }
  }

  PostProject(): void {
    if (this.editProjectForm.valid) {
      this.editProjectForm.patchValue({ projectStatus: 'POSTED' });
      this.projectService.updateProject(this.projectId, this.editProjectForm.value).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    }
  }

  CancelProject(): void {
    this.router.navigate(['/projects']);
  }
}
