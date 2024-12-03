import { Injectable } from '@angular/core';
import { Constants } from './../../constants/Constants';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient) {}

  public toggleShowComponents(reload = true) {
    const currentState = this.getShowComponentsState();
    if (currentState) {
      localStorage.setItem(Constants.SETTINGS_SHOW_COMPONENT_KEY, 'false');
    } else {
      localStorage.setItem(Constants.SETTINGS_SHOW_COMPONENT_KEY, 'true');
    }
    if (reload) {
      window.location.reload();
    }
  }
  public getShowComponentsState(): boolean {
    const currentState = localStorage.getItem(
      Constants.SETTINGS_SHOW_COMPONENT_KEY,
    );
    return currentState === 'true';
  }
  public toggleEmailEnabled(state: boolean) {
    return this.http
      .post<any>(`/api/s/academic-config/`, {
        email_enabled: state,
      })
      .pipe(
        map((data: any) => {
          return {
            ...data,
          };
        }),
      );
  }
  public getLastConfig() {
    return this.http
      .get<any>(`/api/s/academic-config/`, {
        params: {
          page_size: 1,
          ordering: '-updated_at',
        },
      })
      .pipe(
        map((data: any) => {
          return {
            ...data.results[0],
          };
        }),
      );
  }
}
