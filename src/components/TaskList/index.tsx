import React, { useState, useEffect } from 'react';
import TaskCard from '../TaskCard';
import TaskListHeader from '../TaskListHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/taskStore';
import { filterTasksByDefaultDates } from '../../helpers/FilterTask';
import { TaskStatus } from '../../constants';
import { Task } from '../../types';

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const [activeTaskList, setActiveTaskList] = useState<Task[]>([]);

  useEffect(() => {
    setActiveTaskList(
      tasks.filter((task) => task.status !== TaskStatus.DELETED)
    );
  }, [tasks]);

  const FilterTaskbyStatus = (status: TaskStatus) => {
    if (status === TaskStatus.ALL) {
      setActiveTaskList(
        tasks.filter((task) => task.status !== TaskStatus.DELETED)
      );
    } else {
      const filteredTasks = tasks.filter(
        (task) => task.status === status && task.status !== TaskStatus.DELETED
      );
      setActiveTaskList(filteredTasks);
    }
  };

  const SortTasks = () => {
    const sortedTasks = [...activeTaskList].sort(
      (a, b) => b.dueDate - a.dueDate
    );
    setActiveTaskList(sortedTasks);
  };

  const { tasksToday, tasksTomorrow, tasksYesterday } =
    filterTasksByDefaultDates(activeTaskList);

  return (
    <div className="w-screen flex flex-col items-center gap-8 my-8">
      <TaskListHeader onSelect={FilterTaskbyStatus} onSort={SortTasks} />
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
