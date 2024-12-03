import { IFile } from "./IFile";
import { TimestampedModel } from "./TimestampedModel";

export interface IArticle extends TimestampedModel{
    title: string,
    content: string,
    featured_image?: IFile,
    files?: IFile[],
    subject?: {
        id?: number,
        title: string,
    },
}