import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,
        ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
//import { ProposalService } from '../../services/proposal.service';

@Component({
  selector: 'app-create-proposal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-proposal.component.html',
  styleUrl: './create-proposal.component.scss'
})
export default class CreateProposalComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  //proposalService = inject(ProposalService);

  createProposalForm!: FormGroup;

  ngOnInit() {
    this.createProposalForm = this.fb.group({
      clientId: ['', Validators.required], //this.clientId
      freelancerId: ['', Validators.required], //this.freelancerId
      workDescription: ['', Validators.required],
      estimatedDuration: ['', Validators.required],
      propusedValue: ['', Validators.required],
    });
  }

  CreateProposal() {
    //this.createProposalForm.patchValue({ projectStatus: 'DRAFT' });
    /*debug*/ console.log(this.createProposalForm.value);
    this.projectService
      .createProjectService(this.createProposalForm.value)
      .subscribe({
        next: (res) => {
          alert('proposal Created!');
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
    /*debug*/ console.log(this.createProposalForm.value);
    this.projectService
      .createProjectService(this.createProposalForm.value)
      .subscribe({
        next: (res) => {
          alert('Proposal Created and Sent!');
          this.createProposalForm.reset();
          this.router.navigate(['home']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  CancelProposal() {
    alert('Proposal Canceled!');
    this.createProposalForm.reset();
    this.router.navigate(['home']);
  }
}
