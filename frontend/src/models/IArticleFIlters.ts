export type IArticleFiltersSortProps = {
    type?: 'asc' | 'desc'
    field?: string
}
export interface IArticleFilters {
    search?: string
    subjects?: any[]
    sort?: IArticleFiltersSortProps
}