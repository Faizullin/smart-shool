import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Labwork } from './../models/labwork';

@Injectable({
  providedIn: 'root',
})
export class LabworkService {
  constructor(private http: HttpClient) {}

  getLabworks(filters?: any) {
    return this.http
      .get<any>(`/api/s/labworks/`, {
        params: {
          ...filters,
        },
      })
      .pipe(
        map((data: any) => {
          const labworks_data = data.results || [];
          const total_items = data.count || 0;
          return {
            results: labworks_data.map(function (labworks: any): Labwork {
              return {
                ...labworks,
              } as Labwork;
            }),
            count: total_items,
          };
        }),
      );
  }
  getLabwork(id: number) {
    return this.http.get<any>(`/api/s/labworks/${id}/`).pipe(
      map((data: any) => {
        return {
          ...data,
        } as Labwork;
      }),
    );
  }
  createLabwork(data: any) {
    return this.http.post<any>(`/api/s/labworks/`, data).pipe(
      map((data: any) => {
        return {
          ...data,
        } as Labwork;
      }),
    );
  }
  updateLabwork(id: number, data: any) {
    return this.http.patch<any>(`/api/s/labworks/${id}/`, data).pipe(
      map((data: any) => {
        return {
          ...data,
        } as Labwork;
      }),
    );
  }
  deleteLabwork(id: number) {
    return this.http.delete<any>(`/api/s/labworks/${id}/`);
  }
}
