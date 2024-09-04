import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  http = inject(HttpClient);
  isDraft$ = new BehaviorSubject<boolean>(false);
  isPosted$ = new BehaviorSubject<boolean>(false);

  createProjectService(projectObj: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.post<any>(`${apiUrls.projectServiceApi}`, projectObj, httpOptions);
  }

  getProjectCategories(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    return this.http.get<any>(`${apiUrls.projectCategoryApi}`, httpOptions);
  }

  getProjects() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    return this.http.get<any>(`${apiUrls.projectServiceApi}user`, httpOptions);
  }

}

// Type for Location (replace with your actual locationModel structure)
type Location = {
  streetAddress?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  cep?: string;
  country?: string;
};

// Type for Project (using union types for optional properties)
export type Project =
  {
    _id: string; // Assuming your API returns the MongoDB _id 
    clientId: string;
    projectCategoryId: string;
    skillIds: string[];
    projectTitle: string;
    projectDescription: string;
    pricingType: "BUDGET" | "HOURLY_RATE";
    estimatedDuration: number;
    workModel: "REMOTE" | "HYBRID" | "ON-SITE";
  } & ( // Properties that can be undefined 
    { freelancerId: string; } | { freelancerId: undefined }
  ) & (
    { projectHourlyRate: { min: number; max: number; currency: string; }; } | { projectHourlyRate: undefined }
  ) & (
    { projectBudget: { min: number; max: number; currency: string; }; } | { projectBudget: undefined }
  ) & (
    { projectSize: "SMALL" | "MEDIUM" | "LARGE"; } | { projectSize: undefined }
  ) & (
    { projectStatus: "DRAFT" | "POSTED"; } | { projectStatus: undefined }
  ) & (
    { experienceLevel: "ENTRY-LEVEL" | "MID-LEVEL" | "SENIOR"; } | { experienceLevel: undefined }
  ) & (
    { location: Location; } | { location: undefined }
  ) & (
    { startDate: Date; } | { startDate: undefined }
  ) & (
    { endDate: Date; } | { endDate: undefined }
  );