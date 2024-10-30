import React from 'react';
import './index.css';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './store/taskStore';
import NewTask from './components/CreateTask.tsx';
import TaskCard from './components/TaskCard';

function App() {
  return (
    <Provider store={store}>
      <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
        <div className="mx-auto w-screen">
          <Navbar />
        </div>
        <div className="mx-auto w-screen">
          <NewTask />
        </div>
        <div className="mx-auto w-screen">
          <TaskCard />
        </div>
      </div>
    </Provider>
  );
}

export default App;
