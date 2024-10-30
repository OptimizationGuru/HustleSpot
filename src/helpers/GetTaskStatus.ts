import { TaskStatus } from '../constants';

export const getStatusLabel = (status: number): string => {
  switch (status) {
    case TaskStatus.PENDING:
      return 'Pending';
    case TaskStatus.IN_PROGRESS:
      return 'In Progress';
    case TaskStatus.COMPLETED:
      return 'Completed';
    case TaskStatus.DELETED:
      return 'Deleted';
    default:
      return 'Unknown Status';
  }
};
