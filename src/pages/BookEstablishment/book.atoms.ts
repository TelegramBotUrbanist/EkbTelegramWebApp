import { atom } from 'jotai';
import './book.mock.ts';
import { establishmentIdAtom } from '../Establishment/components/Details/details.atoms.ts';
import { http } from '../../shared/http.ts';

export const calendarValueAtom = atom<Date>(new Date());
export const currentTableValueAtom = atom<number|null>();
export const tablesForDateAtom = atom(async (get) => {
  const establishmentId = get(establishmentIdAtom) ?? 0;
  const calendarValue = get(calendarValueAtom);
  debugger
  if (establishmentId===null || !calendarValue) {
    return []; // Возвращаем пустой массив, если нет ID или даты
  }

  // Форматируем дату в нужный формат YYYY-MM-DDTHH:mm
  const formattedDate = calendarValue.toISOString().split('.')[0];

  // Выполняем запрос
  const response = await http.get(`/food/establishments/get/${establishmentId}/reservation/available/tables`, {
    params: { date: formattedDate },
  });

  return response.data; // Возвращаем доступные столики
});

export const fetchCurrentTable = atom(async (get) => {
  const establishmentId = get(establishmentIdAtom) ?? 0;
  const currTableID = get(currentTableValueAtom) ?? 0;



  // Форматируем дату в нужный формат YYYY-MM-DDTHH:mm

  // Выполняем запрос
  const response = await http.get(`/food/establishments/get/${establishmentId}/reservation/available/tables/${currTableID}`, {
  params:{tableId:currTableID}
  });
  debugger


  return response.data; // Возвращаем доступные столики
});

export const contactDataAtom = atom({
  name:'',
  phone:'',
  comment:'',
  promo:''
})
