import { IUser } from "./IUser"

export interface IAuthUser {
    username: string,
    email: string,
    id: string,
    isStudent: boolean,
    isAuthenticated: boolean,
}
export interface ILoginProps {
    email: string,
    password: string,
}
export interface IRegisterProps {
    username: '',
    email: string,
    password: string,
    password_confirmation: string,
}
export interface IForgotPasswordProps {
    email: string 
}
export interface IForgotPasswordConfirmProps {
    password: string,
    token?: string,
}
export interface IChangePasswordProps {
    old_password: string,
    new_password: string,
    new_password_confirmation: string,
}
export interface IUserData extends IUser {
    created_at: string,
    updated_at: string,
    profile_picture?: string,
    isStudent: boolean,
}
export interface IUpdateProfileProps {
    username: string,
    email: string,
    profile_picture?: any,
}