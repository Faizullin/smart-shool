import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Result } from './../models/result';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  constructor(private http: HttpClient) {}

  getResults(filters?: any) {
    return this.http
      .get<any>(`/api/s/results/`, {
        params: {
          ...filters,
        },
      })
      .pipe(
        map((data: any) => {
          const results_data = data.results || [];
          const total_items = data.count || 0;
          return {
            results: results_data.map(function (resultes: any): Result {
              return {
                ...resultes,
              } as Result;
            }),
            count: total_items,
          };
        }),
      );
  }
  getResult(id: number) {
    return this.http.get<any>(`/api/s/results/${id}`).pipe(
      map((data: any) => {
        return {
          ...data,
        } as Result;
      }),
    );
  }
}
