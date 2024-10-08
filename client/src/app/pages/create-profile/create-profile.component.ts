import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray, FormBuilder, FormControl, FormGroup,
  ReactiveFormsModule, Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { endDateValidator } from '../../validators/date.validator'; // Import the validator
import { hourlyRateValidator } from '../../validators/hourly-rate.validator'; // Import the validator
import { SkillService } from '../../services/skill.service';
import { SpecializationService } from '../../services/specialization.service';
import { IndustryService } from '../../services/industry.service';
import { ProfileService } from '../../services/profile.service';
import { UserService, User } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss'
})
export default class CreateProfileComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  //services
  authService = inject(AuthService);
  industryService = inject(IndustryService);
  skillService = inject(SkillService);
  specializationService = inject(SpecializationService);
  profileService = inject(ProfileService);
  userService = inject(UserService);

  //forms
  clientProfileForm!: FormGroup;
  freelancerProfileForm!: FormGroup;

  //constants
  userRole: string | null = null;
  currentPage!: number; // Start with the first page
  totalPages!: number; // Total number of pages

  //arrays:
  selectedSkillId: string = '';
  skills: any[] = [];
  specializations: any[] = [];
  industries: any[] = [];
  pageNumbers: number[] = [];

  ngOnInit() {
    this.authService.getUserId();
    this.userRole = this.authService.getUserRole();
    if (this.userRole === 'CLIENT') {
      this.fetchIndustries();
      this.currentPage = 1; // Start with the first page
      this.totalPages = 2; // Total number of pages
      this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } 
    else if (this.userRole === 'FREELANCER'){
      this.fetchSkills();
      this.fetchSpecializations();
      this.currentPage = 1; // Start with the first page
      this.totalPages = 7; // Total number of pages
      this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
    else {
      console.log("invalid role");
    }

    this.clientProfileForm = this.fb.group({
      userId: [this.authService.getUserId(), Validators.required],
      companyName: ['', Validators.required],
      companyDescription: [''],
      companySize: ['', Validators.required],
      logo: [''],
      industryId: ['', Validators.required],
      website: [''],
      location: this.fb.group({
        cep: ['', Validators.required],
        streetAddress: ['', Validators.required],
        neighborhood: ['', Validators.required],
        city: ['', Validators.required],
        state: ['SP'],
        country: ['Brasil'],
      }),
    });

    this.freelancerProfileForm = this.fb.group({
      userId: [this.authService.getUserId(), Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      specializationId: [''],
      profileSummary: [''],
      experienceLevel: ['', Validators.required],
      hourlyRate: this.fb.group({
        min: [''],
        max: [''],
        currency: ['R$']
      }, { validators: hourlyRateValidator }), // Apply the validator to the FormGroup
      location: this.fb.group({
        cep: ['', Validators.required],
        streetAddress: ['', Validators.required],
        neighborhood: ['', Validators.required],
        city: ['', Validators.required],
        state: ['SP'],
        country: ['Brasil'],
      }),
      selectedSkills: this.fb.array([]), // Initialize as an empty array

      workExperiences: this.fb.array([this.createExperienceForm()]),
      educations: this.fb.array([this.createEducationsForm()]),
      certifications: this.fb.array([this.createCertificationForm()]),
      portfolioItems: this.fb.array([this.createPortfolioItem()]),
      
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

  onSubmit() {
    console.log(this.freelancerProfileForm.value);
    if (this.userRole == "CLIENT" && this.clientProfileForm.valid) {
      this.profileService.createProfile(this.clientProfileForm.value)
        .subscribe({
          next: (res) => {
            alert("Client Profile Created!");
            this.profileService.hasProfile$.next(true);
            this.clientProfileForm.reset();
            this.router.navigate(['home']);
          },
          error: (err) => {
            console.error('Error creating client profile:', err);
          }
        });
    } else if (this.userRole == "FREELANCER" && this.freelancerProfileForm.valid) {

      // Prepare the data for the freelancer profile
      const formData = this.freelancerProfileForm.value;

      // Convert selectedSkills array to a simple array of skill IDs
      formData.skillIds = formData.selectedSkills;

      this.profileService.createProfile(formData)
        .subscribe({
          next: (res) => {
            alert("Freelancer Profile Created!");
            this.profileService.hasProfile$.next(true);
            this.freelancerProfileForm.reset();
            this.router.navigate(['home']);
          },
          error: (err) => {
            console.error('Error creating freelancer profile:', err);
          }
        });

    } else {
      // Mark nested FormArrays as touched before displaying errors
      this.markFormArrayTouched(this.freelancerProfileForm.get('certifications') as FormArray);
      this.markFormArrayTouched(this.freelancerProfileForm.get('educations') as FormArray);
      this.markFormArrayTouched(this.freelancerProfileForm.get('workExperiences') as FormArray);
      this.markFormArrayTouched(this.freelancerProfileForm.get('portfolioItems') as FormArray); // Add this for portfolioItems as well

      this.displayFormErrors(this.userRole == "CLIENT" ? this.clientProfileForm : this.freelancerProfileForm);
    }
  }

  cancelSubmit() {
    alert("profile creation Canceled!")
    this.router.navigate(['login'])
    if (this.userRole == "CLIENT") {
      this.clientProfileForm.reset();
    }
    else {
      this.freelancerProfileForm.reset();
    }
  }

  private markFormArrayTouched(formArray: FormArray) {
    formArray.markAsTouched();
    formArray.controls.forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control); // Use markFormGroupTouched for nested FormGroups
      }
    });
  }

  // Helper function to mark FormGroup and its controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    formGroup.markAsTouched();
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Helper functions to manage FormArrays 
  //Portfolio
  get portfolioItems(): FormArray {
    return this.freelancerProfileForm.get('portfolioItems') as FormArray;
  }

  addPortfolioItem() {
    if (this.portfolioItems.length < 3) {
      const portfolioItem = this.createPortfolioItem();
      this.portfolioItems.push(portfolioItem);
    }
  }

  removePortfolioItem(index: number) {
    this.portfolioItems.removeAt(index);
  }

  createPortfolioItem(): FormGroup {
    return this.fb.group({
      title: [''],
      description: [''],
      url: [''],
    });
  }

  // Experience methods
  get workExperiences(): FormArray {
    return this.freelancerProfileForm.get('workExperiences') as FormArray;
  }

  addExperience() {
    if (this.workExperiences.length < 2) {
      const newExperienceForm = this.createExperienceForm();
      this.workExperiences.push(newExperienceForm);
    }
  }

  removeExperience(index: number) {
    this.workExperiences.removeAt(index);
  }

  createExperienceForm(): FormGroup {
    return this.fb.group({
      companyName: [''],
      jobTitle: [''],
      startDate: [''],
      endDate: ['', [Validators.required, endDateValidator]], // Use the imported validator
      jobDescription: ['']
    });
  }

  // educations 
  get educations(): FormArray {
    return this.freelancerProfileForm.get('educations') as FormArray;
  }

  createEducationsForm(): FormGroup {
    return this.fb.group({
      degreeName: [''],
      fieldOfStudy: [''],
      institution: [''],
      startDate: [''],
      endDate: ['', [Validators.required, endDateValidator]], // Use the imported validator
    });
  }

  addEducations() {
    if (this.educations.length < 2) {
      const neweducationsForm = this.createEducationsForm();
      this.educations.push(neweducationsForm);
    }
  }

  removeEducations(index: number) {
    this.educations.removeAt(index);
  }

  // Certifications
  get certifications(): FormArray {
    return this.freelancerProfileForm.get('certifications') as FormArray;
  }

  addCertification() {
    if (this.certifications.length < 5) {
      const newCertificationForm = this.createCertificationForm();
      this.certifications.push(newCertificationForm);
    }
  }

  removeCertification(index: number) {
    this.certifications.removeAt(index);
  }

  createCertificationForm(): FormGroup {
    return this.fb.group({
      name: [''],
      issuingOrganization: [''],
      issueDate: [''],
    });
  }


  fetchIndustries() {
    this.industryService.getIndustries().subscribe(
      (response: any) => {
        this.industries = response.data;
      },
      (error) => {
        console.error("Error fetching industries:", error);
      }
    );
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
    this.skillService.getSkills().subscribe(
      (response: any) => {
        this.skills = response.data;
      },
      (error) => {
        console.error("Error fetching skills:", error);
      }
    );
  }

  onSkillSelected(event: any) {
    this.selectedSkillId = event.target.value;
  }

  addSkill() {
    if (this.selectedSkillId) {
      this.selectedSkills.push(new FormControl(this.selectedSkillId));
      this.selectedSkillId = '';
    }
  }


  removeSkill(index: number) {
    this.selectedSkills.removeAt(index);
  }

  getSkillName(skillId: string): string {
    const skill = this.skills.find((s) => s._id === skillId);
    return skill ? skill.skillName : '';
  }

  get selectedSkills(): FormArray {
    return this.freelancerProfileForm.get('selectedSkills') as FormArray;
  }

  private displayFormErrors(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl && control.invalid) {
        console.log(`Field ${field} is invalid:`, control.errors);
      } else if (control instanceof FormGroup && control.invalid) {
        this.displayFormErrors(control);
      }
    });
  }

}