import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray, FormBuilder, FormControl, FormGroup,
  ReactiveFormsModule, Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { endDateValidator } from '../../validators/date.validator';
import { hourlyRateValidator } from '../../validators/hourly-rate.validator';
import { SkillService } from '../../services/skill.service';
import { SpecializationService } from '../../services/specialization.service';
import { IndustryService } from '../../services/industry.service';
import { ProfileService } from '../../services/profile.service';
import { UserService, User } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { cepValidator } from '../../validators/cep.validator';
import { CepFormatterDirective } from '../../validators/cep-formatter.directive';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CepFormatterDirective],
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
  currentPage!: number;
  totalPages!: number;
  profileImagePreview: string | ArrayBuffer | null = null;

  //arrays:
  selectedSkillId: string = '';
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
    }
    else if (this.userRole === 'FREELANCER') {
      this.fetchSkills();
      this.fetchSpecializations();
      this.currentPage = 1;
      this.totalPages = 6;
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
      profileImage: [''],
      specializationId: [''],
      profileSummary: [''],
      experienceLevel: ['', Validators.required],
      skillIds: this.fb.control([]),
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
      workExperiences: this.fb.array([]),
      educations: this.fb.array([]),
      certifications: this.fb.array([]),
      portfolioItems: this.fb.array([]),

    });

    this.otherSkillForm = this.fb.group({
      skillName: ['', Validators.required],
      skillDescription: [''],
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
    /*debug*/ //console.log(this.clientProfileForm.value);
    /*debug*/ //console.log(this.freelancerProfileForm.value);
    if (this.userRole == "CLIENT" && this.clientProfileForm.valid) {
      this.profileService.createProfile(this.clientProfileForm.value)
        .subscribe({
          next: (res) => {
            alert("Perfil de Cliente criado!");
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

      this.profileService.createProfile(formData)
        .subscribe({
          next: (res) => {
            alert("Perfil de Freelancer criado!");
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
      this.markFormArrayTouched(this.freelancerProfileForm.get('portfolioItems') as FormArray);

      this.displayFormErrors(this.userRole == "CLIENT" ? this.clientProfileForm : this.freelancerProfileForm);
    }
  }

  cancelSubmit() {
    if (confirm("Cancelar Criação do Perfil?")) {
      alert("Criação de Perfil Cancelada!");
      this.router.navigate(['login']);
      if (this.userRole == "CLIENT") {
        this.clientProfileForm.reset();
      }
      else {
        this.freelancerProfileForm.reset();
      }
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

  addSkill(skillId: string | null) { // Accept null for "Other" skill
    const skillIdsControl = this.freelancerProfileForm.get('skillIds') as FormControl;
    const skillIds = skillIdsControl.value;

    if (skillId) { // If a skill from the list is selected
      if (!skillIds.includes(skillId)) {
        skillIdsControl.setValue([...skillIds, skillId]);
        this.showSkillsList = false; // Hide skills list
      }
    } else { // If "Other" skill is selected
      this.showOtherSkillForm = true; // Show the "Other" skill form
    }
  }


  createOtherSkill() {
    if (this.otherSkillForm.valid) {
      const newSkill = this.otherSkillForm.value;
      this.skillService.createSkillService(newSkill).subscribe({
        next: (createdSkill) => {
          this.addSkill(createdSkill._id); // Add the newly created skill
          this.otherSkillForm.reset();     // Reset the "Other" skill form
          this.showOtherSkillForm = false; // Hide the form
          this.fetchSkills(); // Refresh skills list to include the new skill. Important!
        },
        error: (error) => {
          console.error('Error creating skill:', error);
          // Handle error as needed
        },
      });
    }
  }

  cancelSkillCreation() {
    this.otherSkillForm.reset();
    this.showOtherSkillForm = false;
  }

  removeSkill(skillId: string) {
    const skillIdsControl = this.freelancerProfileForm.get('skillIds') as FormControl;
    const skillIds = skillIdsControl.value;
    skillIdsControl.setValue(skillIds.filter((id: string) => id !== skillId));
  }

  getSkillName(skillId: string): string {
    const skill = this.skills.find((s) => s._id === skillId);
    return skill ? skill.skillName : '';
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