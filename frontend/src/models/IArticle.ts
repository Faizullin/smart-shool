export interface IArticle{
    id: string,
    title: string,
    content: string,
    featured_image?: string,
    created_at: string,
    updated_at: string,
    file?: string,
    subject?: {
        id?: string,
        title: string,
    },
}