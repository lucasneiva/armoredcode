import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray, FormBuilder, FormControl, FormGroup,
  ReactiveFormsModule, Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SpecializationService } from '../../services/specialization.service';
import { IndustryService } from '../../services/industry.service';
import { ProfileService, Profile, ProfileResponse } from '../../services/profile.service';
import { UserService, User } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs'; // Import firstValueFrom
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
  providers: [DatePipe] // Forneça o DatePipe aqui
})
export default class EditProfileComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  datePipe = inject(DatePipe);
  //services
  authService = inject(AuthService);
  industryService = inject(IndustryService);
  skillService = inject(SkillService); // Inject SkillService
  specializationService = inject(SpecializationService);
  profileService = inject(ProfileService);
  userService = inject(UserService);

  //forms
  clientProfileForm!: FormGroup;
  freelancerProfileForm!: FormGroup;

  //constants
  selectedSkillControl = new FormControl(''); // FormControl for the dropdown
  // Getter for skillIds FormArray (for easier access in template)
  get skillIds(): FormArray {
    return this.freelancerProfileForm.get('skillIds') as FormArray;
  }

  selectedSkillId: string = ''; // Initialize with an empty string
  userRole: string | null = null;
  isClient: boolean = false;
  isLoading = true;
  profile: Profile | null = null;
  currentPage!: number; // Start with the first page
  totalPages!: number; // Total number of pages

  //arrays:
  skills: any[] = []; // Array to store skills
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
      this.fetchSkills(); // Fetch skills in ngOnInit for freelancer
      this.fetchSpecializations();
      this.currentPage = 1;
      this.totalPages = 7;
      this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else {
      console.log("Invalid role");
    }

    this.initForms();
    // Fetch skills first
    this.fetchSkills().then(() => {
      // Then load profile and populate forms
      this.loadProfile().then(() => {
        if (this.profile) {
          this.populateForms(this.profile);
        }
      }).catch(error => {
        console.error('Error loading profile in ngOnInit:', error);
      });
    }).catch(error => {
      console.error('Error fetching skills:', error);
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
      skillIds: this.fb.array([]), // Initialize as an empty FormArray
      portfolioItems: this.fb.array([]),
      education: this.fb.array([]),
      certifications: this.fb.array([]),
      workExperiences: this.fb.array([]),
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
          specializationId: profile.specializationId,
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

        // Preenche os FormArrays somente se houver dados no perfil
        // portfolio
        if (profile.portfolioItems?.length) {
          profile.portfolioItems.forEach(item => {
            const PortfolioTitle = item.title;
            const PortfolioDescripition = item.description;
            const PortfolioURL = item.url;
            this.portfolioItems.push(this.fb.group({
              title: PortfolioTitle,
              description: PortfolioDescripition,
              url: PortfolioURL
            }));
          });
        }

        // Educacional
        if (profile.educations?.length) {
          profile.educations.forEach(edu => {
            const DegreeName = edu.degreeName;
            const FieldOfStudy = edu.fieldOfStudy;
            const Institution = edu.institution;
            const formattedStartDate = this.datePipe.transform(edu.startDate, 'yyyy-MM-dd');
            const formattedEndDate = this.datePipe.transform(edu.endDate, 'yyyy-MM-dd');
            this.education.push(this.fb.group({
              degreeName: DegreeName,
              fieldOfStudy: FieldOfStudy,
              institution: Institution,
              startDate: formattedStartDate,
              endDate: formattedEndDate
            }));
          });
        }

        //certificacoes
        if (profile.certifications?.length) {
          profile.certifications.forEach(cert => {
            const certificationName = cert.name;
            const certificationOrganization = cert.issuingOrganization;
            const formattedIssueDate = this.datePipe.transform(cert.issueDate, 'yyyy-MM-dd'); // Formate a data
            this.certifications.push(this.fb.group({
              name: certificationName,
              issuingOrganization: certificationOrganization,
              issueDate: formattedIssueDate // Adicione a data formatada
            }));
          });
        }

        // Experiência profissional
        if (profile.workExperiences?.length) {
          profile.workExperiences.forEach(exp => {
            const CompanyName = exp.companyName;
            const JobTitle = exp.jobTitle;
            const formattedStartDate = this.datePipe.transform(exp.startDate, 'yyyy-MM-dd');
            const formattedEndDate = this.datePipe.transform(exp.endDate, 'yyyy-MM-dd');
            const JobDescription = exp.jobDescription;
            this.workExperiences.push(this.fb.group({
              companyName: CompanyName,
              jobTitle: JobTitle,
              startDate: formattedStartDate,
              endDate: formattedEndDate,
              jobDescription: JobDescription
            }));
          });
        }

        // Populate skillIds FormArray and ensure skill names are available
        if (profile && profile.skillIds && profile.skillIds.length > 0) {
          const skillIdsControl = this.freelancerProfileForm.get('skillIds') as FormArray;
          profile.skillIds.forEach(skillId => {
            const skill = this.skills.find(s => s._id === skillId); // Find skill object
            if (skill) {
              skillIdsControl.push(new FormControl(skill._id));
            } else {
              console.warn(`Skill with ID ${skillId} not found in the skills list`);
            }
          });
        }

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

  fetchSkills(): Promise<void> {
    return firstValueFrom(this.skillService.getSkills()).then(response => {
      this.skills = response.data;
    });
  }

  addSelectedSkill(): void {
    const selectedSkillId = this.selectedSkillControl.value;
    if (selectedSkillId && !this.skillIds.value.includes(selectedSkillId)) {
      this.skillIds.push(new FormControl(selectedSkillId));
      this.selectedSkillControl.setValue(selectedSkillId);
    }
  }

  removeSkill(index: number): void {
    this.skillIds.removeAt(index);
  }

  // Check if skills are selected
  hasSelectedSkills(): boolean {
    const skillIdsControl = this.freelancerProfileForm.get('skillIds') as FormControl;
    return skillIdsControl.value && skillIdsControl.value.length > 0;
  }

  // Method to get skill object by ID
  getSkillObjectById(skillId: string): any | undefined {
    return this.skills.find((s) => s._id === skillId);
  }

  // Method to get skill name by ID (updated)
  getSkillNameById(skill: any): string {
    return skill ? skill.skillName : '';
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