import { TimestampedModel } from 'src/app/core/models/timestamped-model';
import { ISubject } from '../subject/subject';
import { FileContent } from 'src/app/core/models/file-content';

export interface Article extends TimestampedModel {
  subject: ISubject;
  title: string;
  content: string;
  files?: FileContent[];
  // content_files?: FileContent[];
  featured_image: FileContent;
}
