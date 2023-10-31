import { FileContent, Tag } from './article';
import { UserRole } from './user';

export interface Labwork {
  id: number;
  title: string;
  files: FileContent[];
  tags: Tag[];
  created_at: string;
  updated_at: string;
  target_audience: UserRole;
}
