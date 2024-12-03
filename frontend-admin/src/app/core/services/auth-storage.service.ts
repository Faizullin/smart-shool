import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { User } from '../models/user';

interface IAuthStorageConstantData {
  user?: string;
  is_authenticated?: string;
  expires_at?: string;
  access_token?: string;
  refresh_token?: string;
}
export const AuthStorageConstantKeys: IAuthStorageConstantData = {
  user: 'user',
  is_authenticated: 'is_authenticated',
  expires_at: 'expires_at',
  access_token: 'access_token',
  refresh_token: 'refresh_token',
};

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  constructor() {}

  public saveUser(user: any): void {
    // localStorage.removeItem(AuthStorageConstantKeys.user!);
    localStorage.setItem(AuthStorageConstantKeys.user!, JSON.stringify(user));
  }

  public getUser(): User | null {
    const user = localStorage.getItem(AuthStorageConstantKeys.user!);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public clean(): void {
    Object.values(AuthStorageConstantKeys).forEach((key) => {
      localStorage.removeItem(key);
    });
  }

  public saveAccessToken(token: string): void {
    // localStorage.removeItem(AuthStorageConstantKeys.access_token!);
    localStorage.setItem(AuthStorageConstantKeys.access_token!, token);
  }
  public getAccessToken(): string | null {
    return localStorage.getItem(AuthStorageConstantKeys.access_token!) !== null
      ? localStorage.getItem(AuthStorageConstantKeys.access_token!)
      : null;
  }
}
