import { TimestampedModel } from './../../../../core/models/timestamped-model';
import { Subject } from './../student/student';

export interface Exam extends TimestampedModel {
  exam_type: 'i' | 'm' | 'f';
  subject: Subject;
}
