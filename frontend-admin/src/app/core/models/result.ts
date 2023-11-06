import { Student } from 'src/app/views/dashboard/features/student/student';
import { Exam, Quiz } from './quiz';
import { TimestampedModel } from './timestamped-model';

export interface Result extends TimestampedModel {
  id: number;
  practical_score: number;
  theory_score: number;
  total_score: number;
  exam?: Exam;
  checked: boolean;
  student?: Student;
}
