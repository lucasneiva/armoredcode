import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service'; // Import your ChatService
import { ProposalService } from '../../services/proposal.service';
import { catchError, map, of, switchMap, throwError } from 'rxjs';

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
    // Implement logic to post the project (e.g., make an API call)
    console.log("Send Proposal button clicked");
  }

  editProposal() {
    this.router.navigate(['../edit-proposal', this.proposal._id], { relativeTo: this.route });
  }

  cancelProposal() {
    const proposalId = this.proposal._id;
    if (confirm("Are you sure you want to cancel this proposal?")) {
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
    const clientId = this.project.clientId._id; // Or this.proposal.clientId._id if available

    if (confirm("Are you sure you want to accept this proposal?")) {
        this.proposalService.acceptProposal(proposalId).pipe(
            switchMap((response) => {
                if (response.success) {
                    console.log('Proposal accepted successfully');
                    this.proposal.status = 'ACCEPTED'; // Update UI immediately

                    // Create the chat channel
                    return this.chatService.createChatChannel(projectId, freelancerId, clientId).pipe(
                        map(newChatChannel => ({ updateResponse: true, newChatChannel })), // Pass both values
                        
                        catchError(error => {
                            console.error('Error creating chat channel:', error);
                            // Optionally show an error message to the user, but don't stop the process
                            return of({ updateResponse: true, newChatChannel: null }); // Continue with update
                        })
                    );


                } else {
                    return throwError(() => new Error('Error accepting proposal'));
                }
            }),
            switchMap((result) => { // Use result to access both updateResponse and newChatChannel
                if (result.updateResponse) { // Update project even if chat creation fails
                  return this.projectService.updateProjectFreelancer(projectId, freelancerId);
                } else {
                  return throwError(() => new Error('Error accepting proposal'));
                }
            }),
            switchMap((updateResponse) => {
                if (updateResponse.success) {
                    console.log('Project freelancerId updated successfully');
                    this.project.freelancerId = freelancerId;
                    return this.projectService.updateProjectStatus(projectId, 'IN-PROGRESS');
                } else {
                    return throwError(() => new Error('Error updating project freelancerId'));
                }
            })
        ).subscribe({
            next: (updateStatusResponse) => {
                if (updateStatusResponse.success) {
                    console.log('Project status updated successfully');
                    this.project.projectStatus = 'IN-PROGRESS';

                    // Handle the newChatChannel if it was created successfully
                    

                    //window.location.reload();
                } else {
                    console.error('Error updating project status:', updateStatusResponse.message);
                }
            },
            error: (error) => {
                console.error('Error during update process:', error);
                // Handle errors and potentially revert changes if necessary
            }
        });
    }
}

  rejectProposal() {
    const proposalId = this.proposal._id;
    if (confirm("Are you sure you want to reject this proposal?")) {
      this.proposalService.rejectProposal(proposalId).subscribe(
        (response) => {
          if (response.success) {
            console.log('Proposal rejected successfully');
            // Update the proposal status in the UI or reload the page
            this.proposal.status = 'REJECTED'; 
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

  createChatChannel() {
    const projectId = this.project._id;
    const freelancerId = this.proposal.freelancerId;
    const clientId = this.project.clientId._id; // Make sure you have the clientId

    this.chatService.createChatChannel(projectId, freelancerId, clientId).subscribe(
        (newChatChannel) => {
            console.log('Chat channel created successfully:', newChatChannel);
            // You might want to update the UI here to reflect the new chat channel
        },
        (error) => {
            console.error('Error creating chat channel:', error);
            // Handle the error appropriately (e.g., display an error message to the user)
        }
    );
  }

  makeCounterProposal() {
    console.log("Counter Proposal button clicked");
    //this.router.navigate(['../edit-proposal', this.proposal._id], { relativeTo: this.route });
  }
}
