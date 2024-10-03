import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  http = inject(HttpClient);
  authService = inject(AuthService);
  isPending$ = new BehaviorSubject<boolean>(false);
  isAccepted$ = new BehaviorSubject<boolean>(false);
  isRejected$ = new BehaviorSubject<boolean>(false);

  createProposal(proposalObj: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.post<any>(`${apiUrls.proposalServiceApi}`, proposalObj, httpOptions);
  }

  getProposalById(proposalId: string | null): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.get<any>(`${apiUrls.proposalServiceApi}/${proposalId}`, httpOptions).pipe(
      //tap(response => console.log('API response:', response))  // Log API response
    );
  }

  getProposalsByProjectId(projectId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.get<any>(`${apiUrls.proposalServiceApi}/project/${projectId}`, httpOptions).pipe(
      //tap(response => console.log('API response:', response))  // Log API response
    );
  }

  getFreelancerProposals(): Observable<any> {
    const freelancerId = this.authService.getUserId(); // Get the logged-in freelancer's ID
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    return this.http.get<any>(`${apiUrls.proposalServiceApi}/freelancer/${freelancerId}`, httpOptions);
  }

  updateProposal(proposalId: string, proposalObj: any ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.put<any>(`${apiUrls.proposalServiceApi}/${proposalId}`, proposalObj, httpOptions);
  }

  deleteProposal(proposalId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true 
    };
    return this.http.delete<any>(`${apiUrls.proposalServiceApi}/${proposalId}`, httpOptions);
  }

  acceptProposal(proposalId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    return this.http.patch<any>(`${apiUrls.proposalServiceApi}/${proposalId}/accept`, {}, httpOptions);
  }

  rejectProposal(proposalId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    return this.http.patch<any>(`${apiUrls.proposalServiceApi}/${proposalId}/reject`, {}, httpOptions);
  }

}

// Define a clear interface for your API response
export type ProposalResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    isPending: boolean;
    isAccepted: boolean;
    isRejected: boolean;
    proposal: Proposal | null;
  };
}

export type ProposalData = {
  isPending: boolean;
  isAccepted: boolean;
  isRejected: boolean;
  proposal: Proposal | null;
}

// Type for Project (using union types for optional properties)
export type Proposal = {
  _id: string;
  projectId: string;
  freelancerId: string;
  clientId: string;
  coverLetter: string;
  pricingType: 'BUDGET' | 'HOURLY_RATE';
  proposedBudget?: number; // Optional if pricingType is 'HOURLY_RATE'
  proposedHourlyRate?: number; // Optional if pricingType is 'BUDGET'
  estimatedDuration: number;
  status: 'DRAFT' | 'PENDING' | 'ACCEPTED' | 'REJECTED';
  communicationChannelId?: string; // Optional
  createdAt: string;
  updatedAt: string;
}