import { IUser } from "./IUser";
import { TimestampedModel } from "./TimestampedModel";

export interface IAuthUser extends TimestampedModel {
  username: string;
  email: string;
  roles: string[];
}
export interface ILoginProps {
  email: string;
  password: string;
}
export interface IRegisterProps {
  username: "";
  email: string;
  password: string;
  password_confirmation: string;
}
export interface IForgotPasswordProps {
  email: string;
}
export interface IForgotPasswordConfirmProps {
  password: string;
  token?: string;
}
export interface IChangePasswordProps {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
}
export interface IUserData extends IUser {
  profile_picture?: string;
  isStudent: boolean;
  roles: string[];
}
export interface IStudentData extends TimestampedModel {
  current_group: {
    id: number;
    title: string;
  };
}
export interface IUpdateProfileProps {
  username: string;
  email: string;
  profile_picture?: any;
}
