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
import { ProfileService, Profile, ProfileResponse } from '../../services/profile.service';
import { UserService, User } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs'; // Import firstValueFrom

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export default class EditProfileComponent implements OnInit {
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
  isClient: boolean = false;
  isLoading = true;
  profile: Profile | null = null;
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
      this.isClient = true;
      this.fetchIndustries();
      this.currentPage = 1;
      this.totalPages = 2;
      this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else if (this.userRole === 'FREELANCER') {
      this.isClient = false;
      this.fetchSkills();
      this.fetchSpecializations();
      this.currentPage = 1;
      this.totalPages = 7;
      this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else {
      console.log("Invalid role");
    }

    this.initForms();
    this.loadProfile() 
    .then(() => {
      if (this.profile) {
        this.populateForms(this.profile);
      }
    })
    .catch(error => {
      // Handle the error appropriately, e.g., show an error message
      console.error('Error loading profile in ngOnInit:', error); 
    }); 
  }

  // Initialize forms and load data if available
  initForms() {
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
      }),
      location: this.fb.group({
        cep: ['', Validators.required],
        streetAddress: ['', Validators.required],
        neighborhood: ['', Validators.required],
        city: ['', Validators.required],
        state: ['SP'],
        country: ['Brasil'],
      }),
      selectedSkills: this.fb.array([]),
      portfolioItems: this.fb.array([this.createPortfolioItem()]),
      education: this.fb.array([this.createEducationForm()]),
      certifications: this.fb.array([this.createCertificationForm()]),
      workExperiences: this.fb.array([this.createExperienceForm()]),
    });
  }

  //get the profile data
  loadProfile(): Promise<void> { // Now returns a Promise
    this.isLoading = true;
    const userId = this.authService.getUserId();
    const profile$ = this.profileService.getProfile(userId);
  
    return firstValueFrom(profile$).then((response: ProfileResponse) => { 
      console.log("Full API response:", response);
      if (response.data && response.data.hasProfile) {
        this.profile = response.data.profile;
      } else {
        console.log('No profile found for this user.');
      }
      this.isLoading = false;
    }).catch((error) => {
      console.error("Error loading profile:", error);
      this.isLoading = false;
      throw error; // Re-throw error for potential handling elsewhere
    });
  }

  // Populate form fields with fetched profile data
  populateForms(profile: Profile | null) {
    if (profile) {
      if (this.isClient) {
        // Populate client form
        this.clientProfileForm.patchValue({
          companyName: profile.companyName,
          companyDescription: profile.companyDescription,
          companySize: profile.companySize,
          logo: profile.logo,
          industryId: profile.industryId,
          website: profile.website,
          location: {
            cep: profile.location?.cep || '',
            streetAddress: profile.location?.streetAddress || '',
            neighborhood: profile.location?.neighborhood || '',
            city: profile.location?.city || '',
            state: profile.location?.state || '',
            country: profile.location?.country || '',
          }
        });
      } else {
        // Populate freelancer form
        this.freelancerProfileForm.patchValue({
          firstName: profile.firstName,
          lastName: profile.lastName,
          specializationId: profile.specializationId?._id,
          profileSummary: profile.profileSummary,
          experienceLevel: profile.experienceLevel,
          hourlyRate: {
            min: profile.hourlyRate?.min,
            max: profile.hourlyRate?.max,
            // currency should already be 'R$'
          },
          location: {
            cep: profile.location?.cep || '',
            streetAddress: profile.location?.streetAddress || '',
            neighborhood: profile.location?.neighborhood || '',
            city: profile.location?.city || '',
            state: profile.location?.state || '',
            country: profile.location?.country || '',
          }
        });

        // Populate FormArrays
        profile.skillIds?.forEach(skill =>
          this.selectedSkills.push(new FormControl(skill._id))
        );

        profile.portfolioItems?.forEach(item =>
          this.portfolioItems.push(this.fb.group(item))
        );

        profile.educations?.forEach(edu =>
          this.education.push(this.fb.group(edu))
        );

        profile.certifications?.forEach(cert =>
          this.certifications.push(this.fb.group(cert))
        );

        profile.workExperiences?.forEach(exp =>
          this.workExperiences.push(this.fb.group(exp))
        );
      }
    }
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
    if (this.isClient && this.clientProfileForm.valid) {
      /*debug*/ //console.log(this.clientProfileForm.value);
      this.profileService.editProfile(this.clientProfileForm.value)
        .subscribe({
          next: (res) => {
            alert("Client Profile edited sucessfully!");
            this.profileService.hasProfile$.next(true);
            this.clientProfileForm.reset();
            this.router.navigate(['manage-profile']);
          },
          error: (err) => {
            console.error('Error editing client profile:', err);
          }
        });
    } else if (!this.isClient && this.freelancerProfileForm.valid) {
      /*debug*/ //console.log(this.freelancerProfileForm.value);

      // Prepare the data for the freelancer profile
      const formData = this.freelancerProfileForm.value;

      // Convert selectedSkills array to a simple array of skill IDs
      formData.skillIds = formData.selectedSkills;

      this.profileService.editProfile(formData)
        .subscribe({
          next: (res) => {
            alert("Freelancer Profile edited sucessfully!");
            this.profileService.hasProfile$.next(true);
            this.freelancerProfileForm.reset();
            this.router.navigate(['manage-profile']);
          },
          error: (err) => {
            console.error('Error editing freelancer profile:', err);
          }
        });

    } else {
      this.displayFormErrors(this.isClient ? this.clientProfileForm : this.freelancerProfileForm);
    }
  }

  cancelSubmit() {
    alert("profile edition Canceled!")
    this.router.navigate(['manage-profile'])
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
      endDate: [''],
      jobDescription: ['']
    });
  }

  // Education 
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
    if (this.education.length < 2) {
      const newEducationForm = this.createEducationForm();
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
