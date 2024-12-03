export interface User {
  id: number;
  username: string;
  email: string;
  roles?: string[];
  created_at: string;
  updated_at: string;
}
export type UserRole = 'teacher' | 'student';
