import { FileContent } from 'src/app/core/models/article';
import { TimestampedModel } from './../../../../core/models/timestamped-model';
import { Subject } from '../students/student';

export interface Article extends TimestampedModel {
  subject: Subject;
  title: string;
  content: string;
  file: FileContent;
  files?: FileContent[];
  featured_image: FileContent;
}
