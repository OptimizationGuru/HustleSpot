import React, { useState, useEffect, useCallback } from 'react';
import TaskCard from '../TaskCard';
import TaskListHeader from '../TaskListHeader';
import { filterTasksByDefaultDates } from '../../helpers/FilterTask';
import {
  taskNotFoundMsg,
  TaskStatus,
  taskToday,
  taskTodayMsg,
  taskTomorrow,
  taskTomorrowMsg,
  taskYesterday,
  taskYesterdayMsg,
} from '../../constants';
import { Task } from '../../types';
import { updateTask } from '../../store/taskSlice';
import useFilterTaskbySearchKey from '../SearchTask/SearchTask';
import { useDispatch } from 'react-redux';
import WelcomeCard from '../Welcome';
import NoTasksCard from '../NoTAskCard';

interface TaskListProps {
  onCreateTaskClick: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ onCreateTaskClick }) => {
  const dispatch = useDispatch();
  const tasks = useFilterTaskbySearchKey();
  const [activeTaskList, setActiveTaskList] = useState<Task[]>([]);
  const [isSortActive, setIsSortActive] = useState(false);
  const [isDescending, setIsDescending] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isDefaultView, setIsDefaultView] = useState(true);
  const [currentStatus, setCurrentStatus] = useState<TaskStatus | null>(null);
  const [welcome, setWelcome] = useState<boolean>(false);

  useEffect(() => {
    if (tasks.length === 0) {
      setWelcome(true);
    } else {
      setWelcome(false);
    }
  }, [tasks]);

  const FilterTaskbyStatus = useCallback(
    (status: TaskStatus) => {
      let filteredTasks;
      setCurrentStatus(status);
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
    },
    [tasks]
  );

  useEffect(() => {
    if (currentStatus !== null) {
      FilterTaskbyStatus(currentStatus);
    } else {
      setActiveTaskList(
        tasks.filter((task) => task.status !== TaskStatus.DELETED)
      );
    }
  }, [tasks, currentStatus, FilterTaskbyStatus]);

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

  if (welcome)
    return (
      <div className="container mx-auto">
        <WelcomeCard onCreateTaskClick={onCreateTaskClick} />
      </div>
    );

  return (
    <div
      className="w-screen border-white border-t flex flex-col items-center md:justify-center gap-6 sm:gap-8 mt-28 px-2   sm:px-4 lg:px-8 bg-gradient-to-r from-gray-950 via-gray-900 to-black

 text-gray-200"
    >
      <div className="flex flex-col items-center justify-center w-full md:ml-12">
        <TaskListHeader onSelect={FilterTaskbyStatus} onSort={SortTasks} />
      </div>
      <div
        className={`w-full max-w-6xl ${
          isSortActive || isFiltered
            ? 'flex flex-wrap justify-center gap-4 sm:gap-6'
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
        }`}
      >
        {isSortActive || isFiltered ? (
          displayTasks.length > 0 ? (
            displayTasks.map((task: Task) => (
              <TaskCard
                key={task.id}
                taskDetails={task}
                onUpdate={updateTaskInList}
                className="bg-gray-800 border border-gray-700 text-gray-200"
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center w-full p-4 border border-gray-700 rounded-lg shadow-md bg-gray-800 text-gray-300">
              <NoTasksCard
                onCreateTaskClick={onCreateTaskClick}
                msg={taskNotFoundMsg}
              />
            </div>
          )
        ) : (
          <>
            <div className="flex flex-col gap-2 sm:gap-4 items-center justify-center w-full text-gray-300">
              <p className="text-lg sm:text-xl font-bold text-transparent bg-clip-text  bg-blue-400  shadow-lg">
                {taskYesterday}
              </p>

              <div className="flex flex-col flex-wrap items-center justify-center gap-4 sm:gap-6 w-full">
                {filterTasksByDefaultDates(activeTaskList).tasksYesterday
                  .length === 0 ? (
                  <NoTasksCard
                    onCreateTaskClick={onCreateTaskClick}
                    msg={taskYesterdayMsg}
                  />
                ) : (
                  filterTasksByDefaultDates(activeTaskList).tasksYesterday.map(
                    (task: Task) => (
                      <TaskCard
                        key={task.id}
                        taskDetails={task}
                        onUpdate={updateTaskInList}
                        className="bg-gray-800 border border-gray-700 text-gray-200"
                      />
                    )
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-4 items-center justify-center w-full text-gray-300">
              <p className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-blue-400  shadow-lg">
                {taskToday}
              </p>

              <div className="flex flex-col flex-wrap items-center justify-center gap-4 sm:gap-6 w-full">
                {filterTasksByDefaultDates(activeTaskList).tasksToday.length ===
                0 ? (
                  <NoTasksCard
                    onCreateTaskClick={onCreateTaskClick}
                    msg={taskTodayMsg}
                  />
                ) : (
                  filterTasksByDefaultDates(activeTaskList).tasksToday.map(
                    (task: Task) => (
                      <TaskCard
                        key={task.id}
                        taskDetails={task}
                        onUpdate={updateTaskInList}
                        className="bg-gray-800 border border-gray-700 text-gray-200"
                      />
                    )
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-4 items-center justify-center w-full text-gray-300">
              <p className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-blue-400   shadow-lg">
                {taskTomorrow}
              </p>
              <div className="flex flex-col flex-wrap items-center justify-center gap-4 sm:gap-6 w-full">
                {filterTasksByDefaultDates(activeTaskList).tasksTomorrow
                  .length === 0 ? (
                  <NoTasksCard
                    onCreateTaskClick={onCreateTaskClick}
                    msg={taskTomorrowMsg}
                  />
                ) : (
                  filterTasksByDefaultDates(activeTaskList).tasksTomorrow.map(
                    (task: Task) => (
                      <TaskCard
                        key={task.id}
                        taskDetails={task}
                        onUpdate={updateTaskInList}
                        className="bg-gray-800 border border-gray-700 text-gray-200"
                      />
                    )
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
