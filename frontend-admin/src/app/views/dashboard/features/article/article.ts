import { FileContent } from 'src/app/core/models/article';
import { TimestampedModel } from './../../../../core/models/timestamped-model';
import { ISubject } from '../subject/subject';

export interface Article extends TimestampedModel {
  subject: ISubject;
  title: string;
  content: string;
  file: FileContent;
  files?: FileContent[];
  featured_image: FileContent;
}
