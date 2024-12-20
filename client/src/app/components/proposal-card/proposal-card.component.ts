import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service'; // Import your ChatService
import { ProposalService } from '../../services/proposal.service';
import { catchError, map, of, switchMap, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proposal-card',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './proposal-card.component.html',
  styleUrl: './proposal-card.component.scss'
})
export class ProposalCardComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  chatService = inject(ChatService);
  projectService = inject(ProjectService);
  proposalService = inject(ProposalService);
  userService = inject(UserService);

  userRole: string | null = null;

  @Input() proposal: any;
  project: any;
  detailedProposal: any = null;
  showDetails = false;

  creatorName = '';
  projectCreatorName = '';

  showRejectionForm = false;
  rejectionReason = '';

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    if (this.userRole === 'CLIENT' || this.userRole === 'FREELANCER') {
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
    const proposalId = this.proposal._id;

    if (confirm("Are you sure you want to send this proposal?")) {
      this.proposalService.sendProposal(proposalId).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Proposal sent successfully');
            // Update the proposal status in the component
            this.proposal.status = 'PENDING';
            this.detailedProposal.status = 'PENDING'; // Also update detailedProposal
            window.location.reload();
          } else {
            console.error('Error sending proposal:', response.message);
            // Handle error, e.g., display an error message to the user
          }
        },
        error: (error) => {
          console.error('Error sending proposal:', error);
          // Handle error
        }
      });
    }
  }

  editProposal() {
    this.router.navigate(['../edit-proposal', this.proposal._id], { relativeTo: this.route });
  }

  cancelProposal() {
    const proposalId = this.proposal._id;
    if (confirm("Você tem certeza que quer Cancelar esta Proposta?")) {
      this.proposalService.deleteProposal(proposalId).subscribe(
        (response) => {
          if (response.success) {
            console.log('Proposal cancelled successfully');
            window.location.reload();
          } else {
            console.error('Error cancelling proposal:', response.message);
          }
        },
        (error) => {
          console.error('Error cancelling proposal:', error);
        }
      );
    }
  }

  acceptProposal() {
    const proposalId = this.proposal._id;
    const projectId = this.proposal.projectId;
    const freelancerId = this.proposal.freelancerId;

    if (confirm("Are you sure you want to accept this proposal?")) {
      this.proposalService.acceptProposal(proposalId).pipe(
        switchMap((response) => {
          if (response.success) {
            console.log('Proposal accepted successfully');
            // 1. Update proposal status in the UI
            this.proposal.status = 'ACCEPTED';
            // 2. Update the project with freelancer ID
            return this.projectService.updateProjectFreelancer(projectId, freelancerId);
          } else {
            return throwError(() => new Error('Error accepting proposal'));
          }
        }),
        switchMap((updateResponse) => {
          if (updateResponse.success) {
            console.log('Project freelancerId updated successfully');
            // Update the project object in your component
            this.project.freelancerId = freelancerId;
            // 3. Update project status
            return this.projectService.updateProjectStatus(projectId, 'IN-PROGRESS');
          } else {
            return throwError(() => new Error('Error updating project freelancerId'));
          }
        })
      ).subscribe(
        (updateStatusResponse) => {
          if (updateStatusResponse.success) {
            console.log('Project status updated successfully');
            this.project.projectStatus = 'IN-PROGRESS'; // Update status in the component
            window.location.reload();
          } else {
            console.error('Error updating project status:', updateStatusResponse.message);
            // Handle error (e.g., show an error message to the user)
          }
        },
        (error) => {
          console.error('Error during update process:', error);
          // Handle error (e.g., show an error message to the user)
        }
      );
    }
  }

  rejectProposal() {
    const proposalId = this.proposal._id;

    if (this.rejectionReason.trim() === '') {
      /* deprecated
      alert('Por favor, forneça um motivo para a rejeição.');
      return;
      */
      this.rejectionReason = "Sem motivo especificado.";
    }
    if (confirm("Are you sure you want to reject this proposal?")) {
      this.proposalService.rejectProposal(proposalId, this.rejectionReason).subscribe(
        (response) => {
          if (response.success) {
            console.log('Proposal rejected successfully');
            // Update the proposal status in the UI or reload the page
            this.proposal.status = 'REJECTED';
            this.showRejectionForm = false;
            window.location.reload();
          } else {
            console.error('Error rejecting proposal:', response.message);
          }
        },
        (error) => {
          console.error('Error rejecting proposal:', error);
        }
      );
    }
  }

}
