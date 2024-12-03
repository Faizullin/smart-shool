import { TimestampedModel } from './../../../../core/models/timestamped-model';

export interface User extends TimestampedModel {
  username: string;
  email: string;
}
