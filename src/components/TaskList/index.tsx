import React from 'react';
import TaskCard from '../TaskCard';
import TaskListHeader from '../TaskListHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/taskStore';
import { filterTasksByDefaultDates } from '../../helpers/FilterTask';
import { TaskStatus } from '../../constants';

const TaskList = () => {
  const tasks = useSelector((store: RootState) => store.task);

  const activeTaskList = tasks.filter(
    (task) => task.status !== TaskStatus.DELETED
  );

  const { tasksToday, tasksTomorrow, tasksYesterday } =
    filterTasksByDefaultDates(activeTaskList);

  console.log(tasksToday, tasksTomorrow, tasksYesterday, 'all tasks');

  return (
    <div className="w-screen flex flex-col items-center gap-8 my-8">
      <TaskListHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-screen max-w-7xl">
        <div className="flex flex-col gap-0 items-center justify-center">
          <p className="text-xl font-bold -my-4">Yesterday</p>
          <div className="flex flex-col items-center gap-6">
            {tasksYesterday.map((task) => (
              <TaskCard key={task.id} taskDetails={task} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-0 items-center justify-center">
          <p className="text-xl font-bold -my-4">Today</p>
          <div className="flex flex-col items-center gap-6">
            {tasksToday.map((task) => (
              <TaskCard key={task.id} taskDetails={task} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-0 items-center justify-center">
          <p className="text-xl font-bold -my-4">Tomorrow</p>
          <div className="flex flex-col items-center gap-6">
            {tasksTomorrow.map((task) => (
              <TaskCard key={task.id} taskDetails={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
