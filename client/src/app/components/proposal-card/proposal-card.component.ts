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
  route = inject(ActivatedRoute); // Inject ActivatedRoute
  projectService = inject(ProjectService);
  proposalService = inject(ProposalService);
  userService = inject(UserService);
  authService = inject(AuthService); // Inject AuthService
  
  isClient: boolean = false; 
  userRole: string | null = null; 

  @Input() proposal: any;
  detailedProposal: any = null;  // Separate object for detailed data
  showDetails = false; // Flag to control showing details

  creatorName = '';

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    if (this.userRole === 'CLIENT') {
      this.isClient = true;
    } else if (this.userRole === 'FREELANCER') {
      this.isClient = false;
    } else {
      console.log("invalid role");
    }
  }

  toggleDetails() {
    if (this.showDetails) {
      this.detailedProposal = null; // Clear project details when closing
    } else {
      this.loadProposaLDetails(); // Load new data when opening
    }
    this.showDetails = !this.showDetails;
  }

  loadProposaLDetails() {
    const proposalId = this.proposal._id;
    this.proposalService.getProposalById(proposalId).subscribe(
      (response) => {
        if (response.success) {
          this.detailedProposal = response.data;  // Access the 'data' property from the response
          /*debug*/ //console.log('Full Project Data:', this.detailedProject);
          const creatorId = this.detailedProposal.clientId._id;
          this.loadCreatorName(creatorId); // Load creator's username
        } else {
          console.error('Failed to retrieve project details:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching project details:', error);
      }
    );
  }

  loadCreatorName(userId: string) {
    this.userService.getUser(userId).subscribe(
      (response) => {
        if (response.success) {
          this.creatorName = response.data.username; // Assuming the username is in the 'username' field
        } else {
          console.error('Failed to retrieve creator details:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching creator details:', error);
      });
  }
}
