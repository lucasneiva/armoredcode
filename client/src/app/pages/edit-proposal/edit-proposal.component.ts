import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup,
  ReactiveFormsModule, Validators
} from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { ProposalService } from '../../services/proposal.service';

@Component({
  selector: 'app-edit-proposal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-proposal.component.html',
  styleUrl: './edit-proposal.component.scss'
})
export default class EditProposalComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);

  authService = inject(AuthService);
  projectService = inject(ProjectService);
  proposalService = inject(ProposalService);

  editProposalForm!: FormGroup;

  isLoading = true;

  proposal: any;
  project: any;
  proposalId!: string;

  ngOnInit() {
    this.initForms();  

    this.route.params.subscribe(params => {
      this.proposalId = params['id'];
      if (this.proposalId) {
        this.loadProposal();  
      } else {
        console.error('proposal ID is missing');
      }
    });
  }

  // Initialize form structure
  initForms(): void {
    this.editProposalForm = this.fb.group({
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
  }

  loadProposal(): void {
    this.isLoading = true;
    this.proposalService.getProposalById(this.proposalId).subscribe(response => {
      this.proposal = response.data;
      /*Debug*/ //console.log('Proposal loaded:', this.proposal);
      this.isLoading = false;
      if (this.proposal) {
        this.loadProject(this.proposal.projectId);  
        this.populateForms(this.proposal);  
      }
    });
  }

  loadProject(projectId: string | null): void {
    this.projectService.getProjectById(projectId).subscribe(response => {
      this.project = response.data;
      /*Debug*/ //console.log('Project loaded:', this.project);  
    });
  }

  // Populate form with fetched project data
  populateForms(proposal: any): void {
    if (proposal) {
      this.editProposalForm.patchValue({
        projectId: proposal.projectId,
        freelancerId: proposal.freelancerId,
        clientId: proposal.clientId,
        coverLetter: proposal.coverLetter,
        pricingType: proposal.pricingType,
        proposedBudget: proposal.proposedBudget,
        proposedHourlyRate: proposal.proposedHourlyRate,
        estimatedDuration: proposal.estimatedDuration,
        status: proposal.status,
      });
      // Populate budget or hourly rate based on pricing type
      if (proposal.pricingType === 'BUDGET') {
        this.editProposalForm.get('proposedBudget')?.patchValue(proposal.proposedBudget);
      } else {
        this.editProposalForm.get('proposedHourlyRate')?.patchValue(proposal.proposedHourlyRate);
      }
    }
  }

  EditProposal() {
    this.editProposalForm.patchValue({ status: 'DRAFT' });
    /*debug*/ console.log(this.editProposalForm.value);
    this.proposalService
      .updateProposal(this.proposalId, this.editProposalForm.value)
      .subscribe({
        next: (res) => {
          alert('Proposta Editada com sucesso!');
          this.editProposalForm.reset();
          this.router.navigate(['manage-proposal']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  SubmitProposal() {
    this.editProposalForm.patchValue({ status: 'PENDING' });
    /*debug*/ console.log(this.editProposalForm.value);
    this.proposalService
      .updateProposal(this.proposalId, this.editProposalForm.value)
      .subscribe({
        next: (res) => {
          alert('Proposta Editada e Enviada!');
          this.editProposalForm.reset();
          this.router.navigate(['manage-proposal']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  CancelProposal() {
    if (confirm("Cancelar Edição da Proposta?")) {
      alert('A Edição da Proposta foi Cancelada!');
      this.router.navigate(['manage-proposal']);
      this.editProposalForm.reset();
    }
  }
}
