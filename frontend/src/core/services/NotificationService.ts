import { AxiosResponse } from "axios";
import $api from "../http";
import { INotification } from "../models/INotification";
import { IDataResponse } from "../models/response/IDataResponse";

export default class NotificationService {
  static async fetchNotificationsList(): Promise<
    AxiosResponse<IDataResponse<INotification>>
  > {
    return $api.get<IDataResponse<INotification>>(`/notifications/`);
  }
  static async fetchDeleteNotification(
    id: number
  ): Promise<AxiosResponse<any>> {
    return $api.delete<any>(`/notifications/${id}/`);
  }
  static async fetchNotificationMarkAsRead(
    id: number
  ): Promise<AxiosResponse<any>> {
    return $api.patch<any>(`/notifications/${id}/unread/`);
  }
}
