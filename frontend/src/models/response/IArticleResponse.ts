import { IArticle } from "../IArticle"

export interface IArticleResponse {
    results: IArticle[]
    count: number
    previous?: any
    next?: any
}