import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-freelancer-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.scss']
})
export default class FreelancerProfileComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);

  freelancerForm!: FormGroup;

  profile: any;
  profileId!: string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.profileId = params['id'];
      if (this.profileId) {
        //this.loadProfile();  // Load the profile only if projectId is valid
      } else {
        console.error('Profile ID is missing');
      }
    });
    //inicializar componentes de forma similar ao manage-profile
  }

  //funções relevantes
}
