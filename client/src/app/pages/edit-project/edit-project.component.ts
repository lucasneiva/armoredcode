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
  route = inject(ActivatedRoute);

  authService = inject(AuthService);
  projectService = inject(ProjectService);
  skillService = inject(SkillService);

  editProjectForm!: FormGroup;

  isLoading = true;
  showSkillsList = false;

  projectCategories: any[] = [];
  skills: any[] = [];
  filteredSkills: any[] = [];
  pageNumbers: number[] = [];

  currentPage = 1;
  totalPages = 5;
  project: any;
  projectId!: string;

  ngOnInit(): void {
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    this.fetchSkills();
    this.getProjectCategories();
    this.initForms();  // Initialize the form early in ngOnInit

    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      if (this.projectId) {
        this.loadProject();  // Load the project only if projectId is valid
      } else {
        console.error('Project ID is missing');
      }
    });
  }

  // Navigation between form pages
  showPage(pageNumber: number): boolean {
    return this.currentPage === pageNumber;
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  EditProject() {
    this.editProjectForm.patchValue({ projectStatus: 'DRAFT' });
    /*debug*/ console.log(this.editProjectForm.value);
    this.projectService
      .updateProject(this.projectId, this.editProjectForm.value)
      .subscribe({
        next: (res) => {
          alert('project Edited!');
          //localStorage.setItem("project_id", res.data._id);
          this.projectService.isDraft$.next(true);
          this.editProjectForm.reset();
          this.router.navigate(['manage-project']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  PostProject() {
    this.editProjectForm.patchValue({ projectStatus: 'POSTED' });
    /*debug*/ console.log(this.editProjectForm.value);
    this.projectService
      .updateProject(this.projectId, this.editProjectForm.value)
      .subscribe({
        next: (res) => {
          alert('project Edited and Posted!');
          this.projectService.isPosted$.next(true);
          this.router.navigate(['manage-project']);
          this.editProjectForm.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  CancelProject() {
    alert('project edition Canceled!');
    this.router.navigate(['manage-project']);
    this.editProjectForm.reset();
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

  loadProject(): void {
    this.isLoading = true;
    this.projectService.getProjectById(this.projectId).subscribe(response => {
      this.project = response.data;
      /*Debug*/ //console.log('Project loaded:', this.project);  
      this.isLoading = false;
      if (this.project) {
        this.populateForms(this.project);  // Pass the project object here
      }
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
        projectBudget: {
          min: project.projectBudget.min,
          max: project.projectBudget.max,
        },
        projectHourlyRate: {
          min: project.projectHourlyRate.min,
          max: project.projectHourlyRate.max,
        },
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

}
