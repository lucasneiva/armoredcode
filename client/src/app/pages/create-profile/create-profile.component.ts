import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray, FormBuilder, FormControl, FormGroup,
  ReactiveFormsModule, Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
  industryService = inject(IndustryService); // Inject the IndustryService
  skillService = inject(SkillService); // Inject the SkillService
  specializationService = inject(SpecializationService); // Inject the SpecializationService
  profileService = inject(ProfileService); // Inject the ProfileService
  userService = inject(UserService); // Inject the UserService

  //forms
  clientProfileForm!: FormGroup;
  freelancerProfileForm!: FormGroup;

  //constants
  userRole: string | null = null; 
  isClient: boolean = false; //false is default

  //arrays:
  selectedSkillId: string = ''; // To store the selected skill ID
  skills: any[] = []; // Array to store skills
  specializations: any[] = []; // Array to store specializations
  industries: any[] = []; // Array to store industries
  
  ngOnInit() { 
    //initialization of the user
    this.authService.getUserId();
    this.userRole = this.authService.getUserRole();

    if (this.userRole === 'CLIENT') {
      this.isClient = true;
      this.fetchIndustries();
    } else if (this.userRole === 'FREELANCER') {
      this.isClient = false;
      this.fetchSkills();
      this.fetchSpecializations();
    } else {
      console.log("invalid role");
    }
    
    //client form constrols
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
        number: ['', Validators.required],
        neighborhood: ['', Validators.required],
        city: ['', Validators.required],
        state: ['SP'],
        country: ['Brasil'],
      }),
    });

    //freelancer form constrols
    this.freelancerProfileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      profileSummary: [''],
      portfolioItems: this.fb.array([this.createPortfolioItem()]), // Initialize with one portfolio item
      experiences: this.fb.array([this.createExperienceForm()]), // Initialize with one experience form
      education: this.fb.array([this.createEducationForm()]), // Initialize with one education form
      certifications: this.fb.array([this.createCertificationForm()]), // Initialize with one certification form
      specializationsId: [''],
      specializationDescripition: [''],
      experienceLevel: ['', Validators.required],
      selectedSkills: this.fb.array([]), // FormArray to store selected skill IDs
      skillsId: [''],
      hourlyRate: this.fb.group({
        min: [''],
        max: [''],
        currency: ['R$']
      }),
      location: this.fb.group({
        cep: ['', Validators.required],
        streetAddress: ['', Validators.required],
        number: ['', Validators.required],
        neighborhood: ['', Validators.required],
        city: ['', Validators.required],
        state: ['SP'],
        country: ['Brasil'],
      }),
    });

  }

  onSubmit() {
    /*debug*/ console.log(this.clientProfileForm.value);
    /*debug*/ //console.log(this.freelancerProfileForm.value);
    if (this.isClient && this.clientProfileForm.valid) {
      this.profileService.createProfile(this.clientProfileForm.value)
        .subscribe({
          next: (res) => {
            // Success!
            alert("Client Profile Created!");
            this.profileService.hasProfile$.next(true);
            this.clientProfileForm.reset();
            this.router.navigate(['home']); // Redirect after successful creation
          },
          error: (err) => {
            console.error('Error creating client profile:', err);
            // Handle errors appropriately (e.g., display an error message)
          }
        });
    } else if (!this.isClient && this.freelancerProfileForm.valid) {
      this.profileService.createProfile(this.freelancerProfileForm.value)
        .subscribe({
          next: (res) => {
            // Success!
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
      // Handle form errors 
      this.displayFormErrors(this.isClient ? this.clientProfileForm : this.freelancerProfileForm);
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
    return this.freelancerProfileForm.get('portfolioItems') as FormArray; // Correct reference
  }

  addPortfolioItem() {
    if (this.portfolioItems.length < 3) { // Limit to a maximum of 3 portfolios forms
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
  get experiences(): FormArray {
    return this.freelancerProfileForm.get('experiences') as FormArray;
  }

  addExperience() {
    if (this.experiences.length < 2) { // Limit to a maximum of 2 education forms
      const newExperienceForm = this.createExperienceForm(); // Create FormGroup
      this.experiences.push(newExperienceForm); 
    }
  }

  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }

  createExperienceForm(): FormGroup {
    return this.fb.group({
      companyName: [''],
      jobTitle: [''],
      startDate: [''],
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
      degreeName: [''],
      fieldOfStudy: [''],
      institution: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  addEducation() {
    if (this.education.length < 2) { // Limit to a maximum of 2 education forms
      const newEducationForm = this.createEducationForm(); // Create FormGroup
      this.education.push(newEducationForm); 
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
      const newCertificationForm = this.createCertificationForm(); // Create FormGroup
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

  // Function to fetch industries from your backend
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

  // Function to fetch specializations from your backend
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

  // Function to fetch skills from your backend
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

  // Function to handle skill selection from dropdown
  onSkillSelected(event: any) {
    this.selectedSkillId = event.target.value;
  }

  // Function to add the selected skill to the form array
  addSkill() {
    if (this.selectedSkillId) {
      this.selectedSkills.push(new FormControl(this.selectedSkillId));
      this.selectedSkillId = ''; // Reset the selected skill
    }
  }

  // Function to remove a skill from the form array
  removeSkill(index: number) {
    this.selectedSkills.removeAt(index);
  }

  // Get the skill name from the skill ID
  getSkillName(skillId: string): string {
    const skill = this.skills.find((s) => s._id === skillId);
    return skill ? skill.skillName : '';
  }

  // Get the selectedSkills FormArray
  get selectedSkills(): FormArray {
    return this.freelancerProfileForm.get('selectedSkills') as FormArray;
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