import { IUser } from "./IUser";
import { IUserConnected } from "./IWSConnectionData";
import { TimestampedModel } from "./TimestampedModel";

export interface IConferenceRoom extends TimestampedModel {
  title: string;
  type: string;
}

export interface IConference extends TimestampedModel {
  room: IConferenceRoom;
  title: string;
  users: IUser[];
  admin: IUser;
  description: string;
  status: "planned" | "ongoing" | "completed";
}

export interface IConferenceChatMessage {
  content: string;
  author: IUserConnected;
}
