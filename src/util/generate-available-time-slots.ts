import { addMinutes, setHours, setMinutes } from 'date-fns';

const getStartTime = (date: Date) => {
  const today = setHours(date, 9);
  const start = setMinutes(today, 0);

  return start;
};

const getEndTime = (date: Date) => {
  const today = setHours(date, 18);
  const end = setMinutes(today, 0);
  return end;
};

const generateAvailableTimeSlotsForDate = (date: Date) => {
  const start = getStartTime(date);
  const end = getEndTime(date);

  let curr = start;
  let times = [];

  while (curr < end) {
    times.push(curr);
    curr = addMinutes(curr, 15);
  }

  return times;
};

export default generateAvailableTimeSlotsForDate;
