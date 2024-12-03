import { User } from './../../../../core/models/user';
import { TimestampedModel } from './../../../../core/models/timestamped-model';
import { ISubject } from '../subject/subject';
export interface SubjectGroup extends TimestampedModel {
  title: string;
  subject: ISubject;
}
export interface Student extends TimestampedModel {
  user: User;
  subject_group: SubjectGroup;
}
