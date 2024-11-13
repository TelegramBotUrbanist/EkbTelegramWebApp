import React from 'react';
import { useLoadableAtom } from '../../../../hooks/useLoadableAtom.ts';
import { useAtomValue } from 'jotai';
import { bookingTimeAtom } from '../../../Establishment/components/Details/components/BookingTime/time.atoms.ts';
import { format, isToday, isTomorrow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { calendarValueAtom, guestCountAtom } from '../../book.atoms.ts';
import './details.scss'
import { formatDateWithPrefix } from '../../../../utils/date.ts';

const Index = () => {
  const bookingTime = useAtomValue(bookingTimeAtom)
  const bookingDate = useAtomValue(calendarValueAtom)
  const guestCount = useAtomValue(guestCountAtom)


  return (
    <div className={'book_details'}>
      <h3>Детали бронирования</h3>
      <p>{formatDateWithPrefix(bookingDate,bookingTime.startTime,bookingTime.endTime)}</p>
      <span>Стол на {guestCount}</span>
    </div>
  );
};

export default Index;