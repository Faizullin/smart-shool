import { User } from '../user/user';
import { TimestampedModel } from './../../../../core/models/timestamped-model';

export interface Notification extends TimestampedModel {
  verb: string;
  description: string;
  recipient: User;
  level: string;
}
