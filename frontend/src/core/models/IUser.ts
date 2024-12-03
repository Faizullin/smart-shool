import { TimestampedModel } from "./TimestampedModel";

export interface IUser extends TimestampedModel {
    email: string,
    username: string,
}