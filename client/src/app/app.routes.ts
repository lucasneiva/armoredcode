import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'login', loadComponent: ()=> import('./pages/login/login.component')},
    {path:'register', loadComponent: ()=> import('./pages/register/register.component')},
    {path:'forget-password', loadComponent: ()=> import('./pages/forget-password/forget-password.component')},
    {path:'reset/:token', loadComponent: ()=> import('./pages/reset/reset.component')},
    {path:'home', loadComponent: ()=> import('./pages/home/home.component')},
    {path:'manage-profile', loadComponent: ()=> import('./pages/manage-profile/manage-profile.component')},
    {path:'create-profile', loadComponent: ()=> import('./pages/create-profile/create-profile.component')},
    {path:'edit-profile', loadComponent: ()=> import('./pages/edit-profile/edit-profile.component')},
    {path:'manage-project', loadComponent: ()=> import('./pages/manage-project/manage-project.component')},
    {path:'create-project', loadComponent: ()=> import('./pages/create-project/create-project.component')},
    {path:'edit-project', loadComponent: ()=> import('./pages/edit-project/edit-project.component')},
    
    {path:'freelancer-profile', loadComponent: ()=> import('./pages/freelancer-profile/freelancer-profile.component')},
];
