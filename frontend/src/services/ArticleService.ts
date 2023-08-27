import $api from "../http";
import { AxiosResponse } from 'axios'
import { IArticle } from "../models/IArticle";
import { IArticleResponse } from "../models/response/IArticleResponse";

export default class ArticleService{
    static async getAll(filters?: any): Promise<AxiosResponse<IArticleResponse>> {
        return $api.get<IArticleResponse>('/articles/',{
            params: {
                ...filters
            }
        })
    }
    static async getById(id: string): Promise<AxiosResponse<IArticle>> {
        return $api.get<IArticle>(`/articles/${id}/`)
    }
    static async getFilters(): Promise<AxiosResponse<any>> {
        return $api.get<any>(`/articles/filters/`)
    }
}