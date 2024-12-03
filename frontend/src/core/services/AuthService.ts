import $api from "../http";
import { AxiosResponse } from 'axios'
import { AuthResponse } from "../models/response/IAuthResponse";
import { ILoginProps, IRegisterProps } from "./UserService";
import { IForgotPasswordConfirmProps, IForgotPasswordProps } from "../models/IAuthUser";

export default class AuthService{
    static async login(data:ILoginProps): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login/',{...data})
    }
    static async register(data:IRegisterProps): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/register/',{...data})
    }
    static async logout(): Promise<AxiosResponse<any>> {
        return $api.post('/logout/')
    }
    static async forgotUserPassword(data: IForgotPasswordProps): Promise<AxiosResponse<any>> {
        return $api.post<AuthResponse>('/password_reset/',{...data})
    }
    static async forgotUserPasswordConfirm(data: IForgotPasswordConfirmProps): Promise<AxiosResponse<any>> {
        return $api.post<AuthResponse>('/password_reset/confirm/',{...data})
    }
}