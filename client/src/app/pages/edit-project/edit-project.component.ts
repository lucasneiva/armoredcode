import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';  // Adjust the path if necessary
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Skill, SkillService } from '../../services/skill.service';
import { firstValueFrom } from 'rxjs';
import { hourlyRateValidator } from '../../validators/hourly-rate.validator';
import { budgetValidator } from '../../validators/budget.validator';
import { endDateValidator } from '../../validators/date.validator';

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
  totalPages = 3;
  project: any;
  projectId!: string;

  otherSkillForm!: FormGroup;
  showOtherSkillForm: boolean = false;

  ngOnInit(): void {
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    this.fetchSkills();
    this.getProjectCategories();
    this.initForms();  // Initialize the form early in ngOnInit
    this.initOtherSkillForm(); // Initialize the other skill form

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

  // Initialize form structure
  initForms(): void {
    this.editProjectForm = this.fb.group({
      clientId: ['' , Validators.required],
      freelancerId: [],
      projectStatus: [''],
      projectCategoryId: ['', Validators.required],
      skillIds: [[]],
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
      pricingType: ['', Validators.required],
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
      endDate: ['', [endDateValidator]], // Apply endDateValidator here
    });
    // Subscribe to pricingType changes to enable/disable fields
    this.editProjectForm.get('pricingType')?.valueChanges.subscribe(pricingType => {
      const BudgetControl = this.editProjectForm.get('projectBudget');
      const hourlyRateControl = this.editProjectForm.get('projectHourlyRate');
      if (pricingType === 'BUDGET') {
        hourlyRateControl?.disable(); 
        hourlyRateControl?.patchValue({ min: null, max: null, currency: 'R$' }); 
        BudgetControl?.enable();
      } else {
        BudgetControl?.disable(); 
        BudgetControl?.patchValue({ min: null, max: null, currency: 'R$' }); 
        hourlyRateControl?.enable();
      }
    });
  }

  initOtherSkillForm() {
    this.otherSkillForm = this.fb.group({
      skillName: ['', Validators.required],
      skillDescription: [''], // Optional
    });
  }

  loadProject(): void {
    this.isLoading = true;
    this.projectService.getProjectById(this.projectId).subscribe(response => {
      this.project = response.data;
      /*Debug*/ //console.log('Project loaded:', this.project);  
      if (this.project) {
        this.populateForms(this.project);  // Pass the project object here
        this.isLoading = false;
      }
    });
  }

  // Populate form with fetched project data
  populateForms(project: any): void {
    if (project) {
      this.editProjectForm.patchValue({
        clientId: project.clientId,
        freelancerId: project.freelancerId,
        projectStatus: project.projectStatus,
        projectCategoryId: project.projectCategoryId?._id,
        projectTitle: project.projectTitle,
        projectDescription: project.projectDescription,
        pricingType: project.pricingType,
        //pricing type
        estimatedDuration: project.estimatedDuration,
        projectSize: project.projectSize,
        experienceLevel: project.experienceLevel,
        workModel: project.workModel,
        location: {
          cep: project.location?.cep || '',
          streetAddress: project.location?.streetAddress || '',
          neighborhood: project.location?.neighborhood || '',
          city: project.location?.city || '',
          state: project.location?.state || '',
          country: project.location?.country || '',
        },
        startDate: project.startDate,
        endDate: project.endDate,
      });

      // Populate skillIds array correctly
      const skillIdsControl = this.editProjectForm.get('skillIds') as FormControl;
      skillIdsControl.setValue(project.skillIds.map((skill: any) => skill._id)); 

      // Populate FormArrays
      project.skillIds?.forEach((skill: { _id: any; }) =>
        this.skills.push(new FormControl(skill._id))
      );

      // Populate budget or hourly rate based on pricing type
      if (project.pricingType === 'BUDGET') {
        this.editProjectForm.get('projectBudget')?.patchValue(project.projectBudget);
      } else {
        this.editProjectForm.get('projectHourlyRate')?.patchValue(project.projectHourlyRate);
      }
    }
  }

  EditProject() {
    this.editProjectForm.patchValue({ projectStatus: 'DRAFT' });
    /*debug*/ //console.log(this.editProjectForm.value);
    this.projectService
      .updateProject(this.projectId, this.editProjectForm.value)
      .subscribe({
        next: (res) => {
          alert('project Edited!');
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
    /*debug*/ //console.log(this.editProjectForm.value);
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

  searchSkills(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.showSkillsList = searchTerm.length > 0;
    if (this.showSkillsList) {
      this.filteredSkills = this.skills.filter(skill => {
        // Check if skill.skillName exists before calling toLowerCase()
        return skill.skillName ? skill.skillName.toLowerCase().includes(searchTerm) : false; 
      });
    }
  }

  // Method to get skill name by ID
  getSkillNameById(skillId: string): string {
    const skill = this.skills.find((s) => s._id === skillId);
    return skill ? skill.skillName : ''; // Return skill name or empty string if not found
  }

  // Add selected skill
  addSkill(skillId: string | null) { // Accept null for "Other" skill
    const skillIdsControl = this.editProjectForm.get('skillIds') as FormControl;
    const skillIds = skillIdsControl.value;

    if (skillId) { // If a skill from the list is selected
      if (!skillIds.includes(skillId)) {
        skillIdsControl.setValue([...skillIds, skillId]);
      }
    } else { // If "Other" skill is selected
      this.showOtherSkillForm = !this.showOtherSkillForm; // Toggle the form visibility
    }
  }

  createOtherSkill() {
    if (this.otherSkillForm.valid) {
      const newSkill: Skill = this.otherSkillForm.value;
      this.skillService.createSkillService(newSkill).subscribe({
        next: (createdSkill) => {
          // Update project form with new skill ID (createdSkill._id)
          console.log("new created skill: ", newSkill.skillName)
          this.addSkill(createdSkill._id);

          this.otherSkillForm.reset();
          this.showOtherSkillForm = false; // Hide "Other" skill form
          this.fetchSkills();
        },
        error: (error) => {
          console.error('Error creating skill:', error);
          // Handle the error appropriately (e.g., display an error message)
        }
      });

    }
  }

  cancellSkillCreation(){
    this.otherSkillForm.reset();
    this.showOtherSkillForm = false;
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

}
