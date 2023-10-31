import { UserRole } from './user';

export interface FeaturedImage {
  id: number;
  url: string;
}
export interface FileContent extends FeaturedImage {}
export interface Tag {
  id: number;
  title: string;
  slug: string;
}
export interface Article {
  subject: any;
  id: number;
  title: string;
  content: string;
  file: FileContent;
  files?: FileContent[];
  featured_image: FileContent;
  created_at: string;
  updated_at: string;
  target_audience: UserRole;
}
