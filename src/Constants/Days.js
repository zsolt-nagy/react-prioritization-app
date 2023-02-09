
const DAYS_DICT = {
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
}
const DAYS = Object.values(DAYS_DICT); // ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

function getDayIndex(day) {
  return DAYS.map(day => day.toLowerCase()).indexOf(day.toLowerCase());
}

function getDayValue(index) {
  return DAYS[index];
}


export {
    DAYS,
    getDayIndex,
    getDayValue,
    DAYS_DICT
}