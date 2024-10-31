import React, { useState } from 'react';
import { TaskStatus } from '../../constants';
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from 'react-icons/fa';

interface TaskListHeaderProps {
  onSelect: (status: TaskStatus) => void;
  onSort: (order: 'asc' | 'desc') => void;
}

const TaskListHeader: React.FC<TaskListHeaderProps> = ({
  onSelect,
  onSort,
}) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    onSort(newOrder);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl p-4 mt-16 md:justify-between bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-base sm:text-lg font-semibold text-white">
        Task Lists
      </h2>

      <div className="flex gap-2 sm:gap-4 items-center w-full sm:w-auto">
        <select
          className="flex-grow px-3 py-2 sm:px-4 sm:py-[10px] bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300 shadow-md focus:outline-none"
          defaultValue="Pending"
          onChange={(e) => {
            const status = Number(e.target.value) as TaskStatus;
            onSelect(status);
          }}
        >
          <option value="" disabled>
            Filter by Status
          </option>
          <option value={TaskStatus.ALL} className="text-gray-700 bg-gray-600">
            All
          </option>
          <option
            value={TaskStatus.PENDING}
            className="text-gray-700 bg-gray-600"
          >
            Pending
          </option>
          <option
            value={TaskStatus.IN_PROGRESS}
            className="text-gray-700 bg-gray-600"
          >
            In Progress
          </option>
          <option
            value={TaskStatus.COMPLETED}
            className="text-gray-700 bg-gray-600"
          >
            Completed
          </option>
        </select>

        <button
          onClick={handleSort}
          className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300 shadow-md"
        >
          {sortOrder === 'asc' ? (
            <FaSortAmountUpAlt />
          ) : (
            <FaSortAmountDownAlt />
          )}
        </button>
      </div>
    </div>
  );
};

export default TaskListHeader;
