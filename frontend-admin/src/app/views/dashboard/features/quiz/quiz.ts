import { TimestampedModel } from '../../../../core/models/timestamped-model';
import { Exam } from '../exam/exam';

export type IQuestionType = 'c' | 'o' | 'd';

export interface Answer extends TimestampedModel {
  content: string;
  correct: boolean;
}

export interface Question extends TimestampedModel {
  prompt: string;
  type: IQuestionType;
}

export interface SubQuestion extends Question {
  answers: Answer[];
}

export interface ClosedEndedQuestion extends Question {
  answers: Answer[];
  answers_count?: number;
}
export interface OpenEndedQuestion extends Question {
  answers: Answer[];
  answers_count?: number;
}

export interface DraggableQuestion extends TimestampedModel {
  prompt: string;
  subquestions: SubQuestion[];
}

export interface Quiz extends TimestampedModel {
  title: string;
  duration_time: number;
  questions_count: number;
  exam?: Exam;
  questions?: Array<Question>;
}
