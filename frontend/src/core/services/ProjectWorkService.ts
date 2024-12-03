import { AxiosResponse } from "axios";
import $api from "../http";
import { IProjectWork } from "../models/IProjectWork";
import { IFile } from "../models/IFile";
import { IStudent } from "../models/IStudent";

export default class ProjectWorkService {
  static async fetchProjectWorkList(
    params?: any
  ): Promise<AxiosResponse<IProjectWork[]>> {
    return $api.get<IProjectWork[]>(`/projects/my/`, {
      params,
    });
  }
  static async fetchProjectWorkDetail(
    id: number
  ): Promise<AxiosResponse<IProjectWork>> {
    return $api.get<IProjectWork>(`/projects/${id}/`);
  }
  static async fetchCreateProjectWork(
    data: any
  ): Promise<AxiosResponse<IProjectWork>> {
    return $api.post<IProjectWork>(`/projects/my/`, data);
  }
  static async fetchUpdateProjectWork(
    id: number,
    data: any
  ): Promise<AxiosResponse<IProjectWork>> {
    return $api.patch<IProjectWork>(`/projects/${id}/`, data);
  }
  static async fetchDeleteProjectWork(id: number): Promise<AxiosResponse<any>> {
    return $api.delete<any>(`/projects/${id}/`);
  }
  static async fetchCheckDeviceState(id: number) {
    return $api.get<IFile>(`/files/${id}/`);
  }
  static async fetchSubmitProjectWork(data?: any): Promise<AxiosResponse<any>> {
    return $api.post<any>(`/projects/submit/`, data);
  }
  static async fetchProjectWorkSharedStudents(id: number): Promise<
    AxiosResponse<{
      shared_students: IStudent[];
    }>
  > {
    return $api.get<{
      shared_students: IStudent[];
    }>(`/projects/${id}/share/`);
  }
  static async fetchSaveProjectWorkSharedStudents(
    id: number,
    data: any
  ): Promise<
    AxiosResponse<{
      shared_students: IStudent[];
    }>
  > {
    return $api.post<{
      shared_students: IStudent[];
    }>(`/projects/${id}/share/`, data);
  }
}
