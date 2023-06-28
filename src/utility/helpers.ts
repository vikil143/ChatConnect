import {MONTHS, WEEKS} from './constants';

export const randomNumber = (min: number, max: number): number =>
  Math.ceil(Math.random() * (max - min) + min);

export const getDate = (date: Date) => date.getDate();

export const getMonth = (date: Date) => date.getMonth();

export const getYear = (date: Date) => date.getFullYear();

export const getWeek = (date: Date) => date.getDay();

export const getDDMonthYYYY = (date: Date) =>
  getDate(date) + ' ' + MONTHS[getMonth(date)] + ' ' + getYear(date);

export const formatDateByTime = (date: Date) =>
  date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
// `${date.getHours()}:${date.getMinutes()}`;

export const isBothAreMatchedDates = (date1: Date, date2: Date) => {
  if (getYear(date1) !== getYear(date2)) return false;
  if (getMonth(date1) !== getMonth(date2)) return false;
  if (getDate(date1) !== getDate(date2)) return false;
  return true;
};

export const normalizeMonthGreater = (month: number, no: number = 1) =>
  month > 10 || month < 1 ? 0 - no : month;

export const normalizeMonthLess = (month: number, no: number = 1) =>
  month < 1 ? 11 + no : month;

export const getFormattedDate = (date: Date) => {
  const today = new Date();
  // let year = getYear(date);
  if (getYear(date) !== getYear(today)) return getDDMonthYYYY(date);
  // if ( getMonth(today) ) return getDDMonthYYYY(date);
  // if (normalizeMonthLess(getMonth(today)) - 1 !== getMonth(date))
  //   return getDDMonthYYYY(date);
  if (getMonth(date) !== getMonth(today)) return getDDMonthYYYY(date);
  if (getDate(today) - 6 > getDate(date)) return getDDMonthYYYY(date);
  if (getDate(today) - 1 > getDate(date)) return WEEKS[getWeek(date)];
  if (getDate(today) - 1 === getDate(date)) return 'Yesterday';
  return 'Today';
};

// Fomatted date having this issues
