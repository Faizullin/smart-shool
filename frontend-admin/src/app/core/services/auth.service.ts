import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';
import { AuthStorageService } from './auth-storage.service';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private authStorageService: AuthStorageService,
    private router: Router,
  ) {
    const user = this.authStorageService.getUser();
    const access_token = this.authStorageService.getAccessToken();
    if (user && access_token) {
      this.isLoggedIn = true;
    } else if (!access_token) {
      this.isLoggedIn = false;
    } else {
      this.getUser().subscribe({
        next: () => {
          this.isLoggedIn = true;
        },
        error: () => {
          this.isLoggedIn = false;
        },
      });
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      '/api/v1/login/',
      {
        username: email,
        password,
      },
      httpOptions,
    );
  }

  getUser() {
    return this.http.get<any>('/api/v1/user/').pipe(
      map((data: any) => {
        return {
          id: data.id,
          username: data.username,
          email: data.email,
          roles: data.roles,
        } as User;
      }),
    );
  }

  logout() {
    this.authStorageService.clean();
    this.router.navigate(['/dashboard']).then(() => {
      window.location.reload();
    });
  }
}
