import { Student } from 'src/app/views/dashboard/features/student/student';
import { Exam, Quiz } from './quiz';
import { User } from './user';

export interface Result {
  id: number;
  score: number;
  exam: Exam;
  student?: Student;
  total_score: number;
  created_at: string;
  updated_at: string;
}
