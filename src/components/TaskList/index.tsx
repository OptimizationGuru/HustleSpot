import React, { useState, useEffect } from 'react';
import TaskCard from '../TaskCard';
import TaskListHeader from '../TaskListHeader';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/taskStore';
import { filterTasksByDefaultDates } from '../../helpers/FilterTask';
import { TaskStatus } from '../../constants';
import { Task } from '../../types';
import { updateTask } from '../../store/taskSlice';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const [activeTaskList, setActiveTaskList] = useState<Task[]>([]);
  const [isSortActive, setIsSortActive] = useState(false);
  const [isDescending, setIsDescending] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isDefaultView, setIsDefaultView] = useState(true);
  const [currentStatus, setCurrentStatus] = useState<TaskStatus | null>(null);

  useEffect(() => {
    if (currentStatus !== null) {
      FilterTaskbyStatus(currentStatus);
    } else {
      setActiveTaskList(
        tasks.filter((task) => task.status !== TaskStatus.DELETED)
      );
    }
  }, [tasks, currentStatus]);

  const FilterTaskbyStatus = (status: TaskStatus) => {
    setCurrentStatus(status);
    let filteredTasks;

    if (status === TaskStatus.ALL) {
      filteredTasks = tasks.filter(
        (task) => task.status !== TaskStatus.DELETED
      );
      setIsDefaultView(false);
    } else {
      filteredTasks = tasks.filter(
        (task) => task.status === status && task.status !== TaskStatus.DELETED
      );
      setIsDefaultView(false);
    }

    setActiveTaskList(filteredTasks);
    setIsSortActive(false);
    setIsFiltered(true);
  };

  const SortTasks = () => {
    setIsSortActive(true);
    setIsDescending(!isDescending);
    setIsFiltered(true);
  };

  const updateTaskInList = (updatedTask: Task) => {
    dispatch(updateTask(updatedTask));
  };

  let displayTasks: Task[];

  if (isSortActive) {
    displayTasks = [...activeTaskList].sort((a, b) => {
      const comparison = a.dueDate > b.dueDate ? 1 : -1;
      return isDescending ? comparison * -1 : comparison;
    });
  } else if (isFiltered) {
    displayTasks = activeTaskList;
  } else {
    const filteredTasks = filterTasksByDefaultDates(activeTaskList);
    displayTasks = [
      ...filteredTasks.tasksYesterday,
      ...filteredTasks.tasksToday,
      ...filteredTasks.tasksTomorrow,
    ];
  }

  if (!isDefaultView && displayTasks.length > 1) {
    displayTasks = [
      displayTasks[0],
      ...displayTasks.filter((task) => task.id !== displayTasks[0].id),
    ];
  }

  return (
    <div className="w-screen flex flex-col items-center gap-8 my-8">
      <TaskListHeader onSelect={FilterTaskbyStatus} onSort={SortTasks} />
      <div
        className={`w-full max-w-7xl ${
          isSortActive || isFiltered
            ? 'flex flex-wrap justify-evenly gap-6'
            : 'grid grid-cols-1 md:grid-cols-3 gap-6'
        }`}
      >
        {isSortActive || isFiltered ? (
          displayTasks.map((task: Task) => (
            <TaskCard
              key={task.id}
              taskDetails={task}
              onUpdate={updateTaskInList}
            />
          ))
        ) : (
          <>
            <div className="flex flex-col gap-0 items-center justify-center">
              <p className="text-xl font-bold -my-4">Yesterday</p>
              <div className="flex flex-col flex-wrap items-center justify-center gap-6">
                {filterTasksByDefaultDates(activeTaskList).tasksYesterday.map(
                  (task: Task) => (
                    <TaskCard
                      key={task.id}
                      taskDetails={task}
                      onUpdate={updateTaskInList}
                    />
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-0 items-center justify-center">
              <p className="text-xl font-bold -my-4">Today</p>
              <div className="flex flex-col flex-wrap items-center justify-center gap-6">
                {filterTasksByDefaultDates(activeTaskList).tasksToday.map(
                  (task: Task) => (
                    <TaskCard
                      key={task.id}
                      taskDetails={task}
                      onUpdate={updateTaskInList}
                    />
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-0 items-center justify-center">
              <p className="text-xl font-bold -my-4">Tomorrow</p>
              <div className="flex flex-col flex-wrap items-center justify-center gap-6">
                {filterTasksByDefaultDates(activeTaskList).tasksTomorrow.map(
                  (task: Task) => (
                    <TaskCard
                      key={task.id}
                      taskDetails={task}
                      onUpdate={updateTaskInList}
                    />
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskList;
