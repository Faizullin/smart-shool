import { TimestampedModel } from "./TimestampedModel";

export interface ISubquestion {
  id: number;
  prompt: string;
  source_question_id: number;
}
export interface IQuiz extends TimestampedModel {
  questions: IQuestion[];
  showCrrectAnswers?: boolean;
}
export interface IQuestion extends TimestampedModel {
  choices: IAnswer[];
  prompt: string;
  selectedValue: string;
  question_type?: "c" | "o" | "d";
  subquestions?: ISubquestion[];
}
export interface IAnswer extends TimestampedModel {
  content: string;
  question: string;
  correct: boolean;
}
