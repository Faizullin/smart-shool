import { ISubject } from 'src/app/views/dashboard/features/subject/subject';
import { TimestampedModel } from './timestamped-model';

export interface Exam extends TimestampedModel {
  exam_type: 'i' | 'm' | 'f';
  subject: ISubject;
}

export interface Answer extends TimestampedModel {
  content: string;
  correct: boolean;
}

export interface Question extends TimestampedModel {
  prompt: string;
  answers: Answer[];
  answers_count?: number;
}

export interface Quiz extends TimestampedModel {
  title: string;
  duration_time: number;
  questions_count: number;
  exam?: Exam;
  questions?: Array<Question>;
}
