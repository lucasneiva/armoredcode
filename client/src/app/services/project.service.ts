import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  http = inject(HttpClient);
  isDraft$ = new BehaviorSubject<boolean>(false);
  isPosted$ = new BehaviorSubject<boolean>(false);
  
  /*
  createProjectService(projectObj: any){
    return this.http.post<any>(`${apiUrls.projectServiceApi}`, projectObj);
  }
  */
  createProjectService(projectObj: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.post<any>(`${apiUrls.projectServiceApi}`, projectObj, httpOptions);
  }
  
/*
//isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn(){
    return !!localStorage.getItem("user_id");
  }
*/
}
export type Project = {
  
projectTitle: String,
projectDescription: String,
estimatedDuration: Number,
projectSize: String,
projectStatus: String,
experienceLevel: String,
workModel: String,
startDate: Date,
endDate: Date,

}