import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);
  authService = inject(AuthService);  // Inject it
  hasProfile$ = new BehaviorSubject<boolean>(false);

  createProfile(profileData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };

    const userRole = this.authService.getUserRole();
    if (!userRole) {
      // Handle the case where the user role is not found (maybe redirect to login)
      console.error("User role not found!");
      return throwError(() => new Error("User role not found!"));
    }

    // Include the role in the profileData
    const dataToSend = { ...profileData, role: userRole };

    return this.http.post<any>(`${apiUrls.profileServiceApi}`, dataToSend, httpOptions)
      .pipe(
        tap((res) => {
          console.log('Profile created:', res);
          this.hasProfile$.next(true);
        }),
        catchError((error) => {
          console.error('Error creating profile:', error);
          throw error;
        })
      );
  }
  
  getProfile(userId: string | null): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    return this.http.get<ProfileResponse>(`${apiUrls.profileServiceApi}/${userId}`, httpOptions)
    /*
    .pipe(
      tap((res) => {
        console.log('Profile fetched:', res);
      }),
      catchError((error) => {
        console.error('Error fetching profile:', error);
        throw error;
      })
    );
    */
  }

}

// Define a clear interface for your API response (ProfileResponse)
export type ProfileResponse = {
  success: boolean;
  status: number;
  message: string; 
  data: {
    hasProfile: boolean;
    profile: Profile | null; 
  };
}

export type ProfileData = { // Use an interface for type safety
  hasProfile: boolean;
  profile: Profile | null;
}

export type Profile = {
  _id?: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;

  // Common fields (present in both profiles)
  location?: {
    city: string,
    country: string
  };

  // Client-specific fields
  companyName?: string;
  companyDescription?: string;
  companySize?: 'SMALL' | 'MEDIUM' | 'LARGE';
  logo?: string;
  industryId?: string;
  website?: string;

  // Freelancer-specific fields
  firstName?: string;
  lastName?: string;
  specializationId?: {
    _id: string;
    name: string; // Assuming you also fetch specialization name
  };
  profileSummary?: string;
  experienceLevel?: 'JUNIOR' | 'MID-LEVEL' | 'SENIOR';
  hourlyRate?: {
    min: number;
    max: number;
    currency: string;
  };
  isAvailable?: boolean;
  skillIds?: Array<{
    _id: string;
    name: string; // Assuming you also fetch skill names
  }>;
  portfolioItems?: Array<{
    title: string;
    description?: string;
    url: string;
  }>;
  educations?: Array<{
    degreeName: string;
    fieldOfStudy: string;
    institution: string;
    startDate: Date;
    endDate?: Date;
  }>;
  certifications?: Array<{
    name: string;
    issuingOrganization: string;
    issueDate: Date;
  }>;
  workExperiences?: Array<{
    companyName: string;
    jobTitle: string;
    startDate: Date;
    endDate?: Date;
    jobDescription?: string;
  }>;
}
