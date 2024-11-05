import React from 'react';
import { useLoadableAtom } from '../../../../hooks/useLoadableAtom.ts';
import { useAtomValue } from 'jotai';
import { bookingTimeAtom } from '../../../Establishment/components/Details/components/BookingTime/time.atoms.ts';
import { format, isToday, isTomorrow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { calendarValueAtom, guestCountAtom } from '../../book.atoms.ts';
import './details.scss'

const Index = () => {
  const bookingTime = useAtomValue(bookingTimeAtom)
  const bookingDate = useAtomValue(calendarValueAtom)
  const guestCount = useAtomValue(guestCountAtom)

  function padToTwoDigits(number) {
    return number < 10 ? `0${number}` : number;
  }
  function formatDateWithPrefix(date) {
    let prefix = '';

    if (isToday(date)) {
      prefix = 'Сегодня, ';
    } else if (isTomorrow(date)) {
      prefix = 'Завтра, ';
    }
    const formattedDate = format(date, 'EEEE, d MMMM', { locale: ru });
    const startTime = `${padToTwoDigits(bookingTime.startTime.hours)}:${padToTwoDigits(bookingTime.startTime.minutes)}`;
    const endTime = `${padToTwoDigits(bookingTime.endTime.hours)}:${padToTwoDigits(bookingTime.endTime.minutes)}`;

    return `${prefix}${formattedDate}, ${startTime} - ${endTime}`;
  }
  return (
    <div className={'book_details'}>
      <h3>Детали бронирования</h3>
      <p>{formatDateWithPrefix(bookingDate)}</p>
      <span>Стол на {guestCount}</span>
    </div>
  );
};

export default Index;