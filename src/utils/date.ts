import { WeekDay } from '../pages/Establishment/components/Details/details.types.ts';
import {format, getMonth, isBefore, isSameMonth, parseISO} from 'date-fns';
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

export const formatDateTime = (dateTime) => {
  const date = parseISO(dateTime);

// Форматирование даты в нужный формат: "8 октября в 19:00"
  const formattedDate = format(date, "d MMMM 'в' HH:mm", { locale: ru });
  return formattedDate
}

const months = [
  'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
  'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
];

export const formatPeriod = (startDate, endDate) => {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  const now = new Date();

  // Проверка, началось ли мероприятие
  if (isBefore(now, start)) {
    // Мероприятие еще не началось
    return `С ${format(start, 'd')} ${months[getMonth(start)]}`;
  } else if (isBefore(now, end)) {
    // Мероприятие уже идет
    if (isSameMonth(start, end)) {
      // Начало и конец в одном месяце
      return 'Уже идет';
    } else {
      // Разные месяцы
      return `${months[getMonth(start)]} - ${months[getMonth(end)]}`;
    }
  } else {
    // Мероприятие завершилось
    return `Завершилось ${format(end, 'd')} ${months[getMonth(end)]}`;
  }
};
