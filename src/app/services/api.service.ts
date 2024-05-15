import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, tap, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private userCache: { [username: string]: any } = {};
  private reposCache: { [key: string]: any[] } = {};
  private userNotFoundError: string = '';

  constructor(private httpClient: HttpClient) {}

  getError(): string {
    return this.userNotFoundError;
  }
  setError(value: string): void {
    this.userNotFoundError = value;
  }

  getUser(githubUsername: string): Observable<any> {
    if (this.userCache[githubUsername]) {
      return of(this.userCache[githubUsername]);
    }

    return this.httpClient
      .get(`https://api.github.com/users/${githubUsername}`)
      .pipe(
        tap((user) => (this.userCache[githubUsername] = user)),
        catchError((error: any) => throwError(() => new Error(error)))
      );
  }

  getRepos(
    githubUsername: string,
    page: number = 1,
    perPage: number = 10
  ): Observable<any[]> {
    const cacheKey = `${githubUsername}|${page}|${perPage}`;
    if (this.reposCache[cacheKey]) {
      return of(this.reposCache[cacheKey]);
    }

    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.httpClient
      .get<any[]>(`https://api.github.com/users/${githubUsername}/repos`, {
        params,
      })
      .pipe(
        tap((repos) => (this.reposCache[cacheKey] = repos)),
        catchError((error: any) => throwError(() => new Error(error)))
      );
  }
}
