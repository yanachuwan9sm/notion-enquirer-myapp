export const getNowDateYYYYMMDD = () => {
  const date = new Date();
  const dateIsoStr = date.toISOString();
  const dateStr = dateIsoStr.slice(0, 10);
  return dateStr;
};

export const getTomorrowDateYYYYMMDD = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const dateIsoStr = date.toISOString();
  const dateStr = dateIsoStr.slice(0, 10);
  return dateStr;
};
