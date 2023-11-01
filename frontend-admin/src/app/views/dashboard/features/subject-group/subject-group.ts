import { TimestampedModel } from './../../../../core/models/timestamped-model';
import { ISubject } from '../subject/subject';

export interface ISubjectGroup extends TimestampedModel {
  title: string;
  subject: ISubject;
}
