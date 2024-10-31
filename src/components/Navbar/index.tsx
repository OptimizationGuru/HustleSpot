import React from 'react';
import NewTask from '../CreateTask';
import Sidebar from '../CreateTask/Sidebar';
import { IoSearch } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { updateSearchKey } from '../../store/taskSlice';

interface NavbarProps {
  onCreateTaskClick: () => void;
  onCloseSidebar: () => void;
  isSideDrawerOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  onCreateTaskClick,
  onCloseSidebar,
  isSideDrawerOpen,
}) => {
  const dispatch = useDispatch();

  const handleSearch = (key: string) => {
    dispatch(updateSearchKey(key));
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 bg-gray-800 text-gray-100 w-full shadow-lg fixed top-0 z-50">
      <div className="flex items-center justify-between gap-2 w-full sm:w-full ml-4 sm:ml-20">
        <span className="px-4 py-2 text-xl bg-gray-700 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 font-semibold rounded-full shadow-md">
          Hustle
        </span>
        <button
          onClick={onCreateTaskClick}
          className="px-4 py-2 sm:px-6 sm:py-3 font-semibold rounded-lg shadow-lg bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300"
        >
          Create Task
        </button>
      </div>

      <div className="flex flex-grow max-w-md w-full relative mx-4 sm:mx-8 mt-4 sm:mt-0">
        <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full p-3 pl-10 rounded-lg shadow-inner text-gray-300 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      <Sidebar isOpen={isSideDrawerOpen} onClose={onCloseSidebar}>
        <NewTask onClose={onCloseSidebar} />
      </Sidebar>
    </div>
  );
};

export default Navbar;
