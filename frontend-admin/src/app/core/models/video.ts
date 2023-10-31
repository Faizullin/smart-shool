import { FileContent, Tag } from './article';
import { UserRole } from './user';

export interface Video {
  id: number;
  title: string;
  file: FileContent;
  featured_image: FileContent;
  tags: Tag[];
  created_at: string;
  updated_at: string;
  target_audience: UserRole;
}
