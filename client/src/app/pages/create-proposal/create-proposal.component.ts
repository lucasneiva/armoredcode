import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,
        ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; 
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { ProposalService } from '../../services/proposal.service';

@Component({
  selector: 'app-create-proposal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-proposal.component.html',
  styleUrl: './create-proposal.component.scss'
})
export default class CreateProposalComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);

  authService = inject(AuthService);
  projectService = inject(ProjectService);
  proposalService = inject(ProposalService);

  createProposalForm!: FormGroup;

  isLoading = true;

  project: any;
  projectId!: string;

  ngOnInit() {
    this.createProposalForm = this.fb.group({
      projectId: ['', Validators.required], 
      freelancerId: ['', Validators.required], 
      clientId: ['', Validators.required], 
      coverLetter: ['', Validators.required],
      pricingType: ['BUDGET', Validators.required],
      proposedBudget: [''],
      proposedHourlyRate: [''],
      estimatedDuration: ['', Validators.required],
      status: [''],
    });

    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      if (this.projectId) {
        this.loadProject();
      } else {
        console.error('Project ID is missing');
      }
    });
  }

  loadProject(): void {
    this.isLoading = true;
    this.projectService.getProjectById(this.projectId).subscribe(response => {
      this.project = response.data;
      /*Debug*/ //console.log('Project loaded:', this.project);  
      // Set projectId and clientId in the form after loading the project
      this.createProposalForm.patchValue({
        projectId: this.project._id,
        freelancerId: this.authService.getUserId(),
        clientId: this.project.clientId._id,
        pricingType: this.project.pricingType
      });
      this.isLoading = false;
      if (this.project) {
        console.log("project fetched sucessfully!");
      }
    });
  }

  CreateProposal() {
    this.createProposalForm.patchValue({ status: 'DRAFT' });
    /*debug*/ console.log(this.createProposalForm.value);
    this.proposalService
      .createProposal(this.createProposalForm.value)
      .subscribe({
        next: (res) => {
          alert('Proposta Criada!');
          this.createProposalForm.reset();
          this.router.navigate(['home']);
          //this.router.navigate(['manage-proposal']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  SubmitProposal() {
    this.createProposalForm.patchValue({ status: 'PENDING' });
    /*debug*/ console.log(this.createProposalForm.value);
    this.proposalService
      .createProposal(this.createProposalForm.value)
      .subscribe({
        next: (res) => {
          alert('Proposta Criada e Enviada!');
          this.createProposalForm.reset();
          this.router.navigate(['home']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  CancelProposal() {
    alert('Proposta Cancelada!');
    this.createProposalForm.reset();
    this.router.navigate(['home']);
  }
}
