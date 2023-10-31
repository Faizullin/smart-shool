import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthStorageService } from './../services/auth-storage.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Constants } from './../../constants/Constants';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  private baseApiUrl: string = '/';
  constructor(
    private authStorageService: AuthStorageService,
    private authService: AuthService,
    private router: Router,
  ) {
    const baseTag = document.querySelector('base');
    this.baseApiUrl =
      baseTag && baseTag.dataset['apiUrl']
        ? baseTag.dataset['apiUrl']
        : this.baseApiUrl;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const req_data: any = {
      url: `${this.baseApiUrl}${request.url}`,
      withCredentials: true,
    };
    const access_token = this.authStorageService.getAccessToken();
    if (access_token != null) {
      req_data['headers'] = request.headers.set(
        TOKEN_HEADER_KEY,
        'Bearer ' + access_token,
      );
    }
    const authReq = request.clone(req_data);
    return next.handle(authReq).pipe(
      tap((event) => {
        // Check if it's a successful response
        if (event instanceof HttpResponse) {
          // Add any additional logic you need here for successful responses
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Check for 401 (Unauthorized) error
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate([Constants.LOGIN_ROUTE]);
        }
        return throwError(error);
      }),
    );
  }
}
