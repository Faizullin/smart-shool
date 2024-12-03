import { TimestampedModel } from 'src/app/core/models/timestamped-model';
import { Student } from '../student/student';
import { ISubject } from '../subject/subject';
import { FileContent } from 'src/app/core/models/file-content';

export interface Certificate extends TimestampedModel {
  student: Student;
  subject: ISubject;
  image?: FileContent;
}
