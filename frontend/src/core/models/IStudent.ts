import { IUser } from "./IUser";
import { TimestampedModel } from "./TimestampedModel";

export interface IStudent extends TimestampedModel {
  first_name: string;
  last_name: string;
  current_status: "v" | string;
  gender: string;
  current_group: string;
  address: string;
  parent_mobile_number: string;
  date_of_birth?: string;
  others?: string;
  user?: IUser;

  hasInitial: boolean;
  hasFaceId: boolean;
  expiresAt?: Date;
}

export interface IUpdateStudentProps extends TimestampedModel {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  address: string;
  parent_mobile_number: string;
  others?: string;
}
