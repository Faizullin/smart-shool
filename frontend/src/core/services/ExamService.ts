/* eslint-disable @typescript-eslint/no-explicit-any */
import $api from "../http";
import { AxiosResponse } from "axios";
import { IQuestion, IQuiz } from "../models/IQuiz";
import { IFeedback } from "../models/IFeedback";
import { ICertificate } from "../models/ICertificate";

export default class ExamService {
  static async fetchQuizzes(): Promise<AxiosResponse<IQuiz>> {
    return $api.get<IQuiz>(`/quizzes/`);
  }
  static async fetchQuiz(id: string): Promise<AxiosResponse<IQuiz>> {
    return $api.get<IQuiz>(`/quizzes/${id}/`);
  }
  static async fetchQuestions(
    quiz_id: number
  ): Promise<AxiosResponse<IQuestion[]>> {
    return $api.get<IQuestion[]>(`/quizzes/${quiz_id}/questions/`); //.then(response => response.data)
  }
  static async fetchQuestion(
    quiz_id: number,
    id: number
  ): Promise<AxiosResponse<IQuestion>> {
    return $api.get<IQuestion>(`/quizzes/${quiz_id}/questions/${id}/`); //.then(response => response.data)
  }
  static async fetchSubmitQuiz(
    id: number,
    data: any
  ): Promise<AxiosResponse<any>> {
    return $api.post<any>(`/quizzes/${id}/submit/`, data);
  }

  static async fetchExamsMy(): Promise<AxiosResponse<any>> {
    return $api.get<any>("/exams/my/");
  }
  static async fetchResultsMy(): Promise<AxiosResponse<any>> {
    return $api.get<any>("/results/my/");
  }
  static async fetchResultsStatsMy(data?: any): Promise<AxiosResponse<any>> {
    return $api.get<any>("/results/stats/my/", {
      params: {
        ...data,
      },
    });
  }
  static async fetchExamFeedback(
    id: string
  ): Promise<AxiosResponse<IFeedback>> {
    return $api.get<IFeedback>(`/feedbacks/${id}/`);
  }
  static async fetchInitialQuiz(): Promise<AxiosResponse<any>> {
    return $api.get<any>("/quizzes/intital/my/");
  }

  static async fetchRequestCertificateSubmit(
    data?: any
  ): Promise<AxiosResponse<any>> {
    return $api.post<any>("/certificates/submit/", data);
  }
  static async fetchCertificates(): Promise<AxiosResponse<ICertificate[]>> {
    return $api.get<ICertificate[]>("/certificates/my/");
  }
  static async fetchCertificateData(id: number): Promise<AxiosResponse<any>> {
    return $api.get<any>(`/certificates/${id}/`);
  }
}
