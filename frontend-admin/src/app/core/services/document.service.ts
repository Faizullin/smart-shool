import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(private http: HttpClient) {}

  public getDocuments(filters?: any) {
    // UserFilters: UserFilters
    return this.http
      .get<any>(`/api/s/documents/`, {
        params: {
          ...filters,
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
  public getDocument(id: number) {
    return this.http.get<any>(`/api/s/documents/${id}/`).pipe(
      map((data: any) => {
        return {
          ...data,
        } as Document;
      }),
    );
  }
  public createDocument(data: any) {
    return this.http.post<any>(`/api/s/documents/`, data).pipe(
      map((data: any) => {
        return {
          ...data,
        } as Document;
      }),
    );
  }
  public updateDocument(id: number, data: any) {
    return this.http.patch<any>(`/api/s/documents/${id}/`, data).pipe(
      map((data: any) => {
        return {
          ...data,
        } as Document;
      }),
    );
  }
  public deleteDocument(id: number) {
    return this.http.delete<any>(`/api/s/documents/${id}/`);
  }
}
