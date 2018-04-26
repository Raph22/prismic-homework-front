import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Repository } from '../models/Repository';
import { Contributor } from '../models/Contributor';
import { UserImpact } from '../models/UserImpact';
import { Commit } from '../models/Commit';


const BASE_URL_API = 'http://localhost:9000/api';
const URL_API_SEARCH_REPO = '/search';
const URL_SUFFIX_API_LIST_CONTRIBUTORS = '/contributors';
const URL_SUFFIX_API_LIST_COMMITS = '/commits';
const URL_SUFFIX_API_USERS_IMPACT = '/usersimpact';


@Injectable()
export class GitService {

  search(searchTerm: String): Observable<HttpResponse<Repository[]>> {
    const urlRequest = BASE_URL_API + URL_API_SEARCH_REPO + '/' + searchTerm;
    return this.http.get<Repository[]>(urlRequest, { observe: 'response' });
  }


  getContributors(repository: Repository): Observable<HttpResponse<Contributor[]>> {
    const urlRequest = BASE_URL_API + this.buildUrlApiListContributors(repository.owner, repository.name);
    return this.http.get<Contributor[]>(urlRequest, { observe: 'response' });
  }

  getLatestCommit(repository: Repository): Observable<HttpResponse<Commit[]>> {
    const urlRequest = BASE_URL_API + this.buildUrlApiListCommits(repository.owner, repository.name);
    return this.http.get<Commit[]>(urlRequest, { observe: 'response' });
  }

  getUsersImpact(repository: Repository): Observable<HttpResponse<UserImpact[]>> {
    const urlRequest = BASE_URL_API + this.buildUrlApiUsersImpact(repository.owner, repository.name);
    return this.http.get<UserImpact[]>(urlRequest, { observe: 'response' });
  }

  private buildUrlApiListContributors(owner: String, repository: String) {
    return '/' + owner + '/' + repository + URL_SUFFIX_API_LIST_CONTRIBUTORS;
  }

  private buildUrlApiListCommits(owner: String, repository: String) {
    return '/' + owner + '/' + repository + URL_SUFFIX_API_LIST_COMMITS;
  }

  private buildUrlApiUsersImpact(owner: String, repository: String) {
    return '/' + owner + '/' + repository + URL_SUFFIX_API_USERS_IMPACT;
  }

  constructor(private http: HttpClient) { }
}
