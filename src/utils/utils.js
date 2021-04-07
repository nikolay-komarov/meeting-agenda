export const getDateToTitle = (date) => {
  const dateToTitle = new Date(date);
  return dateToTitle.toLocaleDateString();
};

export const getTimeToTitle = (date) => {
  const dateToTitle = new Date(date);
  return dateToTitle.toLocaleTimeString().replaceAll(':', '-').slice(0, -3);
};
