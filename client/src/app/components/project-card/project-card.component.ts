import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ProjectService } from '../../services/project.service';
import { SkillService } from '../../services/skill.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  router = inject(Router);
  route = inject(ActivatedRoute); // Inject ActivatedRoute
  projectService = inject(ProjectService);
  skillService = inject(SkillService);
  userService = inject(UserService);
  authService = inject(AuthService); // Inject AuthService
  
  isClient: boolean = false; 
  userRole: string | null = null; 

  @Input() project: any;
  detailedProject: any = null;  // Separate object for detailed data
  showDetails = false; // Flag to control showing details

  creatorName = '';
  skills: string[] = [];

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
      this.detailedProject = null; // Clear project details when closing
    } else {
      this.loadProjectDetails(); // Load new data when opening
    }
    this.showDetails = !this.showDetails;
  }

  loadProjectDetails() {
    const projectId = this.project._id;
    this.projectService.getProjectById(projectId).subscribe(
      (response) => {
        if (response.success) {
          this.detailedProject = response.data;  // Access the 'data' property from the response
          /*debug*/ //console.log('Full Project Data:', this.detailedProject);
          const skillIds = this.detailedProject.skillIds;
          const creatorId = this.detailedProject.clientId._id;
          this.loadCreatorName(creatorId); // Load creator's username
          this.loadSkills(skillIds);
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

  loadSkills(skillIds: any[]) {
    skillIds.forEach((skillId) => {
      // Extract the _id from the skillId object
      const skillIdValue = skillId._id; // assuming skillId is an object with an _id property

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

  postProject() {
    // Implement logic to post the project (e.g., make an API call)
    console.log("Post Project button clicked");
  }

  editProject() {
    console.log("Edit Project button clicked");
    this.router.navigate(['../edit-project', this.project._id], { relativeTo: this.route });
  }

  cancelProject() {
    const projectId = this.project._id;

    if (confirm("Are you sure you want to cancel this project?")) {
      this.projectService.deleteProject(projectId).subscribe(
        (response) => {
          if (response.success) {
            console.log('Project cancelled successfully');
            window.location.reload();
            // You might need to emit an event to notify a parent component
          } else {
            console.error('Error cancelling project:', response.message);
            // Show an error message to the user
          }
        },
        (error) => {
          console.error('Error cancelling project:', error);
          // Show an error message to the user
        }
      );
    }
  }

  makeProposal(){
    console.log("create Proposal button clicked");
    this.router.navigate(['../create-proposal', this.project._id], { relativeTo: this.route });
  }

}