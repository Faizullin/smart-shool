import { Document } from './document';

export interface Answer {
  id?: number;
  content: string;
  correct: boolean;
}

export interface Question {
  id?: number;
  prompt: string;
  answers: Answer[];
  answers_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Quiz {
  id: number;
  title: string;
  quiz_type: 'i' | 'm' | 'f';
  document_id: number;
  document: Document;
  duration_time: number;
  questions_count: number;
  questions?: Array<Question>;
  created_at: string;
  updated_at: string;
}
