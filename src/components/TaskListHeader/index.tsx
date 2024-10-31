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
    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl p-4 bg-gray-200 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">Task Lists</h2>

      <div className="flex gap-4 items-center">
        <select
          className="px-4 py-[10px] bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300 shadow-md focus:outline-none"
          defaultValue="Pending"
          onChange={(e) => {
            const status = Number(e.target.value) as TaskStatus;
            onSelect(status);
          }}
        >
          <option value="" disabled>
            Filter by Status
          </option>
          <option value={0} className="text-gray-700 bg-gray-100">
            Pending
          </option>
          <option value={1} className="text-gray-700 bg-gray-100">
            In Progress
          </option>
          <option value={2} className="text-gray-700 bg-gray-100">
            Completed
          </option>
        </select>

        <button
          onClick={handleSort}
          className="flex items-center px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300 shadow-md"
        >
          {sortOrder === 'asc' ? (
            <>
              <FaSortAmountUpAlt className="mr-2" />
              Sort Ascending
            </>
          ) : (
            <>
              <FaSortAmountDownAlt className="mr-2" /> Sort Descending
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TaskListHeader;
