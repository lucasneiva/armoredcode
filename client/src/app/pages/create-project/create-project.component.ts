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
      projectCategoryId: ['',Validators.required],
      skillIds: [],
      projectTitle: ['',Validators.required],

      //descrição do projeto do form separado
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

  //fix
  get startDate(){
    const currentDateAndTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    return  currentDateAndTime;
  }

  //fix
  public get duration(){
    return this.endDate;
  }

  //fix
  get endDate(){
    const currentDateAndTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    let duration = this.datePipe.transform(new Date(), 'HH');
    return (currentDateAndTime + duration);
  }

  

  CreateProject(){
    /*debug*/ console.log(this.createProjectForm.value);
    this.projectService.createProjectService(this.createProjectForm.value)
    .subscribe({
      next:(res)=>{
        alert("project Created!")
        localStorage.setItem("user_id", res.data._id);
        this.projectService.isDraft$.next(true);
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

  Test(selectedOption: string){
    switch (selectedOption) {
      case 'BUDGET':
        
        break;
      case 'HOURLY_RATE':
        
        break;
      default:
        // Handle default values or reset to initial values
        break;
    }
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
