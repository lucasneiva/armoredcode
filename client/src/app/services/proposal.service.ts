import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  http = inject(HttpClient);

  createProposal(proposalObj: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.post<any>(`${apiUrls.proposalServiceApi}`, proposalObj, httpOptions);
  }

  updateProposal(proposalId: string, proposalObj: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.patch<any>(`${apiUrls.proposalServiceApi}/${proposalId}`, proposalObj, httpOptions);
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

  getProposalById(proposalId: string | null): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.get<any>(`${apiUrls.proposalServiceApi}/${proposalId}`, httpOptions).pipe(
      tap(response => console.log('API response:', response))  // Log API response
    );
  }
}
// Define a clear interface for your API response
export type ProposalResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    proposal: Proposal | null;
  };
}

export type ProposalData = {
    proposal: Proposal | null;
}

export type Proposal = {

}