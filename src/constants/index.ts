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
