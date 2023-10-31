import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Question, Quiz } from './../models/quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getQuizes(filters?: any) {
    return this.http
      .get<any>(`/api/s/quizzes/`, {
        params: {
          ...filters,
        },
      })
      .pipe(
        map((data: any) => {
          const quizes_data = data.results || [];
          const total_items = data.count || 0;
          return {
            results: quizes_data.map(function (quizes: any): Quiz {
              return {
                ...quizes,
              } as Quiz;
            }),
            count: total_items,
          };
        }),
      );
  }
  getQuestions(id: number, filters?: any) {
    return this.http
      .get<any>(`/api/s/quizzes/${id}/questions/`, {
        params: {
          ...filters,
        },
      })
      .pipe(
        map((data: any) => {
          const quize_questions_data = data.results || [];
          const total_items = data.count || 0;
          return {
            results: quize_questions_data.map(function (
              question: any,
            ): Question {
              return {
                ...question,
              } as Question;
            }),
            count: total_items,
          };
        }),
      );
  }
  getQuiz(id: number) {
    return this.http.get<any>(`/api/s/quizzes/${id}`).pipe(
      map((data: any) => {
        return {
          ...data,
        } as Quiz;
      }),
    );
  }

  createQuiz(data: any) {
    return this.http.post<any>(`/api/s/quizzes/`, data).pipe(
      map((data: any) => {
        return {
          ...data,
        } as Quiz;
      }),
    );
  }
  updateQuiz(id: number, data: any) {
    return this.http.patch<any>(`/api/s/quizzes/${id}/`, data).pipe(
      map((data: any) => {
        return {
          ...data,
        } as Quiz;
      }),
    );
  }
  addQuestion(id: number, data: any) {
    return this.http.post<any>(`/api/s/quizzes/${id}/questions/`, data).pipe(
      map((data: any) => {
        return {
          ...data,
        } as Quiz;
      }),
    );
  }
  deleteQuestion(quiz_id: number, id: number) {
    return this.http.delete<any>(`/api/s/quizzes/${quiz_id}/questions/${id}/`);
  }
  getQuestion(quiz_id: number, id: number) {
    return this.http.get<any>(`/api/s/quizzes/${quiz_id}/questions/${id}/`).pipe(
      map((data: any) => {
        return {
          ...data,
        } as Question;
      }),
    );
  }
  updateQuestion(quiz_id: number, id: number, data: any) {
    return this.http
      .patch<any>(`/api/s/quizzes/${quiz_id}/questions/${id}/`, data)
      .pipe(
        map((data: any) => {
          return {
            ...data,
          } as Quiz;
        }),
      );
  }
}
