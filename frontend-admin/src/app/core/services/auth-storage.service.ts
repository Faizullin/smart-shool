import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';
const USER_KEY = 'USER';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  constructor() {}

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public clean(): void {
    window.sessionStorage.clear();
  }

  public saveAccessToken(token: string): void {
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
  public getAccessToken(): string | null {
    return window.sessionStorage.getItem(ACCESS_TOKEN_KEY) !== null
      ? window.sessionStorage.getItem(ACCESS_TOKEN_KEY)
      : null;
  }
  public getUserFromJwtKey(token?: string): string | null {
    const jwtToken = token ? token : this.getAccessToken();
    const decodedToken: any =
      jwtToken != null ? jwtDecode(jwtToken as string) : null;
    return decodedToken;
    const userId = decodedToken != null ? decodedToken?.sub : null;
    return userId;
  }
}
