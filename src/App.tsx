import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './store/taskStore';
import TaskList from './components/TaskList';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCreateButtonClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <Provider store={store}>
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 text-gray-100">
        <div className="w-full">
          <Navbar
            onCreateTaskClick={handleCreateButtonClick}
            isSideDrawerOpen={isSidebarOpen}
            onCloseSidebar={handleCloseSidebar}
          />
        </div>
        <div className="flex-grow w-full overflow-y-auto">
          <TaskList onCreateTaskClick={handleCreateButtonClick} />
        </div>
      </div>
    </Provider>
  );
}

export default App;
