import { TaskStatus } from '../constants';

interface StatusDetails {
  label: string;
  color: string;
}

const statusMap: Record<number, StatusDetails> = {
  [TaskStatus.PENDING]: { label: 'Pending', color: 'bg-yellow-500 text-black' },
  [TaskStatus.IN_PROGRESS]: {
    label: 'In Progress',
    color: 'bg-blue-500 text-black',
  },
  [TaskStatus.COMPLETED]: {
    label: 'Completed',
    color: 'bg-green-500 text-black',
  },
  [TaskStatus.DELETED]: { label: 'Deleted', color: 'bg-red-700 text-white' },
};

export const getStatusLabel = (status: number): StatusDetails => {
  return (
    statusMap[status] || {
      label: 'Unknown Status',
      color: 'bg-gray-600 text-white',
    }
  );
};
