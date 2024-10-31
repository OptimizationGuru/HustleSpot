export const formatToIndianDate = (timeStamp: number): string => {
  return new Date(timeStamp).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Kolkata',
  });
};
