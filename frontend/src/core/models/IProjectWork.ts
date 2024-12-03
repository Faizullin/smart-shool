import { IConference } from "./IConference";
import { IDevice } from "./IDevice";
import { IFile } from "./IFile";
import { TimestampedModel } from "./TimestampedModel";

export interface IProjectWork extends TimestampedModel {
  device: IDevice;
  title: string;
  files: IFile[];
  status: "dev" | "rated" | "pending";
  conference?: IConference
}
