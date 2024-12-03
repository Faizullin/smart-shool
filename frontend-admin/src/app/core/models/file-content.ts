import { TimestampedModel } from './timestamped-model';

export interface FileContent extends TimestampedModel {
  id: number;
  name: string;
  extension: string;
  url: string;
  size: number;
}
