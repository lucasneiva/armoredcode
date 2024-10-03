import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { ProposalCardComponent } from '../../components/proposal-card/proposal-card.component';
import { Project, ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Proposal, ProposalService } from '../../services/proposal.service';

@Component({
  selector: 'app-manage-proposal',
  standalone: true,
  imports: [CommonModule, RouterModule, ProjectCardComponent, ProposalCardComponent],
  templateUrl: './manage-proposal.component.html',
  styleUrl: './manage-proposal.component.scss'
})
export default class ManageProposalComponent implements OnInit{
  router = inject(Router);
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  proposalService = inject(ProposalService);
 
  isLoading = true; 
  userRole: string | null = null; 
  proposals: Proposal[] = [];

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();

    if (this.userRole === 'CLIENT') {
      //NOTHING
    } else if (this.userRole === 'FREELANCER') {
      this.loadFreelancerProposals(); 
    } else {
      console.log("invalid role");
    }
  }

  loadFreelancerProposals() {
    this.proposalService.getFreelancerProposals().subscribe({
      next: (res) => {
        this.proposals = res.data;
        this.isLoading = false; 
      },
      error: (err) => {
        console.error("Error fetching proposals:", err);
        this.isLoading = false; 
      }
    });
  }

}