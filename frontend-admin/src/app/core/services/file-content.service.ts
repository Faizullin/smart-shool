import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { DocType } from '../models/doc-type';
import { FileContent } from '../models/article';

export interface IDocumentUploadProps {
  resourceType: DocType;
  document_id: number;
  [x: string | number | symbol]: unknown;
}

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
