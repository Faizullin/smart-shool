import { User } from './user';
import { Answer, Question } from './quiz';

export interface UserAnswer {
  id: number;
  content: string;
  score: number;
  user: User;
  question: Question;
  selected_answer?: Answer;
  checked: boolean;
}
