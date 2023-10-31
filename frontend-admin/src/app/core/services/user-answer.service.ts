import { Injectable } from '@angular/core';
import { UserAnswer } from 'src/app/core/models/user-answer';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserAnswerService {
  constructor(private http: HttpClient) {}

  getUserAnswers(filters?: any) {
    return this.http
      .get<any>(`/api/s/user_answers/`, {
        params: {
          ...filters,
        },
      })
      .pipe(
        map((data: any) => {
          const user_answers_data = data.results || [];
          const total_items = data.count || 0;
          return {
            results: user_answers_data.map(function (
              user_answeres: any,
            ): UserAnswer {
              return {
                ...user_answeres,
              } as UserAnswer;
            }),
            count: total_items,
          };
        }),
      );
  }
  getUserAnswer(id: number) {
    return this.http.get<any>(`/api/s/user_answers/${id}`).pipe(
      map((data: any) => {
        return {
          ...data,
        } as UserAnswer;
      }),
    );
  }
  updateUserAnswer(id: number, data: any) {
    return this.http
      .patch<any>(`/api/s/user_answers/${id}/`, {
        ...data,
      })
      .pipe(
        map((data: any) => {
          return {
            ...data,
          } as UserAnswer;
        }),
      );
  }
}
