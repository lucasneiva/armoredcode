import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';


@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
})
export default class CreateProjectComponent implements OnInit{
  fb = inject(FormBuilder);
  projectService = inject(ProjectService);
  router = inject(Router);
  createProjectForm !: FormGroup;

  ngOnInit(): void {
    this.createProjectForm = this.fb.group({
      clientId: ['',Validators.required],
      freelancerId: [''],
      projectCategoryId: ['',Validators.required],
      skillIds: [''],
      projectTitle: ['',Validators.required],
      projectDescription: ['',Validators.required],
      projectHourlyRate: [''],
      projectBudget: [''],
      pricingType: ['',Validators.required],
      estimatedDuration: ['',Validators.required],
      projectSize: [''],
      projectStatus: [''],
      experienceLevel: [''],
      workModel: ['',Validators.required],
      location: [''],
      startDate: [''],
      endDate: [''],
    },
    );
  }

  CreateProject(){
    this.projectService.createProjectForm(this.createProjectForm.value)
    .subscribe({
      next:(res)=>{
        alert("project Created!")
        this.createProjectForm.reset();
        this.router.navigate(['manage-project'])
      },
      error:(err)=>{
        console.log(err);
      }
    })

  }
}
