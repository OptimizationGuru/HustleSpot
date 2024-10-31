import { TaskStatus } from '../constants';

interface StatusDetails {
  label: string;
  color: string;
}

export const getStatusLabel = (status: number): StatusDetails => {
  switch (status) {
    case TaskStatus.PENDING:
      return { label: 'Pending', color: 'bg-yellow-500 text-black' };
    case TaskStatus.IN_PROGRESS:
      return { label: 'In Progress', color: 'bg-blue-500 text-black' };
    case TaskStatus.COMPLETED:
      return { label: 'Completed', color: 'bg-green-500 text-black' };
    case TaskStatus.DELETED:
      return { label: 'Deleted', color: 'bg-red-700 text-white' };
    default:
      return { label: 'Unknown Status', color: 'bg-gray-600 text-white' };
  }
};
