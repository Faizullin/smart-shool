import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { FileContent } from '../models/file-content';

@Injectable({
  providedIn: 'root',
})
export class FileContentService {
  constructor(private http: HttpClient) {}

  public uploadNewFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`/api/s/files/`, formData).pipe(
      map((data: any) => {
        return {
          ...data,
        } as FileContent;
      }),
    );
  }
  public deleteFile(id: number) {
    return this.http.delete<any>(`/api/s/files/${id}/`);
  }
}
