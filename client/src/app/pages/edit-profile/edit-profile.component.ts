import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray, FormBuilder, FormControl, FormGroup,
  ReactiveFormsModule, Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { endDateValidator } from '../../validators/date.validator';
import { hourlyRateValidator } from '../../validators/hourly-rate.validator';
import { SpecializationService } from '../../services/specialization.service';
import { IndustryService } from '../../services/industry.service';
import { ProfileService, Profile, ProfileResponse } from '../../services/profile.service';
import { UserService, User } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { SkillService } from '../../services/skill.service';
import { cepValidator } from '../../validators/cep.validator';
import { CepFormatterDirective } from '../../validators/cep-formatter.directive';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CepFormatterDirective],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
  providers: [DatePipe]
})
export default class EditProfileComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  datePipe = inject(DatePipe);
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
  selectedSkillControl = new FormControl('');
  // Getter for skillIds FormArray (for easier access in template)
  get skillIds(): FormArray {
    return this.freelancerProfileForm.get('skillIds') as FormArray;
  }

  selectedSkillId: string = '';
  userRole: string | null = null;
  isLoading = true;
  profile: Profile | null = null;
  currentPage!: number;
  totalPages!: number;
  profileImagePreview: string | ArrayBuffer | null = null;

  //arrays:
  skills: any[] = [];
  specializations: any[] = [];
  industries: any[] = [];
  pageNumbers: number[] = [];

  showSkillsList: boolean = false;
  filteredSkills: any[] = [];
  otherSkillForm!: FormGroup;
  showOtherSkillForm: boolean = false;

  ngOnInit() {
    this.authService.getUserId();
    this.userRole = this.authService.getUserRole();

    if (this.userRole === 'CLIENT') {
      this.fetchIndustries();
      this.currentPage = 1;
      this.totalPages = 2;
      this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else if (this.userRole === 'FREELANCER') {
      this.fetchSkills();
      this.fetchSpecializations();
      this.currentPage = 1;
      this.totalPages = 6;
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
      profileImage: [''],
      industryId: ['', Validators.required],
      website: [''],
      location: this.fb.group({
        cep: ['', [Validators.required, cepValidator()]],
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
      profileImage: [''],
      profileSummary: [''],
      experienceLevel: ['', Validators.required],
      hourlyRate: this.fb.group({
        min: [''],
        max: [''],
        currency: ['R$']
      }, { validators: hourlyRateValidator }),
      location: this.fb.group({
        cep: ['', [Validators.required, cepValidator()]],
        streetAddress: ['', Validators.required],
        neighborhood: ['', Validators.required],
        city: ['', Validators.required],
        state: ['SP'],
        country: ['Brasil'],
      }),
      skillIds: this.fb.array([]),
      portfolioItems: this.fb.array([]),
      educations: this.fb.array([]),
      certifications: this.fb.array([]),
      workExperiences: this.fb.array([]),
    });

    this.otherSkillForm = this.fb.group({
      skillName: ['', Validators.required],
      skillDescription: [''],
    });
  }

  //get the profile data
  loadProfile(): Promise<void> {
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
      if (this.userRole === "CLIENT") {
        // Populate client form
        this.clientProfileForm.patchValue({
          companyName: profile.companyName,
          companyDescription: profile.companyDescription,
          companySize: profile.companySize,
          profileImage: profile.profileImage,
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
          profileImage: profile.profileImage,
          profileSummary: profile.profileSummary,
          experienceLevel: profile.experienceLevel,
          hourlyRate: {
            min: profile.hourlyRate?.min,
            max: profile.hourlyRate?.max,
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

        // Populate portfolio items
        if (profile.portfolioItems?.length) {
          profile.portfolioItems.forEach(item => {
            this.portfolioItems.push(this.fb.group({
              title: item.title,
              description: item.description,
              url: item.url
            }));
          });
        }

        // Populate educations
        if (profile.educations?.length) {
          profile.educations.forEach((edu) => {
            const educationForm = this.createEducationsForm();
            educationForm.setValue({
              degreeName: edu.degreeName,
              fieldOfStudy: edu.fieldOfStudy,
              institution: edu.institution,
              startDate: this.datePipe.transform(edu.startDate, 'yyyy-MM-dd'),
              endDate: this.datePipe.transform(edu.endDate, 'yyyy-MM-dd')
            });
            this.educations.push(educationForm);
          });
        }

        // Populate certifications
        if (profile.certifications?.length) {
          profile.certifications.forEach(cert => {
            this.certifications.push(this.fb.group({
              name: cert.name,
              issuingOrganization: cert.issuingOrganization,
              issueDate: this.datePipe.transform(cert.issueDate, 'yyyy-MM-dd')
            }));
          });
        }

        // Populate work experiences
        if (profile.workExperiences?.length) {
          profile.workExperiences.forEach(exp => {
            const experienceForm = this.createExperienceForm();
            experienceForm.setValue({
              companyName: exp.companyName,
              jobTitle: exp.jobTitle,
              startDate: this.datePipe.transform(exp.startDate, 'yyyy-MM-dd'),
              endDate: this.datePipe.transform(exp.endDate, 'yyyy-MM-dd'),
              jobDescription: exp.jobDescription
            });

            this.workExperiences.push(experienceForm);
          });
        }

        // Populate skillIds FormArray (in populateForms function)
        if (profile?.skillIds && profile.skillIds.length > 0) {
          const skillIdsControl = this.freelancerProfileForm.get('skillIds') as FormArray;
          profile.skillIds.forEach(skillId => {
            skillIdsControl.push(new FormControl(skillId));
          });
        }
      }
    }
  }

  nextPage() {
    this.currentPage++;
    /*debug*/ //alert(this.currentPage);
  }

  previousPage() {
    this.currentPage--;
    /*debug*/ //alert(this.currentPage);
  }

  showPage(pageNumber: number): boolean {
    return this.currentPage === pageNumber;
  }

  onSubmit() {
    if (this.userRole == "CLIENT" && this.clientProfileForm.valid) {
      /*debug*/ //console.log(this.clientProfileForm.value);
      this.profileService.editProfile(this.clientProfileForm.value)
        .subscribe({
          next: (res) => {
            alert("Perfil de Cliente editado com sucesso!");
            this.profileService.hasProfile$.next(true);
            this.clientProfileForm.reset();
            this.router.navigate(['manage-profile']);
          },
          error: (err) => {
            console.error('Error editing client profile:', err);
          }
        });
    } else if (this.userRole == "FREELANCER" && this.freelancerProfileForm.valid) {
      /*debug*/ //console.log(this.freelancerProfileForm.value);

      // Prepare the data for the freelancer profile
      const formData = this.freelancerProfileForm.value;

      this.profileService.editProfile(formData)
        .subscribe({
          next: (res) => {
            alert("Perfil de Freelancer Editado com sucesso!");
            this.profileService.hasProfile$.next(true);
            this.freelancerProfileForm.reset();
            this.router.navigate(['manage-profile']);
          },
          error: (err) => {
            console.error('Error editing freelancer profile:', err);
          }
        });

    } else {
      this.displayFormErrors(this.userRole == "CLIENT" ? this.clientProfileForm : this.freelancerProfileForm);
    }
  }

  cancelSubmit() {
    if (confirm("Cancelar Edição do Perfil?")) {
      alert("Edição de Perfil Cancelada!");
      this.router.navigate(['manage-profile']);
      if (this.userRole == "CLIENT") {
        this.clientProfileForm.reset();
      }
      else {
        this.freelancerProfileForm.reset();
      }
    }
  }

  // Helper functions to manage FormArrays 
  //Portfolio methods
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
      endDate: ['', [Validators.required, endDateValidator]],
      jobDescription: ['']
    });
  }

  // education methods
  get educations(): FormArray {
    return this.freelancerProfileForm.get('educations') as FormArray;
  }

  createEducationsForm(): FormGroup {
    return this.fb.group({
      degreeName: [''],
      fieldOfStudy: [''],
      institution: [''],
      startDate: [''],
      endDate: ['', [Validators.required, endDateValidator]],
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

  // Certification methods
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

  //fetchs
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

  searchSkills(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.showSkillsList = searchTerm.length > 0; 

    if (this.showSkillsList) {
      this.filteredSkills = this.skills.filter(skill =>
        skill.skillName.toLowerCase().includes(searchTerm)
      );
    }
  }


  addSkill(skillId: string | null) {
    const skillIdsControl = this.freelancerProfileForm.get('skillIds') as FormArray;

    if (skillId) {
      if (!skillIdsControl.value.includes(skillId)) {
        skillIdsControl.push(new FormControl(skillId));
        this.showSkillsList = false; // Hide the list
      }
    } else {
      this.showOtherSkillForm = true;
    }
  }

  createOtherSkill() {
    if (this.otherSkillForm.valid) {
      const newSkill = this.otherSkillForm.value;
      this.skillService.createSkillService(newSkill).subscribe({
        next: (createdSkill) => {
          this.addSkill(createdSkill._id);
          this.otherSkillForm.reset();
          this.showOtherSkillForm = false;
          this.fetchSkills(); // Refresh the skills list!
        },
        error: (error) => {
          // ... handle error
        },
      });
    }
  }

  cancelSkillCreation() {
    this.otherSkillForm.reset();
    this.showOtherSkillForm = false;
  }

  removeSkill(index: number) {
    (this.freelancerProfileForm.get('skillIds') as FormArray).removeAt(index);
  }

  hasSelectedSkills(): boolean {
    return this.skillIds.length > 0;
  }

  // skill methods
  addSelectedSkill(): void {
    const selectedSkillId = this.selectedSkillControl.value;
    if (selectedSkillId && !this.skillIds.value.includes(selectedSkillId)) {
      this.skillIds.push(new FormControl(selectedSkillId));
      this.selectedSkillControl.setValue(selectedSkillId);
    }
  }

  getSkillName(skillId: string): string {
    const skill = this.skills.find((s) => s._id === skillId);
    return skill ? skill.skillName : '';
  }

  getSkillObjectById(skillId: string): any | undefined {
    return this.skills.find((s) => s._id === skillId);
  }

  //image methods
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.resizeImage(file, 512, 512).then(resizedImage => {
        const reader = new FileReader();
        reader.readAsDataURL(resizedImage);

        reader.onload = () => {
          this.profileImagePreview = reader.result;

          if (this.userRole === 'CLIENT') {
            this.clientProfileForm.patchValue({
              profileImage: this.profileImagePreview
            });
          } else if (this.userRole === 'FREELANCER') {
            this.freelancerProfileForm.patchValue({
              profileImage: this.profileImagePreview
            });
          }
        };
      });
    }
  }

  // Resize the image to the specified dimensions
  private resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }

        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(blob => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Error creating resized image blob.'));
            }
          }, file.type);
        } else {
          reject(new Error('Error getting 2D rendering context.'));
        }
      };

      img.onerror = () => {
        reject(new Error('Error loading image.'));
      };
    });
  }

  //date method
  onDateChange(formArray: FormArray, index: number, controlName: string): void {
    const formGroup = formArray.at(index) as FormGroup;

    formGroup.get(controlName)?.updateValueAndValidity();
    /*debug*/ //console.log("inicio: ", formGroup.get('startDate')?.value);
    /*debug*/ //console.log("fim: ", formGroup.get('endDate')?.value);
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