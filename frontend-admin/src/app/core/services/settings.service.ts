import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Constants } from './../../constants/Constants';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient) { }

  public toggleShowDatesState(reload = true) {
    const currentState = this.getShowDatesState();
    if (currentState) {
      localStorage.setItem("show_dates", 'false');
    } else {
      localStorage.setItem("show_dates", 'true');
    }
    if (reload) {
      window.location.reload();
    }
  }
  public getShowDatesState(): boolean {
    const currentState = localStorage.getItem(
      "show_dates",
    );
    return currentState === 'true';
  }

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
