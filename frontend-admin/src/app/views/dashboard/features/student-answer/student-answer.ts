import { Student } from '../student/student';
import { Answer, Question } from '../quiz/quiz';
import { Result } from '../result/result';
import { TimestampedModel } from 'src/app/core/models/timestamped-model';

export type IQuestionType = 'c' | 'o' | 'd';

export interface StudentAnswer extends TimestampedModel {
  score: number;
  // student: Student;
  question?: Question;
  result: Result;
  answer_choices?: Answer | null;
  answer_text?: string;
}
