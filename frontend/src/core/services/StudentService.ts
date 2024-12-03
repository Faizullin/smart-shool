import $api from "../http";
import { AxiosResponse } from 'axios'
import { IStudent } from "../models/IStudent";

export default class StudentService {
    static async fetchStudents(): Promise<AxiosResponse<IStudent[]>> {
        return $api.get<IStudent[]>('/students/')
    }
    static async fetchStudentMe(): Promise<AxiosResponse<IStudent>> {
        return $api.get<IStudent>('/students/me/') //.then(response => response.data)
    }
    static async createProfile(data: any): Promise<AxiosResponse<any>> {
        return $api.post<any>('/students/me/', data)
    }
    static async changeProfile(data: any): Promise<AxiosResponse<any>> {
        return $api.patch<any>('/students/me/', data)
    }
    static async trainFace(data: any): Promise<AxiosResponse<any>> {
        return $api.post('/face_id/train/', data)
    }
    static async loginViaFace(data: any): Promise<AxiosResponse<any>> {
        return $api.post('/face_id/login/', data)
    }
    static async verifyViaFace(data: any): Promise<AxiosResponse<any>> {
        return $api.post('/face_id/verify/', data)
    }
    
}