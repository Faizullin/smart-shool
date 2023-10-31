import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Tag } from '../models/article';
import { Document } from '../models/document';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  constructor(private http: HttpClient) {}

  getFilters() {
    return this.http.get<any>(`/api/filters/`).pipe(
      map((data: any) => {
        const tags_data = data.tags || [];
        return {
          tags: tags_data.map(function (tags: any): Tag {
            return {
              ...tags,
            } as Tag;
          }),
        };
      }),
    );
  }
  getDocumentFilters(filters?: any) {
    return this.http
      .get<any>(`/api/s/documents/`, {
        params: {
          ...filters,
          page_size: 6,
        },
      })
      .pipe(
        map((data: any) => {
          const documents_data = data.results || [];
          const total_items = data.count || 0;
          return {
            results: documents_data.map(function (documents: any): Document {
              return {
                ...documents,
              } as Document;
            }),
            count: total_items,
          };
        }),
      );
  }
}
