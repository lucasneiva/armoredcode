import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ProfileService } from '../../services/profile.service';
import { SkillService } from '../../services/skill.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-freelancer-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './freelancer-card.component.html',
  styleUrl: './freelancer-card.component.scss'
})
export class FreelancerCardComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  profileService = inject(ProfileService);
  skillService = inject(SkillService);
  userService = inject(UserService);

  @Input() freelancer: any;
  detailedfreelancer: any = null;
  showDetails = false; // Flag to control showing details

  freelancerName = '';
  skills: string[] = [];

  toggleDetails() {
    if (this.showDetails) {
      this.detailedfreelancer = null; // Clear project details when closing
    } else {
      this.loadFreelancerDetails(); // Load new data when opening
    }
    this.showDetails = !this.showDetails;
  }

  
  loadFreelancerDetails() {
    const freelancerId = this.freelancer._id;
    this.userService.getUser(freelancerId).subscribe(
      (response) => {
        if (response.success) {
          this.detailedfreelancer = response.data;  // Access the 'data' property from the response
          /*debug*/ //console.log('Full Project Data:', this.detailedProject);
          const skillIds = this.detailedfreelancer.skillIds;
          const freelancerId = this.detailedfreelancer.clientId._id;
          this.loadFreelancerName(freelancerId); // Load creator's username
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
  

  loadFreelancerName(userId: string) {
    this.userService.getUser(userId).subscribe(
      (response) => {
        if (response.success) {
          this.freelancerName = response.data.username; // Assuming the username is in the 'username' field
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
}
