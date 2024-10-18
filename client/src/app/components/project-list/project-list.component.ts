import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService, Project } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { UserService } from '../../services/user.service';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectDetailsComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
  projectService = inject(ProjectService);
  authService = inject(AuthService);
  skillService = inject(SkillService)
  userService = inject(UserService); 

  userRole: string | null = this.authService.getUserRole();

  projects: Project[] = [];
  skills: string[] = []; 

  selectedProjectDetails: any | null = null; // Change type to any to accommodate extra data
  creatorName = '';
  
  @Output() projectSelected = new EventEmitter<Project>();
  @Output() projectListClosed = new EventEmitter<void>(); 
  @Output() close = new EventEmitter<void>();

  ngOnInit() {
    this.loadProjects();
  }

  onClose() {
    this.close.emit(); 
  }

  loadProjects() {
    const clientId = this.authService.getUserId();
    if (clientId) {
      this.projectService.getProjects().subscribe({
        next: (res) => {
          this.projects = res.data;
          
        },
        error: (err) => {
          console.error("Error fetching projects:", err);
        }
        
      });
    } else {
      console.error("Client ID is missing!");
    }
  }

  selectProject(project: Project) {
    this.projectSelected.emit(project);
  }

  closeProjectList() {
    this.projectListClosed.emit(); 
  }

  showProjectDetails(project: Project) {
    this.projectService.getProjectById(project._id).subscribe({
      next: (res) => {
        this.selectedProjectDetails = res.data; 
        /*debug*/ //console.log(this.selectedProjectDetails);
        this.loadCreatorName(this.selectedProjectDetails.clientId._id); // Fetch creator name
        this.loadSkills(this.selectedProjectDetails.skillIds);
      },
      error: (err) => {
        console.error("Error fetching project details:", err);
      }
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

  closeProjectDetails() {
    this.selectedProjectDetails = null;
    this.creatorName = "";
    this.skills = [];
  }

}