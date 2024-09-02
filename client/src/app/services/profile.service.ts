import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);
  hasProfile$ = new BehaviorSubject<boolean>(false);
  
  CreateClientProfile(cli_profileObj: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.post<any>(`${apiUrls.profileServiceApi}`, cli_profileObj, httpOptions);
  }

  CreateFreelancerProfile(fre_profileObj: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  // VERY IMPORTANT: Include cookies in requests
    };
    return this.http.post<any>(`${apiUrls.profileServiceApi}`, fre_profileObj, httpOptions);
  }
  
  getProfile(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true 
    };
    return this.http.get<any>(`${apiUrls.profileServiceApi}`, httpOptions);
  }
  /*
  // Function to check for profile (we'll implement this shortly)
  hasProfile(): Observable<boolean> { 
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      return of(false); // User is not logged in
    }
    
    return this.http.get<any>(`${apiUrls.profileServiceApi}/${userId}`)
      .pipe(
        map(response => {
          // Assuming your backend sends 'hasProfile' flag as explained before
          return response.hasProfile; 
        }),
        catchError(error => {
          console.error('Error checking profile:', error);
          return of(false); // Assume no profile in case of error
        })
      );
  }
  */
}
export type Profile = {
  
  

}