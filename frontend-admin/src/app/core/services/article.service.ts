import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Article } from './../models/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticles(filters?: any) {
    // UserFilters: UserFilters
    return this.http
      .get<any>(`/api/s/articles/`, {
        params: {
          ...filters,
        },
      })
      .pipe(
        map((data: any) => {
          const articles_data = data.results || [];
          const total_items = data.count || 0;
          return {
            results: articles_data.map(function (articles: any): Article {
              return {
                ...articles,
              } as Article;
            }),
            count: total_items,
          };
        }),
      );
  }
  getArticle(id: number) {
    return this.http.get<any>(`/api/s/articles/${id}/`).pipe(
      map((data: any) => {
        return {
          ...data,
        } as Article;
      }),
    );
  }
  createArticle(data: any) {
    return this.http.post<any>(`/api/s/articles/`, data).pipe(
      map((data: any) => {
        return {
          ...data,
        } as Article;
      }),
    );
  }
  updateArticle(id: number, data: any) {
    return this.http.patch<any>(`/api/s/articles/${id}/`, data).pipe(
      map((data: any) => {
        return {
          ...data,
        } as Article;
      }),
    );
  }
  deleteArticle(id: number) {
    return this.http.delete<any>(`/api/s/articles/${id}/`);
  }
}
