import React, { useState, useEffect, useCallback } from 'react';
import TaskCard from '../TaskCard';
import TaskListHeader from '../TaskListHeader';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/taskStore';
import { filterTasksByDefaultDates } from '../../helpers/FilterTask';
import { TaskStatus } from '../../constants';
import { Task } from '../../types';
import { updateTask } from '../../store/taskSlice';
import NoTasksCard from '../../components/NoTaskCard/index';

interface TaskListProps {
  onCreateTaskClick: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ onCreateTaskClick }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const [activeTaskList, setActiveTaskList] = useState<Task[]>([]);
  const [isSortActive, setIsSortActive] = useState(false);
  const [isDescending, setIsDescending] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isDefaultView, setIsDefaultView] = useState(true);
  const [currentStatus, setCurrentStatus] = useState<TaskStatus | null>(null);

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

  return (
    <div className="w-full flex flex-col items-center gap-6 sm:gap-8 mt-28 px-2 sm:px-4 lg:px-8">
      <TaskListHeader onSelect={FilterTaskbyStatus} onSort={SortTasks} />
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
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center w-full p-4 border border-gray-300 rounded-lg shadow-md">
              <NoTasksCard
                onCreateTaskClick={onCreateTaskClick}
                day="Till Now"
              />
            </div>
          )
        ) : (
          <>
            <div className="flex flex-col gap-2 sm:gap-4 items-center justify-center w-full">
              <p className="text-lg sm:text-xl font-bold">Yesterday</p>
              <div className="flex flex-col flex-wrap items-center justify-center gap-4 sm:gap-6 w-full">
                {filterTasksByDefaultDates(activeTaskList).tasksYesterday
                  .length === 0 ? (
                  <NoTasksCard
                    onCreateTaskClick={onCreateTaskClick}
                    day="Yesterday"
                  />
                ) : (
                  filterTasksByDefaultDates(activeTaskList).tasksYesterday.map(
                    (task: Task) => (
                      <TaskCard
                        key={task.id}
                        taskDetails={task}
                        onUpdate={updateTaskInList}
                      />
                    )
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-4 items-center justify-center w-full">
              <p className="text-lg sm:text-xl font-bold">Today</p>
              <div className="flex flex-col flex-wrap items-center justify-center gap-4 sm:gap-6 w-full">
                {filterTasksByDefaultDates(activeTaskList).tasksToday.length ===
                0 ? (
                  <NoTasksCard
                    onCreateTaskClick={onCreateTaskClick}
                    day="Today"
                  />
                ) : (
                  filterTasksByDefaultDates(activeTaskList).tasksToday.map(
                    (task: Task) => (
                      <TaskCard
                        key={task.id}
                        taskDetails={task}
                        onUpdate={updateTaskInList}
                      />
                    )
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-4 items-center justify-center w-full">
              <p className="text-lg sm:text-xl font-bold">Tomorrow</p>
              <div className="flex flex-col flex-wrap items-center justify-center gap-4 sm:gap-6 w-full">
                {filterTasksByDefaultDates(activeTaskList).tasksTomorrow
                  .length === 0 ? (
                  <NoTasksCard
                    onCreateTaskClick={onCreateTaskClick}
                    day="Tomorrow"
                  />
                ) : (
                  filterTasksByDefaultDates(activeTaskList).tasksTomorrow.map(
                    (task: Task) => (
                      <TaskCard
                        key={task.id}
                        taskDetails={task}
                        onUpdate={updateTaskInList}
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
