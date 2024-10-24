import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ProjectService } from '../../services/project.service';
import { SkillService } from '../../services/skill.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Proposal, ProposalService } from '../../services/proposal.service';
import { ProposalCardComponent } from '../proposal-card/proposal-card.component'; // Importe aqui
import { ProjectDetailsComponent } from '../project-details/project-details.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ProposalCardComponent, ProjectDetailsComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  router = inject(Router);
  projectService = inject(ProjectService);
  proposalService = inject(ProposalService);
  skillService = inject(SkillService);
  userService = inject(UserService);
  authService = inject(AuthService);

  userRole: string | null = null;

  @Input() project: any;
  detailedProject: any = null;
  showDetails = false;
  showProposals: boolean = false;

  projectCategoryName = '';
  creatorName = '';
  skills: string[] = [];
  proposals: Proposal[] = [];

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    if (this.userRole === 'CLIENT' || this.userRole === 'FREELANCER') {
      this.loadProjectDetails();
    } else {
      console.log("invalid role");
    }
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  loadProjectDetails() {
    const projectId = this.project._id;
    this.projectService.getProjectById(projectId).subscribe(
      (response) => {
        if (response.success) {
          this.detailedProject = response.data;
          /*debug*/ //console.log('Full Project Data:', this.detailedProject);
          const skillIds = this.detailedProject.skillIds;
          const creatorId = this.detailedProject.clientId._id;
          const projectCategoryId = this.detailedProject.projectCategoryId._id;
          this.loadProjectCategoryName(projectCategoryId);
          this.loadCreatorName(creatorId);
          this.loadSkills(skillIds);
          if (this.userRole == "CLIENT") {
            this.loadProposals();
          }
        } else {
          console.error('Failed to retrieve project details:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching project details:', error);
      }
    );
  }

  loadProposals() {
    // Buscar as propostas relacionadas ao projeto
    this.proposalService.getProposalsByProjectId(this.project._id).subscribe(
      (response) => {
        if (response.success) {
          this.proposals = response.data;
        } else {
          console.error('Failed to retrieve proposals:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching proposals:', error);
      }
    );
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

  loadSkills(skillIds: any[]) {
    skillIds.forEach((skillId) => {
      const skillIdValue = skillId._id;
      this.skillService.getSkillById(skillIdValue)
        .subscribe({
          next: (skillData) => {
            this.skills.push(skillData.data.skillName);
            /*debug*/ //console.log("skill: " + this.skills); console.log("id: " + skillIdValue);
          },
          error: (error) => {
            console.error("Error loading skill:", error);
          }
        });
    });
  }

  loadProjectCategoryName(categoryId: string) {
    this.projectService.getProjectCategoryById(categoryId).subscribe(
      (response) => {
        if (response.success) {
          this.projectCategoryName = response.data.categoryName;
          /*debug*/ //console.log(this.projectCategoryName);
        } else {
          console.error('Failed to project category details:', response.message);
        }
      },
      (error) => {
        console.error('Error project category details:', error);
      });
  }

}