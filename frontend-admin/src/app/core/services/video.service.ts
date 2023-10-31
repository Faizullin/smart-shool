import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Video } from './../models/video';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) {}

  getVideos(filters?: any) {
    // UserFilters: UserFilters
    return this.http
      .get<any>(`/api/s/videos/`, {
        params: {
          ...filters,
        },
      })
      .pipe(
        map((data: any) => {
          const videos_data = data.results || [];
          const total_items = data.count || 0;
          return {
            results: videos_data.map(function (videos: any): Video {
              return {
                ...videos,
              } as Video;
            }),
            count: total_items,
          };
        }),
      );
  }
  getVideo(id: number) {
    return this.http.get<any>(`/api/s/videos/${id}/`).pipe(
      map((data: any) => {
        return {
          ...data,
        } as Video;
      }),
    );
  }
  createVideo(data: any) {
    return this.http.post<any>(`/api/s/videos/`, data).pipe(
      map((data: any) => {
        return {
          ...data,
        } as Video;
      }),
    );
  }
  updateVideo(id: number, data: any) {
    return this.http.patch<any>(`/api/s/videos/${id}/`, data).pipe(
      map((data: any) => {
        return {
          ...data,
        } as Video;
      }),
    );
  }
  deleteVideo(id: number) {
    return this.http.delete<any>(`/api/s/videos/${id}/`);
  }
}
