import { TimestampedModel } from './../../../../core/models/timestamped-model';
import { ISubject } from '../subject/subject';
import { User } from '../user/user';

export interface ISubjectGroup extends TimestampedModel {
  title: string;
  subject: ISubject;
  teacher: User;
}
