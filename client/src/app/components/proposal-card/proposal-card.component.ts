import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ProposalService } from '../../services/proposal.service';

@Component({
  selector: 'app-proposal-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './proposal-card.component.html',
  styleUrl: './proposal-card.component.scss'
})
export class ProposalCardComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  proposalService = inject(ProposalService);
  userService = inject(UserService);
  
  isClient: boolean = false; 
  userRole: string | null = null; 

  @Input() proposal: any;
  project: any;
  detailedProposal: any = null;
  showDetails = false;

  creatorName = '';
  projectCreatorName = '';

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    if (this.userRole === 'CLIENT') {
      this.isClient = true;
      this.loadProposaLDetails();
    } else if (this.userRole === 'FREELANCER') {
      this.isClient = false;
      this.loadProposaLDetails();
    } else {
      console.log("invalid role");
    }
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  loadProposaLDetails() {
    const proposalId = this.proposal._id;
    this.proposalService.getProposalById(proposalId).subscribe(
      (response) => {
        if (response.success) {
          this.detailedProposal = response.data;
          /*debug*/ //console.log('Full Proposal Data:', this.detailedProposal);
          const creatorId = this.detailedProposal.freelancerId;
          const projectCreatorId = this.detailedProposal.clientId;
          const projectId = this.detailedProposal.projectId;
          this.loadProject(projectId);  
          this.loadProjectCreatorName(projectCreatorId); 
          this.loadCreatorName(creatorId);
        } else {
          console.error('Failed to retrieve proposal details:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching proposal details:', error);
      }
    );
  }

  loadProject(projectId: string | null): void {
    this.projectService.getProjectById(projectId).subscribe(response => {
      this.project = response.data;
      /*Debug*/ //console.log('Project loaded:', this.project);  
    });
  }

  loadCreatorName(userId: string) {
    this.userService.getUser(userId).subscribe(
      (response) => {
        if (response.success) {
          this.creatorName = response.data.username;
        } else {
          console.error('Failed to retrieve creator details:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching creator details:', error);
      });
  }

  loadProjectCreatorName(userId: string) {
    this.userService.getUser(userId).subscribe(
      (response) => {
        if (response.success) {
          this.projectCreatorName = response.data.username;
        } else {
          console.error('Failed to retrieve project creator details:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching project creator details:', error);
      });
  }

  sendProposal() {
    // Implement logic to post the project (e.g., make an API call)
    console.log("Send Proposal button clicked");
  }

  editProposal() {
    console.log("Edit Proposal button clicked");
    this.router.navigate(['../edit-proposal', this.proposal._id], { relativeTo: this.route });
  }

  cancelProposal() {
    alert('Proposal Canceled!');
    //delete proposal logic
  }

  makeCounterProposal() {
    console.log("Counter Proposal button clicked");
    //this.router.navigate(['../edit-proposal', this.proposal._id], { relativeTo: this.route });
  }
}
