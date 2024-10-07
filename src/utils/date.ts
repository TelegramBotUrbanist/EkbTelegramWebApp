import { WeekDay } from '../pages/Establishment/components/Details/details.types.ts';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

function getCurrentWeekDay(): WeekDay {
  const currentDayIndex = new Date().getDay();

  switch (currentDayIndex) {
    case 0:
      return WeekDay.SUNDAY;
    case 1:
      return WeekDay.MONDAY;
    case 2:
      return WeekDay.TUESDAY;
    case 3:
      return WeekDay.WEDNESDAY;
    case 4:
      return WeekDay.THURSDAY;
    case 5:
      return WeekDay.FRIDAY;
    case 6:
      return WeekDay.SATURDAY;
    case 7:
      return WeekDay.SUNDAY;
    default:
      throw new Error('Unknown day');
  }
}

export function isToday(day: WeekDay): boolean {
  const today = getCurrentWeekDay();
  return today === day;
}

export const formatDate = (date) => {
  return format(date, 'eeee, d MMMM', { locale: ru });
};