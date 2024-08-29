import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SkillService } from '../../services/skill.service';
import { SpecializationService } from '../../services/specialization.service';

interface Skill {
  _id: string; // Assuming your Skill model has an _id field
  skillName: string;
}

interface Specialization {
  _id: string; // Assuming your Skill model has an _id field
  specializationName: string;
}

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss'
})
export default class CreateProfileComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  skillService = inject(SkillService); // Inject the SkillService
  specializationService = inject(SpecializationService); // Inject the SpecializationService

  clientProfileForm!: FormGroup;
  freelancerProfileForm!: FormGroup;

  isClient: boolean = false; //false is default

  skills: Skill[] = []; // Array to store fetched skills                                                  
  specializations: Specialization[] = []; // Array to store fetched skills

  ngOnInit(): void {
    this.fetchSkills();
    this.fetchSpecializations();

    this.clientProfileForm = this.fb.group({
      companyName: ['', Validators.required],
      companySite: [''],
      companyDescription: [''],
      companySize: ['', Validators.required],
      companyIndustry: ['', Validators.required],
      location: this.fb.group({
        zipCode: ['', Validators.required],
        street: ['', Validators.required],
        number: ['', Validators.required],
        neighborhood: ['', Validators.required],
        city: ['', Validators.required],
        state: ['SP'],
        country: ['Brasil'],
      }),
    });

    this.freelancerProfileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      profileSummary: [''],
      portfolio: this.fb.array([]),
      experiences: this.fb.array([this.createExperienceForm()]), // Initialize with one experience form
      education: this.fb.array([this.createEducationForm()]), // Initialize with one education form
      certifications: this.fb.array([this.createCertificationForm()]), // Initialize with one certification form
      specializations: ['', Validators.required],
      experienceLevel: ['', Validators.required],
      skills: ['', Validators.required],
      hourlyRate: this.fb.group({
        min: [''],
        max: [''],
        currency: ['R$']
      }),
      location: this.fb.group({
        zipCode: ['', Validators.required],
        street: ['', Validators.required],
        number: ['', Validators.required],
        neighborhood: ['', Validators.required],
        city: ['', Validators.required],
        state: ['SP'],
        country: ['Brasil'],
      }),
    });
    //this.determineUserType(); // Call the method to determine user type
  }

  /* Method to determine user type
  private determineUserType() {
    
    const userRole = this.authService.getUserRole(); 

    this.isClient = userRole === 'CLIENT'; 
  }
  */
  onSubmit() {
    if (this.isClient) {
      if (this.clientProfileForm.valid) {
        console.log(this.clientProfileForm.value);
        // Add your logic to send 'this.clientProfileForm.value' to the backend for client profile creation
        this.clientProfileForm.reset();
      } else {
        // Handle form errors for client profile
        this.displayFormErrors(this.clientProfileForm);
      }
    } else {
      if (this.freelancerProfileForm.valid) {
        console.log(this.freelancerProfileForm.value);
        // Add your logic to send 'this.freelancerProfileForm.value' to the backend for freelancer profile creation
        this.freelancerProfileForm.reset();
      } else {
        // Handle form errors for freelancer profile
        this.displayFormErrors(this.freelancerProfileForm);
      }
    }
  }

  cancelSubmit() {
    alert("profile creation Canceled!")
    this.router.navigate(['login'])
    if (this.isClient) {
      this.clientProfileForm.reset();
    }
    else {
      this.freelancerProfileForm.reset();
    }
  }

  // Helper functions to manage FormArrays 

  //Portfolio
  get portfolioItems(): FormArray {
    return this.freelancerProfileForm.get('portfolio') as FormArray;
  }

  addPortfolioItem() {
    const portfolioItem = this.createPortfolioItem();
    this.portfolioItems.push(portfolioItem);
  }

  removePortfolioItem(index: number) {
    this.portfolioItems.removeAt(index);
  }

  createPortfolioItem(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: [''],
      url: ['', Validators.required],
    });
  }

  // Experience methods
  get experiences(): FormArray {
    return this.freelancerProfileForm.get('experiences') as FormArray;
  }

  addExperience() {
    if (this.experiences.length < 2) { // Limit to a maximum of 2 education forms
      this.experiences.push(this.createExperienceForm());
    }
  }

  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }

  createExperienceForm(): FormGroup {
    return this.fb.group({
      companyName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      jobDescription: ['']
    });
  }

  // Education (Modified)
  get education(): FormArray {
    return this.freelancerProfileForm.get('education') as FormArray;
  }

  createEducationForm(): FormGroup {
    return this.fb.group({
      degreeName: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      institution: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
    });
  }

  addEducation() {
    if (this.education.length < 2) { // Limit to a maximum of 2 education forms
      this.education.push(this.createEducationForm());
    }
  }

  removeEducation(index: number) {
    this.education.removeAt(index);
  }

  // Certifications
  get certifications(): FormArray {
    return this.freelancerProfileForm.get('certifications') as FormArray;
  }

  addCertification() {
    if (this.certifications.length < 5) {
      this.certifications.push(this.createCertificationForm());
    }
  }

  removeCertification(index: number) {
    this.certifications.removeAt(index);
  }

  createCertificationForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      issuingOrganization: ['', Validators.required],
      issueDate: ['', Validators.required],
    });
  }

  // Function to fetch skills from your backend 
  fetchSkills() {
    this.skillService.getSkills().subscribe({
      next: (skills) => {
        this.skills = skills;
      },
      error: (error) => {
        console.error('Error fetching skills:', error);
      }
    });
  }

  // Function to fetch specializations from your backend
  fetchSpecializations() {
    this.specializationService.getSpecializations().subscribe({
      next: (specializations) => {
        this.specializations = specializations;
      },
      error: (error) => {
        console.error('Error fetching specializations:', error);
      }
    });
  }

  // Helper function to display form errors
  private displayFormErrors(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl && control.invalid) {
        console.log(`Field ${field} is invalid:`, control.errors);
      } else if (control instanceof FormGroup && control.invalid) {
        this.displayFormErrors(control); // Recursively check nested FormGroups
      }
    });
  }

}