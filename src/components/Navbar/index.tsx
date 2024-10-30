import React, { useState } from 'react';
import NewTask from '../CreateTask';
import Sidebar from '../CreateTask/Sidebar';
import { IoSearch } from 'react-icons/io5';
const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleCreateButtonClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-lg shadow-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 w-screen h-auto">
      <div className="flex items-center gap-2 ml-20">
        <span className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-full shadow-md">
          Manage Tasks
        </span>
      </div>

      <div className="flex ml-44 flex-grow max-w-md w-full relative">
        <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full p-3 pl-10 rounded-lg shadow-inner text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 inset-0"
        />
      </div>

      <div className="flex items-center">
        <button
          onClick={handleCreateButtonClick}
          className="px-6 py-3  font-semibold rounded-lg shadow-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
        >
          Create Task
        </button>
      </div>
      <div className="flex items-center">
        <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar}>
          <NewTask onClose={handleCloseSidebar} />
        </Sidebar>
      </div>
    </div>
  );
};

export default Navbar;
