import { Routes } from '@angular/router';
import { LandigPageComponent } from '../app/pages/landig-page/landig-page.component';

export const routes: Routes = [
    {path:'', redirectTo: '/landing', pathMatch: 'full' }, // Redireciona a raiz
    {path:'landing', component: LandigPageComponent }, // Rota para a landing page
    {path:'login', loadComponent: ()=> import('./pages/login/login.component')},
    {path:'register', loadComponent: ()=> import('./pages/register/register.component')},
    {path:'forget-password', loadComponent: ()=> import('./pages/forget-password/forget-password.component')},
    {path:'reset/:token', loadComponent: ()=> import('./pages/reset/reset.component')},
    
    {path:'home', loadComponent: ()=> import('./pages/home/home.component')},

    {path:'chat', loadComponent: ()=> import('./pages/chat/chat.component')},

    {path:'manage-invite', loadComponent: ()=> import('./pages/manage-invite/manage-invite.component')},

    {path:'manage-profile', loadComponent: ()=> import('./pages/manage-profile/manage-profile.component')},
    {path:'create-profile', loadComponent: ()=> import('./pages/create-profile/create-profile.component')},
    {path:'edit-profile', loadComponent: ()=> import('./pages/edit-profile/edit-profile.component')},

    {path:'manage-project', loadComponent: ()=> import('./pages/manage-project/manage-project.component')},
    {path:'create-project', loadComponent: ()=> import('./pages/create-project/create-project.component')},
    {path:'edit-project/:id', loadComponent: () => import('./pages/edit-project/edit-project.component')},
    {path:'review/:projectId/:id', loadComponent: ()=> import('./pages/review/review.component')},

    {path:'manage-proposal', loadComponent: ()=> import('./pages/manage-proposal/manage-proposal.component')},
    {path:'create-proposal/:id', loadComponent: ()=> import('./pages/create-proposal/create-proposal.component')},
    {path:'edit-proposal/:id', loadComponent: () => import('./pages/edit-proposal/edit-proposal.component')},

    {path:'freelancer-profile/:id', loadComponent: ()=> import('./pages/freelancer-profile/freelancer-profile.component')},
];
