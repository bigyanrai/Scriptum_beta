const getStartOfDay = (date = new Date()) => {
  const start = new Date(date);

  start.setHours(0, 0, 0, 0);

  return start;
};

const getStartOfWeek = (date = new Date()) => {
  const current = getStartOfDay(date);

  /*
   * JavaScript:
   *
   * Sunday = 0
   * Monday = 1
   * ...
   * Saturday = 6
   *
   * We want Monday as the beginning of the week.
   */

  const day = current.getDay();

  const daysFromMonday = day === 0 ? 6 : day - 1;

  current.setDate(current.getDate() - daysFromMonday);

  return current;
};

const addDays = (date, days) => {
  const result = new Date(date);

  result.setDate(result.getDate() + days);

  return result;
};

export { getStartOfDay, getStartOfWeek, addDays };
