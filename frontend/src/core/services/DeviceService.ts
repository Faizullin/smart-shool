import { AxiosResponse } from "axios";
import $api from "../http";
import { IDevice, IDeviceSensorDataSubmit } from "../models/IDevice";
import { IDataResponse } from "../models/response/IDataResponse";

export default class DeviceService {
  static async fetchCreateProjectWorkDevice(
    data: any
  ): Promise<AxiosResponse<IDevice>> {
    return $api.post<IDevice>(`/projects/device/`, data);
  }
  static async fetchUpdateProjectWorkDevice(
    id: number,
    data: any
  ): Promise<AxiosResponse<IDevice>> {
    return $api.patch<IDevice>(`/projects/device/${id}/`, data);
  }
  static async fetchDeleteProjectWorkDevice(
    id: number
  ): Promise<AxiosResponse<any>> {
    return $api.delete<any>(`/projects/device/${id}/`);
  }
  static async fetchDetailProjectWorkDevice(
    id: number
  ): Promise<AxiosResponse<IDevice>> {
    return $api.get<IDevice>(`/projects/device/${id}/`);
  }
  static async fetchGetDeviceStreamData(
    id: number,
    params?: any
  ): Promise<AxiosResponse<IDataResponse<IDeviceSensorDataSubmit>>> {
    return $api.get<IDataResponse<IDeviceSensorDataSubmit>>(
      `/projects/device/${id}/stream/`,
      {
        params,
      }
    );
  }
  static async fetchGetDeviceStreamDataLast(
    id: number,
    params?: any
  ): Promise<AxiosResponse<IDataResponse<any>>> {
    return $api.get<IDataResponse<any>>(`/projects/device/${id}/stream/`, {
      params: {
        ...params,
        page_size: 1,
      },
    });
  }
  static async fetchGenerateApiKey(
    device_id: number,
  ) {
    return $api.post<{ key: string; }>(`/projects/device/${device_id}/generate-key/`);
  }
}
