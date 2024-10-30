import { TaskStatus } from '../constants';

export interface Task {
  id: number;
  title: string;
  desc: string;
  status: TaskStatus;
  dueDate: number;
}
