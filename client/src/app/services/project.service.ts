import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  http = inject(HttpClient);
  isDraft$ = new BehaviorSubject<boolean>(false);
  isPosted$ = new BehaviorSubject<boolean>(false);
  
  createProjectService(projectObj: any){
    return this.http.post<any>(`${apiUrls.projectServiceApi}createProject`, projectObj);
  }
  
/*
//isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn(){
    return !!localStorage.getItem("user_id");
  }
*/
}