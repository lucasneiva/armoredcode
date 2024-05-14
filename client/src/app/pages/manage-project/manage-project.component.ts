import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { Project, ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-manage-project',
  standalone: true,
  imports: [RouterModule,ProjectCardComponent],
  templateUrl: './manage-project.component.html',
  styleUrl: './manage-project.component.scss'
})
export default class ManageProjectComponent implements OnInit{
  //private projectService = inject(ProjectService);
  projects: Project[] = [];

  ngOnInit(): void {
    //this.searchProjects();
    //this.getProjectById();
    //this.getProjects();
  }

  /*
  getProjects(){
    this.projectService.getProjects().subscribe({
      next: (res)=> {
        this.projects = res.data;
      }
    });
  }
  */
}
