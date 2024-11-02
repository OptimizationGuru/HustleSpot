export const currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 2);
export const dayAfterTomorrow = currentDate.getTime();

export enum TaskStatus {
  PENDING = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
  DELETED = -1,
  ALL = 10,
}

export const todaytDate = new Date();
currentDate.setHours(0, 0, 0, 0);

export const currentDateTimestamp = todaytDate.getTime();

export const tomorrowDateTimestamp = new Date(
  currentDateTimestamp + 24 * 60 * 60 * 1000
).getTime();

export const yesterdayDateTimestamp = new Date(
  currentDateTimestamp - 24 * 60 * 60 * 1000
).getTime();

export const delayTime = 1000;

export const taskTodayMsg =
  'No tasks for today! Take a breather or start something new! 🎉';
export const taskTomorrowMsg =
  'Nothing scheduled for tomorrow. Plan ahead or enjoy the free time! 🌅';
export const taskYesterdayMsg =
  "Nothing left from yesterday! You're all caught up! 👏";

export const taskNotFoundMsg =
  "Oops! We couldn't find any tasks matching your search. Try different keywords or create a new task! 🔍✨";

export const taskToday = 'Due Today';
export const taskTomorrow = 'Due Tomorrow';
export const taskYesterday = 'Due Yesterday';

export const confirmationTitle = 'Are you sure?';
export const confirmationText = 'This action will delete the task permanently.';
export const confirmationIcon = 'warning';
