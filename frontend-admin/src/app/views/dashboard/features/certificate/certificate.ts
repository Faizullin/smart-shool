import { User } from '../../../../core/models/user';
import { TimestampedModel } from '../../../../core/models/timestamped-model';
import { Student, Subject } from '../student/student';
import { FileContent } from 'src/app/core/models/article';

export interface Certificate extends TimestampedModel {
  student: Student;
  subject: Subject;
  image?: FileContent
}
