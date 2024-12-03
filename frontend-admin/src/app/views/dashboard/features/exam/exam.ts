import { ISubject } from '../subject/subject';
import { TimestampedModel } from './../../../../core/models/timestamped-model';

export interface Exam extends TimestampedModel {
  exam_type: 'i' | 'm' | 'f';
  subject: ISubject;
}
