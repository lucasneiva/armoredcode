import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-freelancer-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.scss']
})
export default class FreelancerProfileComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  freelancerForm!: FormGroup;
  //certifications: Certification[]=[];

  ngOnInit(): void {
    this.freelancerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      profileSummary: [''],
      location: this.fb.group({
        cep: ['', Validators.required],
        street: ['', Validators.required],
        number: ['', Validators.required],
        neighborhood: ['', Validators.required],
        city: ['', Validators.required],
        state: [{ value: 'SP', disabled: true }],
        country: [{ value: 'Brasil', disabled: true }]
      }),
      education: this.fb.group({
        degreeName: [''],
        fieldOfStudy: [''],
        institution: [''],
        startDate: [''],
        endDate: ['']
      }),
      certifications: this.fb.array([this.createCertification()]),
      professional: this.fb.group({
        portfolio: [''],
        specializations: [''],
        experienceLevel: [''],
        skillIds: [''],
        hourlyRate: ['']
      })
    });
  }

  createCertification(): FormGroup {
    return this.fb.group({
      name: [''],
      issuingOrganization: [''],
      issueDate: ['']
    });
  }

  addCertification(): void {
    const certifications = this.freelancerForm.get('certifications') as FormArray;
    certifications.push(this.createCertification());
  }

  onSubmit(): void {
    if (this.freelancerForm.valid) {
      console.log(this.freelancerForm.value);
    } else {
      this.freelancerForm.markAllAsTouched();
    }
  }
}
