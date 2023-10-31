import { Quiz } from './quiz';
import { User } from './user';

export interface Result {
  id: number;
  score: number;
  quiz: Quiz;
  user?: User;
  created_at: string;
  updated_at: string;
}
