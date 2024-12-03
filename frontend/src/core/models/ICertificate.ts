import { TimestampedModel } from "./TimestampedModel";

export interface ICertificate extends TimestampedModel {
  subject: {
    title: string;
  };
  image: {
    url: string;
  };
}
