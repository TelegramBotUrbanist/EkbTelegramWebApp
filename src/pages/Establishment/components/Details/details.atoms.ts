import { atom } from 'jotai';
import { http, resetApiProvider } from '../../../../shared/http.ts';
// import './details.mock.ts';
import { EstablishmentDetails } from './details.types.ts';
import { format } from 'date-fns';
import axios from 'axios';
import { mapEstablishmentDetails } from './details.mapper.ts';

// Асинхронный атом для загрузки данных заведения
export const establishmentAtom = atom(async (get) => {
  const id = get(establishmentIdAtom)
  debugger
  if(id!==null) {
    resetApiProvider()
    const response = await http.get('/food/establishments/get', {
      params: { id: id },  // Тут ID можно менять динамически
    });
    const abc = mapEstablishmentDetails(response.data)
    debugger
    return abc
  }
  return {  }
});

// Атом для получения промокода и перезапроса данных заведения
export const fetchPromoCodeAtom = atom(
  null,
  async (get, set) => {
    await http.post('/getPromoCode');

    // После успешного получения промокода, заново запрашиваем данные заведения
    const newEstablishment = await get(establishmentAtom); // Перезапрос данных заведения
    // set(establishmentAtom, newEstablishment);
  }
);


// Атом для хранения ID заведения
export const establishmentIdAtom = atom<number | null>(null); // Начальное значение - null


