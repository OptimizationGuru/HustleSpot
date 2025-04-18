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
    <div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-1 bg-gradient-to-r from-gray-950 via-gray-900 to-black
 text-gray-100 w-full shadow-xl fixed top-0 z-50"
    >
      <div className="flex items-center justify-between gap-2 w-full p-4 rounded-lg shadow-2xl">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-500  rounded-full shadow-xl"
        >
          Hustle
        </button>

        <button
          onClick={onCreateTaskClick}
          className="mt-2 px-6 py-2 text-white rounded-lg bg-gradient-to-r from-blue-500 to-red-400 hover:from-blue-600 hover:to-red-500 transition duration-300 font-semibold shadow-lg"
        >
          Create Task
        </button>
      </div>

      <div className="flex flex-grow max-w-md w-full relative mx-4 sm:mx-8 mt-4 sm:mt-0">
        <div className="flex p-4 rounded-lg w-full">
          <IoSearch className="absolute ml-8 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full py-3 px-8 ml-5 rounded-lg shadow-inner text-gray-200 bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundImage: 'linear-gradient(to right, #1F1F1F, #2A2A2A)',
            }}
          />
        </div>
      </div>

      <Sidebar isOpen={isSideDrawerOpen} onClose={onCloseSidebar}>
        <NewTask onClose={onCloseSidebar} />
      </Sidebar>
    </div>
  );
};

export default Navbar;
