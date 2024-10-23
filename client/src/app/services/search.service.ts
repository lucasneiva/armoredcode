import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from './profile.service';
import { Project } from './project.service';
import { apiUrls } from '../api.urls';

@Injectable({
    providedIn: 'root'
})
export class SearchStateService {
    private isSearchBarVisible = new BehaviorSubject<boolean>(false);
    isSearchBarVisible$ = this.isSearchBarVisible.asObservable();

    toggleSearchBarVisibility() {
        this.isSearchBarVisible.next(!this.isSearchBarVisible.value);
    }

    hideSearchBar() {
        this.isSearchBarVisible.next(false);
    }

    private searchTerm = new BehaviorSubject<string>('');
    searchTerm$ = this.searchTerm.asObservable();

    setSearchTerm(term: string) {
        this.searchTerm.next(term);
    }
}
export class SearchService {
    http = inject(HttpClient);

    searchFreelancers(searchTerm?: string, skillIds?: string[], experienceLevel?: string, specializationId?: string): Observable<any> {
        let params = new HttpParams();
        if (searchTerm) {
            params = params.append('q', searchTerm);
        }
        if (skillIds && skillIds.length > 0) {
            skillIds.forEach(skillId => {
                params = params.append('skillIds[]', skillId); // Append [] for each skillId
            });
        }
        if (experienceLevel) {
            params = params.append('experienceLevel', experienceLevel);
        }
        if (specializationId) {
            params = params.append('specializationId', specializationId);
        }

        const requestUrl = `${apiUrls.searchServiceApi}/freelancers?${params.toString()}`;
        console.log("Freelancer Search Request URL:", requestUrl); // Log the URL

        return this.http.get<Profile[]>(requestUrl);
    }

    searchProjects(searchTerm?: string, categoryId?: string, skillIds?: string[]): Observable<any> {
        let params = new HttpParams();
        if (searchTerm) {
            params = params.append('q', searchTerm);
        }
        if (categoryId) {
            params = params.append('category', categoryId);
        }
        if (skillIds && skillIds.length > 0) {
            skillIds.forEach(skillId => {
                params = params.append('skillIds[]', skillId); // Append [] for each skillId
            });
        }

        const requestUrl = `${apiUrls.searchServiceApi}/projects?${params.toString()}`;
        console.log("Project Search Request URL:", requestUrl); // Log the URL
    
        return this.http.get<Project[]>(requestUrl);
    }
}