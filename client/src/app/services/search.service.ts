import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from './profile.service';
import { Project } from './project.service';
import { apiUrls } from '../api.urls';

@Injectable({
    providedIn: 'root'
})
export class SearchStateService{
    private isSearchBarVisible = new BehaviorSubject<boolean>(false);
  isSearchBarVisible$ = this.isSearchBarVisible.asObservable();

  toggleSearchBarVisibility() {
    this.isSearchBarVisible.next(!this.isSearchBarVisible.value);
  }
}
export class SearchService {
    http = inject(HttpClient);

    searchFreelancers(searchTerm?: string, skillIds?: string[], experienceLevel?: string, specializationId?: string): Observable<Profile[]> {
        let params = new HttpParams();
        if (searchTerm) {
            params = params.append('q', searchTerm);
        }
        if (skillIds && skillIds.length > 0) {
            params = params.append('skillIds', skillIds.join(','));
        }
        if (experienceLevel) {
            params = params.append('experienceLevel', experienceLevel);
        }
        if (specializationId) {
            params = params.append('specializationId', specializationId);
        }

        return this.http.get<Profile[]>(`${apiUrls.searchServiceApi}/search/freelancers`, { params });
    }

    searchProjects(searchTerm?: string, categoryId?: string, skillIds?: string[]): Observable<Project[]> {
        let params = new HttpParams();
        if (searchTerm) {
            params = params.append('q', searchTerm);
        }
        if (categoryId) {
            params = params.append('category', categoryId);
        }
        if (skillIds && skillIds.length > 0) {
            params = params.append('skillIds', skillIds.join(','));
        }

        return this.http.get<Project[]>(`${apiUrls.searchServiceApi}/search/projects`, { params });
    }
}