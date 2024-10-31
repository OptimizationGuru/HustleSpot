import React from 'react';
import './index.css';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './store/taskStore';
import TaskList from './components/TaskList';

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="flex-grow w-full overflow-y-auto">
          <TaskList />
        </div>
      </div>
    </Provider>
  );
}

export default App;
