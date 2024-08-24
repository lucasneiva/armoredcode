import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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

  profileForm !: FormGroup;
  clientProfileForm !: FormGroup;
  freelancerProfileForm !: FormGroup;

  isClient: boolean = false; //false is default

  ngOnInit(): void {

    this.profileForm = this.fb.group({

      client: this.clientProfileForm = this.fb.group({
        companyName: ['', Validators.required],
        companySite: [''],
        companyDescription: [''],
        companySize: [''],
        companyIndustry: [''],
        location: this.fb.group({
          zipCode: ['', Validators.required],
          street: ['', Validators.required],
          number: ['', Validators.required],
          neighborhood: ['', Validators.required],
          city: ['', Validators.required],
          state: ['SP', Validators.required],
          country: ['Brasil', Validators.required],
        }),
      }),

      freelancer: this.freelancerProfileForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        profileSummary: [''],
        portfolio: [''],
        experiences: this.fb.array([]), // Use FormArray for multiple experiences
        education: this.fb.array([]),    // Use FormArray for multiple education entries
        certifications: this.fb.array([]), // Use FormArray for multiple certifications
        specializations: [''],
        experienceLevel: [''],
        skillIds: [''],
        hourlyRate: [''],
        location: this.fb.group({
          zipCode: ['', Validators.required],
          street: ['', Validators.required],
          number: ['', Validators.required],
          neighborhood: ['', Validators.required],
          city: ['', Validators.required],
          state: ['SP', Validators.required],
          country: ['Brasil', Validators.required],
        }),
      }),
    },
    );
  }

  onSubmit() {
    if (this.isClient) {
      // Submit client profile
      if (this.clientProfileForm.valid) {
        console.log(this.clientProfileForm.value); // Replace with your backend logic
        this.clientProfileForm.reset();
      } else {
        // Handle form errors
      }
    } else {
      // Submit freelancer profile
      if (this.freelancerProfileForm.valid) {
        console.log(this.freelancerProfileForm.value); // Replace with your backend logic
        this.freelancerProfileForm.reset();
      } else {
        // Handle form errors
      }
    }
  }

  cancelSubmit(){
    alert("profile creation Canceled!")
    
    this.router.navigate(['login'])
    this.profileForm.reset();
  }

  // Helper functions to manage FormArrays (for experiences, education, certifications)
  // ... (You can add these functions based on your requirements)
  /*
  addExperience() {
    const experienceForm = this.fb.group({
    // Add fields for experience here
    });
    this.freelancerProfileForm.get('experiences').push(experienceForm);
  }

  removeExperience(index: number) {
    this.freelancerProfileForm.get('experiences').removeAt(index);
  }

  addEducation() {
    const educationForm = this.fb.group({
      // Add fields for education here
    });
    this.freelancerProfileForm.get('education').push(educationForm);
  }

  removeEducation(index: number) {
    this.freelancerProfileForm.get('education').removeAt(index);
  }

  addCertification() {
    const certificationForm = this.fb.group({
      // Add fields for certification here
     },
     );
   }
  */
}
