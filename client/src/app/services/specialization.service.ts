import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {
  http = inject(HttpClient);
  
  createSpecializations(specializationObj: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.post<any>(`${apiUrls.specializationServiceApi}`, specializationObj, httpOptions);
  }
  
  getSpecializations(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true 
    };
    return this.http.get<any>(`${apiUrls.specializationServiceApi}`, httpOptions);
  }
  
}
export type Specialization = {
  
    _id: string,
    specializationName: string,

}