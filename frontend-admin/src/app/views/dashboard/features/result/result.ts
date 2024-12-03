import { TimestampedModel } from 'src/app/core/models/timestamped-model';
import { Exam } from '../exam/exam';
import { Student } from '../student/student';
import { Feedback } from '../feedback/feedback';

export interface Result extends TimestampedModel {
  id: number;
  practical_score: number;
  theory_score: number;
  total_score: number;
  exam?: Exam;
  checked: boolean;
  attendance: boolean;
  student?: Student;
  feedback?: Feedback;
}
