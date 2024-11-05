import { atom } from 'jotai';
import './book.mock.ts';
import { establishmentIdAtom } from '../Establishment/components/Details/details.atoms.ts';
import { http } from '../../shared/http.ts';
import { bookingTimeAtom } from '../Establishment/components/Details/components/BookingTime/time.atoms.ts';
import { TableCardProps } from './book.types.ts';

export const calendarValueAtom = atom<Date>(new Date());
export const guestCountAtom = atom<number>(1);
export const currentTableValueAtom = atom<TableCardProps>();

export const tablesForDateAtom = atom(async (get) => {
  const establishmentId = get(establishmentIdAtom) ?? 0;
  const calendarValue = get(calendarValueAtom);
  const bookingTime = get(bookingTimeAtom)
  const startTime = `${bookingTime.startTime.hours.padStart(2,'0')}:${bookingTime.startTime.minutes.padStart(2,'0')}`
  const endTime = `${bookingTime.endTime.hours.padStart(2,'0')}:${bookingTime.endTime.minutes.padStart(2,'0')}`
  const guests = get(guestCountAtom);
  debugger
  if (establishmentId===null || !calendarValue || !startTime || !endTime || !guests) {
    return [];
  }

  const formattedDate = calendarValue.toISOString().split('T')[0].replace(/-/g, '.');

  const response = await http.get(
    `/food/establishments/get/${establishmentId}/reservation/available/tables`,
    {
      params: {
        date: formattedDate,
        startTime,
        endTime,
        guests
      },
    }
  );

  return response.data;
});
export const fetchCurrentTable = atom(async (get) => {
  debugger
  const establishmentId = get(establishmentIdAtom) ?? 0;
  const currTableID = get(currentTableValueAtom).id;



  const response = await http.get(`/food/establishments/get/${establishmentId}/table/${currTableID}/details`, {
  params:{tableId:currTableID}
  });

  debugger
  return {table:response.data}; // Возвращаем доступные столики
});

export const contactDataAtom = atom({
  name:'',
  phone:'',
  comment:'',
  promo:''
})
