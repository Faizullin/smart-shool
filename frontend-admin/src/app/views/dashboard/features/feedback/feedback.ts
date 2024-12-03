import { TimestampedModel } from './../../../../core/models/timestamped-model';

export interface Feedback extends TimestampedModel {
  result: any;
  content: string;
}
