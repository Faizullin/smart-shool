export interface Document {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}
export interface DocumentComplete {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}
