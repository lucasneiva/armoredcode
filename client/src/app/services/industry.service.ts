import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {
  http = inject(HttpClient);
  
  createSkillService(IndustryObj: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.post<any>(`${apiUrls.industryServiceApi}`, IndustryObj, httpOptions);
  }
  
  getIndustries(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true 
    };
    return this.http.get<any>(`${apiUrls.industryServiceApi}`, httpOptions);
  }

  getIndustryById(industryId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  // Include cookies in requests
    };
    return this.http.get<any>(`${apiUrls.industryServiceApi}/${industryId}`, httpOptions);
  }
  
}
export type Industry = {
  
    _id: string,
    name: string,
    description: string,
    
}