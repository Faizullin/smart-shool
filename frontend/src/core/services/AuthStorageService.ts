import { jwtDecode } from "jwt-decode";

interface IAuthStorageConstantData {
  user?: string;
  is_authenticated?: string;
  expires_at?: string;
  access_token?: string;
  refresh_token?: string;
}

export const AuthStorageConstantKeys: IAuthStorageConstantData = {
  user: "user",
  is_authenticated: "is_authenticated",
  expires_at: "expires_at",
  access_token: "access_token",
  refresh_token: "refresh_token",
};

export default class AuthStorageService {
  public static clean(): void {
    Object.values(AuthStorageConstantKeys).forEach((key) => {
      localStorage.removeItem(key);
    });
  }
  public static decodeData(): void {}
  public static getStorageData(): Object {
    const data = {};
    Object.values(AuthStorageConstantKeys).forEach((key) => {
      data[key] = localStorage.getItem(key) || null;
    });
    return data;
  }
  public static setStorageData(data: IAuthStorageConstantData) {
    Object.keys(data).forEach((key) => {
      localStorage.setItem(key, data[key]);
    });
    return data;
  }
  public static isTokenExpired(token?: string): boolean {
    const expire_time =
      this.getJwtData(token)[AuthStorageConstantKeys.expires_at];
    return expire_time > Date.now();
  }
  public static getJwtData(token?: string): Object {
    token =
      token !== undefined
        ? token
        : this.getStorageData()[AuthStorageConstantKeys.expires_at];
    const data = {};
    const expires_at = jwtDecode(token);
    if (expires_at) {
      data["expires_at"] = expires_at.exp;
    }
    return data;
  }
  public static getCurrentAccessToken(): string {
    return this.getStorageData()[AuthStorageConstantKeys.access_token];
  }
}
