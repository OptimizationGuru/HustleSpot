export const currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 2);
export const dayAfterTomorrow = currentDate.getTime();

export enum TaskStatus {
  PENDING = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
  DELETED = -1,
}
