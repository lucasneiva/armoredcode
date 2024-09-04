import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { Project, ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-project',
  standalone: true,
  imports: [CommonModule, RouterModule, ProjectCardComponent],
  templateUrl: './manage-project.component.html',
  styleUrl: './manage-project.component.scss'
})
export default class ManageProjectComponent implements OnInit{
  router = inject(Router);
  projectService = inject(ProjectService);
  projects: Project[] = [];// Array to store projects

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res.data;
      },
    });
  }

}
