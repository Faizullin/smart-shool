import { TimestampedModel } from "./TimestampedModel";

export interface IFeedback extends TimestampedModel{
    content: string,
    exam: string,
}