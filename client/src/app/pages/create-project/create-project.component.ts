import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
})
export default class CreateProjectComponent implements OnInit{
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  router = inject(Router);
  createProjectForm !: FormGroup;
  datePipe: any;

  ngOnInit() {

    this.createProjectForm = this.fb.group({
      clientId: [this.clientId,Validators.required],
      freelancerId: [this.freelancerId],
      //projectCategoryId: ['',Validators.required],
      projectCategoryId: ['64f23b5c1c9d440000678901',],
      
      skillIds: [],
      projectTitle: ['',Validators.required],

      //projectDescription:  ['Seeking a skilled developer to build a modern and responsive e-commerce website with secure payment integration.', Validators.required], 
      projectDescription:  ['', Validators.required], 
      
      //projectHourlyRate: [],
      projectHourlyRate: this.fb.group({
        min: [ , Validators.required],
        max: [ , Validators.required],
      }),

      //projectBudget: [],
      projectBudget: this.fb.group({
        min: [ , Validators.required],
        max: [ , Validators.required],
      }),
      
      pricingType: ['',Validators.required],
      estimatedDuration: ['',Validators.required],
      projectSize: [''],
      
      // projectStatus: [''],
      projectStatus: [''],
      
      experienceLevel: [''],
      workModel: ['',Validators.required],

      //location: ['',Validators.required],
      location: this.fb.group({ 
        city: ['SOROCABA'], 
        state: ['SP'], 
        country: ['BRAZIL'] 
      }),

      //CAMPOS CALCULADOS
      startDate: [''],
      endDate: [''],
      
    },
    );
  }

  set projectStatus(value:String){
    this.projectStatus = value;
  }

  set projectBudget(value:any){
    this.projectBudget = value;
  }

  set projectHourlyRate(value:any){
    this.projectHourlyRate = value;
  }
    
  set freelancerId(value:null){
    this.freelancerId = value;
  }

  get clientId(){
    //return this.authService.isLoggedIn();
    return localStorage.getItem("user_id");
  } 

  CreateProject(){
    this.createProjectForm.patchValue({ projectStatus: 'DRAFT' });
    /*debug*/ console.log(this.createProjectForm.value);
    this.projectService.createProjectService(this.createProjectForm.value)
    .subscribe({
      next:(res)=>{
        alert("project Created!")
        
        //localStorage.setItem("project_id", res.data._id);
        this.projectService.isDraft$.next(true);
        this.createProjectForm.reset();
        this.router.navigate(['manage-project'])
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  PostProject(){
    this.createProjectForm.patchValue({ projectStatus: 'POSTED' });
    /*debug*/ console.log(this.createProjectForm.value);
    this.projectService.createProjectService(this.createProjectForm.value)
    .subscribe({
      next:(res)=>{
        alert("project Created and Posted!")
        
        this.projectService.isPosted$.next(true);
        this.router.navigate(['manage-project'])
        this.createProjectForm.reset();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  CancelProject(){
    alert("project Canceled!")
    
    this.router.navigate(['manage-project'])
    this.createProjectForm.reset();
  }

  updateHourlyRate(newMin: number, newMax: number) {
    this.createProjectForm.patchValue({
      projectHourlyRate: {
        min: newMin,
        max: newMax
      }
    });
  }

  updateBudget(newMin: number, newMax: number) {
    this.createProjectForm.patchValue({
      projectBudget: {
        min: newMin,
        max: newMax
      }
    });
  }

  TestValue(selectedOption: string){
    switch (selectedOption) {
      case 'BUDGET':
        this.createProjectForm.patchValue({ projectHourlyRate: null });
        this.updateHourlyRate(0, 0); 
        break;
      case 'HOURLY_RATE':
        this.createProjectForm.patchValue({ projectBudget: null });
        this.updateBudget(0, 0); 
        break;
      default:
        // Handle default values or reset to initial values
        break;
    }
  }
}
