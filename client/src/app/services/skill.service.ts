import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, Observable } from 'rxjs';

interface Skill {
    _id: string;
    skillName: string;
    // ... other properties of your Skill model if needed
}

@Injectable({
    providedIn: 'root'
})
export class SkillService {
    http = inject(HttpClient);

    getSkills(): Observable<Skill[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            withCredentials: true
        };
        return this.http.get<Skill[]>(`${apiUrls.skillServiceApi}`, httpOptions);
    }
}