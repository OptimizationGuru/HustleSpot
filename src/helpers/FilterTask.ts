import { Task } from '../types';

export const filterTasksByDefaultDates = (tasks: Task[]) => {
  if (tasks && tasks.length) {
    const currentDate = new Date();
    const currentDateTimestamp = new Date(
      currentDate.setHours(0, 0, 0, 0)
    ).getTime();
    const tomorrowDateTimestamp = currentDateTimestamp + 24 * 60 * 60 * 1000;
    const yesterdayDateTimestamp = currentDateTimestamp - 24 * 60 * 60 * 1000;

    const tasksToday = tasks.filter(
      (task: Task) =>
        task.dueDate >= currentDateTimestamp &&
        task.dueDate < tomorrowDateTimestamp
    );

    const tasksTomorrow = tasks.filter(
      (task) =>
        task.dueDate >= tomorrowDateTimestamp &&
        task.dueDate < tomorrowDateTimestamp + 24 * 60 * 60 * 1000
    );

    const tasksYesterday = tasks.filter(
      (task) =>
        task.dueDate >= yesterdayDateTimestamp &&
        task.dueDate < currentDateTimestamp
    );

    return {
      tasksToday,
      tasksTomorrow,
      tasksYesterday,
    };
  }
  return {
    tasksToday: [],
    tasksTomorrow: [],
    tasksYesterday: [],
  };
};
