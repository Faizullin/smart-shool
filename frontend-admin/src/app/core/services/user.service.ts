import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(filters?: any) {
    // UserFilters: UserFilters
    return this.http
      .get<any>(`/api/s/users/`, {
        params: {
          ...filters,
        },
      })
      .pipe(
        map((data: any) => {
          const users_data = data.results || [];
          const total_items = data.count || 0;
          return {
            results: users_data.map(function (users: any): User {
              return {
                ...users,
              } as User;
            }),
            count: total_items,
          };
        }),
      );
  }
  getUser(id: number) {
    return this.http.get<any>(`/api/s/users/${id}/`).pipe(
      map((data: any) => {
        return {
          ...data,
        } as User;
      }),
    );
  }
  createUser(data: any) {
    return this.http.post<any>(`/api/s/users/`, data).pipe(
      map((data: any) => {
        return {
          ...data,
        } as User;
      }),
    );
  }
  updateUser(id: number, data: any) {
    return this.http.patch<any>(`/api/s/users/${id}/`, data).pipe(
      map((data: any) => {
        return {
          ...data,
        } as User;
      }),
    );
  }
  deleteUser(id: number) {
    return this.http.delete<any>(`/api/s/users/${id}/`);
  }
}
