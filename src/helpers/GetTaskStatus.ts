import { TaskStatus } from '../constants';

interface StatusDetails {
  label: string;
  color: string;
}

export const getStatusLabel = (status: number): StatusDetails => {
  switch (status) {
    case TaskStatus.PENDING:
      return { label: 'Pending', color: 'bg-amber-400' };
    case TaskStatus.IN_PROGRESS:
      return { label: 'In Progress', color: 'bg-teal-400' };
    case TaskStatus.COMPLETED:
      return { label: 'Completed', color: 'bg-lime-500' };
    case TaskStatus.DELETED:
      return { label: 'Deleted', color: 'bg-rose-600' };
    default:
      return { label: 'Unknown Status', color: 'bg-gray-500' };
  }
};
