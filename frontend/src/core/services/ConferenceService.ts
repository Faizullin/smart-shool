import $api from "../http";
import { AxiosResponse } from "axios";
import { IConference } from "../models/IConference";

const STORAGE_KEY = "conference_state";

export default class ConferenceService {
  static async getAll(filters?: any): Promise<AxiosResponse<IConference[]>> {
    return $api.get<IConference[]>("/conferences/", {
      params: {
        ...filters,
      },
    });
  }
  static async getById(id: number): Promise<AxiosResponse<IConference>> {
    return $api.get<IConference>(`/conferences/${id}/`);
  }
  static async fetchUpdateConference(
    id: number,
    data: any
  ): Promise<AxiosResponse<IConference>> {
    return $api.patch<IConference>(`/conferences/${id}/`, data);
  }
  static getConferenceState(): any {
    const raw_data = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw_data === null) {
      return {
        ready: false,
      };
    }
    const data = JSON.parse(raw_data);
    return data;
  }
  static setConferenceState(data: Object): void {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  static cleanConferenceState(): void {
    window.sessionStorage.removeItem(STORAGE_KEY);
  }
}
