import { User } from '../../../../core/models/user';
import { TimestampedModel } from '../../../../core/models/timestamped-model';
import { Student } from '../student/student';
import { FileContent } from 'src/app/core/models/article';
import { ISubject } from '../subject/subject';

export interface Certificate extends TimestampedModel {
  student: Student;
  subject: ISubject;
  image?: FileContent
}
