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
    <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl p-4 mt-16 md:justify-between  bg-gradient-to-r from-gray-950 via-blue-950 to-gray-800 rounded-md shadow-md">
      <h2 className="text-base sm:text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg">
        Task Lists
      </h2>

      <div className="flex gap-2 sm:gap-4 items-center w-full sm:w-auto">
        <select
          className="flex-grow px-3 py-2 sm:px-4 sm:py-[10px] bg-gray-700 text-white font-medium rounded-md hover:bg-gray-600 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          defaultValue="Pending"
          onChange={(e) => {
            const status = Number(e.target.value) as TaskStatus;
            onSelect(status);
          }}
        >
          <option value="" disabled className="text-gray-500 bg-gray-800">
            Filter by Status
          </option>
          <option
            value={TaskStatus.ALL}
            className="text-gray-200 bg-gray-800 hover:bg-gray-700 transition duration-300"
          >
            All
          </option>
          <option
            value={TaskStatus.PENDING}
            className="text-gray-200 bg-gray-800 hover:bg-gray-700 transition duration-300"
          >
            Pending
          </option>
          <option
            value={TaskStatus.IN_PROGRESS}
            className="text-gray-800 bg-gray-800 hover:bg-gray-700 transition duration-300"
          >
            In Progress
          </option>
          <option
            value={TaskStatus.COMPLETED}
            className="text-gray-200 bg-gray-800 hover:bg-gray-700 transition duration-300"
          >
            Completed
          </option>
        </select>

        <button
          onClick={handleSort}
          className={`flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-gray-700 font-medium rounded-md 
    ${sortOrder === 'asc' ? 'bg-blue-600 hover:bg-gray-600' : 'bg-green-600 hover:bg-green-700'}
    transition duration-300 shadow-md`}
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
