import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router, RouterModule } from '@angular/router';



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
  descrypitionForm !: FormControl;
 

  ngOnInit() {
    /*
    this.descrypitionForm = new FormGroup({
      desc: new FormControl(''),
    });

    this.createProjectForm = this.fb.group({
      
      clientId: ['',Validators.required],
      freelancerId: [''],
      projectCategoryId: ['',Validators.required],
      skillIds: [''],
      projectTitle: ['',Validators.required],
      projectDescription: [this.descrypitionForm.get('desc')],
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
    */

    this.createProjectForm = this.fb.group({
      clientId: ['',Validators.required],
      freelancerId: [''],
      projectCategoryId: ['',Validators.required],
      skillIds: [''],
      projectTitle: ['',Validators.required],

      //descrição do projeto do form separado
      descrypitionForm:  this.fb.group({
        projectDescription: ['',Validators.required],
      }),

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
    /*debug*/ console.log(this.createProjectForm.value);
    this.projectService.createProjectService(this.createProjectForm.value)
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

  CancelProject(){
    alert("project Canceled!")
    this.createProjectForm.reset();
    this.router.navigate(['manage-project'])
  }

  /*
  PublishProject(){
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
  */
}
