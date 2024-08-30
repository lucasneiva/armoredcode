import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  http = inject(HttpClient);
  
  createSkillService(skillObj: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.post<any>(`${apiUrls.skillServiceApi}`, skillObj, httpOptions);
  }
  
  getSkills(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true 
    };
    return this.http.get<any>(`${apiUrls.skillServiceApi}`, httpOptions);
  }
  
}
export type Skill = {
  
    _id: string,
    skillName: string,
    description: string,
    
}