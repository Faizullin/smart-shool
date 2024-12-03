import { TimestampedModel } from 'src/app/core/models/timestamped-model';
import { Student } from '../student/student';
import { Result } from '../result/result';
import { Exam } from '../exam/exam';
import { FileContent } from 'src/app/core/models/file-content';

type status = 'pending' | 'dev' | 'rated';

export const STATUS_CHOICES: Record<status, string> = {
  pending: 'Pending',
  dev: 'Development',
  rated: 'Rated',
};

export interface ProjectWork extends TimestampedModel {
  student: Student;
  title: string;
  result: Result;
  files?: FileContent[];
  status: status;
  submit_exam: Exam;
}
