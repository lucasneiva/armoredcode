import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  clientProfileForm!: FormGroup;
  freelancerProfileForm!: FormGroup;

  isClient: boolean = false; //false is default

  ngOnInit(): void {
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
      experiences: this.fb.array([]), 
      education: this.fb.array([]),
      certifications: this.fb.array([]),
      specializations: ['', Validators.required],
      experienceLevel: ['', Validators.required],
      skillIds: ['', Validators.required],
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
  }

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

  cancelSubmit(){
    alert("profile creation Canceled!")
    this.router.navigate(['login'])
    if (this.isClient) {
      this.clientProfileForm.reset();
    }
    else{
      this.freelancerProfileForm.reset(); 
    }
  }

  // Helper functions to manage FormArrays 
  
  //Portfolio
  get portfolioItems(): FormArray {
    return this.freelancerProfileForm.get('portfolio') as FormArray;
  }

  addPortfolioItem() {
    const portfolioItem = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      url: ['', Validators.required],
    });
    this.portfolioItems.push(portfolioItem);
  }

  removePortfolioItem(index: number) {
    this.portfolioItems.removeAt(index);
  }
  
  //Experiences
  get experiences(): FormArray {
    return this.freelancerProfileForm.get('experiences') as FormArray;
  }

  addExperience() {
    const experienceForm = this.fb.group({
      companyName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      jobDescription: [''],
      startDate: ['', Validators.required],
      endDate: [''],
    });
    this.experiences.push(experienceForm);
  }

  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }

  //Education
  get education(): FormArray {
    return this.freelancerProfileForm.get('education') as FormArray;
  }

  addEducation() {
    const educationForm = this.fb.group({
      degreeName: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      institution: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
    });
    this.education.push(educationForm);
  }

  removeEducation(index: number) {
    this.education.removeAt(index);
  }

  //Certifications
  get certifications(): FormArray {
    return this.freelancerProfileForm.get('certifications') as FormArray;
  }

  addCertification() {
    const certificationForm = this.fb.group({
      name: ['', Validators.required],
      issuingOrganization: ['', Validators.required],
      issueDate: ['', Validators.required],
    });
    this.certifications.push(certificationForm);
  }

  removeCertification(index: number) {
    this.certifications.removeAt(index);
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