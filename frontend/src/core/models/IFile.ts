import { TimestampedModel } from "./TimestampedModel";

export interface IFile extends TimestampedModel {
  name: string;
  extension: string;
  file: string;
  url?: string;
}
