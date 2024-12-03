import { AxiosResponse } from "axios";
import $api from "../http";
import { IProjectWork } from "../models/IProjectWork";
import { IFile } from "../models/IFile";

export default class ProjectWorkFileService {
  static async fetchProjectWorkCodeCreate(
    project_work_id: number,
    data?: any
  ): Promise<AxiosResponse<IFile>> {
    return $api.post<IFile>(`projects/${project_work_id}/code/`, data);
  }
  static async fetchProjectWorkCodeUpdate(
    project_work_id: number,
    id: number,
    data?: any
  ): Promise<AxiosResponse<any>> {
    return $api.patch<any>(`projects/${project_work_id}/code/${id}/`, data);
  }
  static async fetchProjectWorkCode(
    project_work_id: number,
    id: number
  ): Promise<AxiosResponse<any>> {
    return $api.get<any>(`projects/${project_work_id}/code/${id}/`);
  }
  static async fetchUploadProjectWorkFile(
    id: number,
    data: any
  ): Promise<AxiosResponse<IFile>> {
    return $api.post<IFile>(`projects/${id}/files/`, data);
  }
  static async fetchProjectWorkFileDetail(
    id: number
  ): Promise<AxiosResponse<IFile>> {
    return $api.get<IFile>(`/files/${id}/`);
  }
  static async fetchProjectWorkFileDelete(
    project_work_id: number,
    id: number
  ): Promise<AxiosResponse<any>> {
    return $api.delete<any>(`/projects/${project_work_id}/files/${id}/`);
  }
  static async fetchProjectWorkFileDocxCheck(
    id: number,
    file_id: number
  ): Promise<AxiosResponse<any>> {
    return $api.post<any>(`/projects/${id}/files/${file_id}/check/`);
  }
}
