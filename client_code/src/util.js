export const getDateString = (number) => {
  const d = new Date(number);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

export const getTimeString = (number) => {
  const d = new Date(number);
  return `${d.getHours()}:${d.getMinutes() + 1}:${d.getSeconds()}`;
};

export const getDateTimeString = number => `${getDateString(number)} ${getTimeString(number)}`;

export const getRandomString = () => Math.random().toString(36).substring(2, 15);
