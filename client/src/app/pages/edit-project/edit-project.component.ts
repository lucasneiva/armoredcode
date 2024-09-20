import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup,
  ReactiveFormsModule, Validators
} from '@angular/forms';
import { Project, ProjectResponse, ProjectService } from '../../services/project.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { AuthService } from '../../services/auth.service';
import { SkillService } from '../../services/skill.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss'
})
export default class EditProjectComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  skillService = inject(SkillService);
  route = inject(ActivatedRoute);

  editProjectForm!: FormGroup;

  datePipe: any;
  projectCategories: any[] = []; // Array to store categories
  skills: any[] = []; //array to store skills
  filteredSkills: any[] = []; // Array to store filtered skills

  currentPage = 1; // Start with the first page
  totalPages = 5; // Total number of pages
  pageNumbers: number[] = [];
  showSkillsList: boolean = false;

  isLoading = true;
  project: Project | null = null;

  projectId!: string;

  ngOnInit() {
    // Correctly initialize pageNumbers array:
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    this.fetchSkills();
    this.getProjectCategories();

    this.initForms();
    // Get project ID from route parameters
    this.route.params.subscribe(params => {
      this.projectId = params['id'];

      // Load project data after getting the ID
      this.loadProject()
        .then(() => {
          if (this.project) {
            this.populateForms(this.project);
          }
        })
        .catch(error => {
          // Handle the error appropriately, e.g., show an error message
          console.error('Error loading project in ngOnInit:', error);
        });
    });
  }

  // Initialize forms and load data if available
  initForms() {
    this.editProjectForm = this.fb.group({
      clientId: [this.clientId, Validators.required],
      freelancerId: [this.freelancerId],
      projectCategoryId: ['', Validators.required],
      skillIds: [[]], // Initialize as an empty array
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
      projectStatus: [''],
      experienceLevel: [''],
      workModel: ['', Validators.required],
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
      endDate: [''],
    });
  }

  //get the project data
  loadProject(): Promise<void> { // Now returns a Promise
    this.isLoading = true;
    //const userId = this.authService.getUserId();
    //fazer forma de pegar projectId
    const project$ = this.projectService.getProjectById(this.projectId);
    alert(this.projectId);

    return firstValueFrom(project$).then((response: ProjectResponse) => {
      console.log("Full API response:", response);
      if (response.data && response.data) {
        this.project = response.data.project;
      } else {
        console.log('No project found for this ID.');
      }
      this.isLoading = false;
    }).catch((error) => {
      console.error("Error loading project:", error);
      this.isLoading = false;
      throw error; // Re-throw error for potential handling elsewhere
    });
  }

  // Fetch project data from the server
  /*
  fetchProjectData() {
    this.projectService.getProjectById(this.projectId).subscribe(
      (projectData) => {
        this.editProjectForm.patchValue(projectData);

        // Handle specific values for pricing type
        if (projectData.pricingType === 'BUDGET') {
          this.editProjectForm.patchValue({
            pricingType: 'BUDGET',
            projectHourlyRate: null
          });
        } else if (projectData.pricingType === 'HOURLY_RATE') {
          this.editProjectForm.patchValue({
            pricingType: 'HOURLY_RATE',
            projectBudget: null
          });
        }

        // Handle skill IDs
        this.editProjectForm.get('skillIds')?.setValue(projectData.skillIds);
      },
      (error) => {
        console.error('Error fetching project data:', error);
      }
    );
  }
  */

  // Populate form fields with fetched profile data
  populateForms(project: Project | null) {
    if (project) {
      this.editProjectForm.patchValue({
        clientId: project.clientId,
        freelancerId: project.freelancerId,
        projectCategoryId: project.projectCategoryId,
        projectTitle: project.projectTitle,
        projectDescription: project.projectDescription,
        projectHourlyRate: {
          min: project.projectHourlyRate?.min,
          max: project.projectHourlyRate?.max,
        },
        projectBudget: {
          min: project.projectBudget?.min,
          max: project.projectBudget?.max,
        },
        pricingType: project.pricingType,
        estimatedDuration: project.estimatedDuration,
        projectSize: project.projectSize,
        projectStatus: project.projectStatus,
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

        // CAMPOS CALCULADOS
        startDate: project.startDate,
        endDate: project.endDate,

        /* Populate FormArrays */
        //method to populate the formArrays

      });
    }
  }

  set projectStatus(value: String) {
    this.projectStatus = value;
  }

  set projectBudget(value: any) {
    this.projectBudget = value;
  }

  set projectHourlyRate(value: any) {
    this.projectHourlyRate = value;
  }

  set freelancerId(value: null) {
    this.freelancerId = value;
  }

  get clientId() {
    return this.authService.getUserId();
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

  EditProject() {
    this.editProjectForm.patchValue({ projectStatus: 'DRAFT' });
    /*debug*/ console.log(this.editProjectForm.value);
    this.projectService
      .updateProject(this.projectId, this.editProjectForm.value)
      .subscribe({
        next: (res) => {
          alert('project Updated!');

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
          alert('project Updated and Posted!');

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
    alert('project Canceled!');
    this.router.navigate(['manage-project']);
    this.editProjectForm.reset();
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
    const skillIdsControl = this.editProjectForm.get('skillIds') as FormControl;
    const skillIds = skillIdsControl.value;

    if (!skillIds.includes(skillId)) {
      skillIdsControl.setValue([...skillIds, skillId]);
    }
  }

  // Method to remove a skill from the project
  removeSkill(skillId: string) {
    const skillIdsControl = this.editProjectForm.get('skillIds') as FormControl;
    const skillIds = skillIdsControl.value;
    skillIdsControl.setValue(skillIds.filter((id: string) => id !== skillId));
  }

  // Method to determine if a skill should be visible
  isSkillVisible(skillId: string): boolean {
    const skillIdsControl = this.editProjectForm.get('skillIds') as FormControl;
    return skillIdsControl.value.includes(skillId);
  }

  // Helper method to check if any skills are selected
  hasSelectedSkills(): boolean {
    const skillIdsControl = this.editProjectForm.get('skillIds') as FormControl;
    return skillIdsControl.value.length > 0;
  }

}