import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, Observable } from 'rxjs';

interface Specialization {
    _id: string; // Assuming your Skill model has an _id field
    specializationName: string;
  }

@Injectable({
    providedIn: 'root'
})
export class SpecializationService {
    http = inject(HttpClient);

    getSpecializations(): Observable<Specialization[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            withCredentials: true
        };
        return this.http.get<Specialization[]>(`${apiUrls.specializationServiceApi}`, httpOptions);
    }
}