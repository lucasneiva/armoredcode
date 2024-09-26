import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,
        ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { ProposalService } from '../../services/proposal.service';


@Component({
  selector: 'app-create-proposal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-proposal.component.html',
  styleUrl: './create-proposal.component.scss'
})
export default class CreateProposalComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  proposalService = inject(ProposalService);

}
