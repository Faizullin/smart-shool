import { TimestampedModel } from '../../../../core/models/timestamped-model';
import { ProjectWork } from '../project-work/project-work';
import { User } from '../user/user';

export interface Conference extends TimestampedModel {
  title: string;
  description: string;
  admin: User;
  users: User[];
  invited_users: User[];
  status: 'planned' | 'ongoing' | 'completed';
  planned_time: string;
  started_at: string;
  project_work?: ProjectWork;
  ended_at: string;
}
