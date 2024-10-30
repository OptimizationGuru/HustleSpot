import React from 'react';

const TaskListHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl p-4 bg-gray-200 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">Task Lists</h2>

      <div className="flex gap-4 items-center">
        <select
          className="px-4 py-[10px] bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300 shadow-md focus:outline-none"
          defaultValue="Pending"
          onChange={(e) => {
            const status = e.target.value;
            console.log(`Filter by status: ${status}`);
          }}
        >
          <option value="" disabled>
            Filter by Status
          </option>
          <option value="Pending" className="text-gray-700 bg-gray-100">
            Pending
          </option>
          <option value="InProgress" className="text-gray-700 bg-gray-100">
            In Progress
          </option>
          <option value="Completed" className="text-gray-700 bg-gray-100">
            Completed
          </option>
        </select>

        <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300 shadow-md">
          Sort
        </button>
      </div>
    </div>
  );
};

export default TaskListHeader;
