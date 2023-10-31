import { User } from './../../../../core/models/user';
import { TimestampedModel } from './../../../../core/models/timestamped-model';
export interface Subject extends TimestampedModel {
  title: string;
}
export interface SubjectGroup extends TimestampedModel {
  title: string;
  subject: Subject;
}
export interface Student extends TimestampedModel {
  user: User;
  subject_group: SubjectGroup;
}
