/* eslint-disable @typescript-eslint/no-explicit-any */
import $api from "../http";
import { AxiosResponse } from "axios";
import { IDataResponse } from "../models/response/IDataResponse";
import { IArticle } from "../models/IArticle";

export default class ArticleService {
  static async getAll(
    filters?: any
  ): Promise<AxiosResponse<IDataResponse<IArticle>>> {
    return $api.get<IDataResponse<IArticle>>("/articles/", {
      params: {
        ...filters,
      },
    });
  }
  static async getById(id: number): Promise<AxiosResponse<IArticle>> {
    return $api.get<IArticle>(`/articles/${id}/`);
  }
  static async getPopularItems(): Promise<AxiosResponse<IArticle[]>> {
    return $api.get<IArticle[]>("/articles/popular/");
  }
  static async getFilters(): Promise<AxiosResponse<any>> {
    return $api.get<any>(`articles/filters/`);
  }
}
