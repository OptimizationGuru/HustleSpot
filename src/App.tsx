import React from 'react';
import './index.css';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './store/taskStore';
import TaskList from './components/TaskList';

function App() {
  return (
    <Provider store={store}>
      <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center bg-gray-100">
        <div className="mx-auto w-screen h-auto text-center justify-center">
          <Navbar />
        </div>
        <div className="w-screen h-auto items-center justify-center overflow-y-auto">
          <TaskList />
        </div>
      </div>
    </Provider>
  );
}

export default App;
