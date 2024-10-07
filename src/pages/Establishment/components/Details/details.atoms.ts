import { atom } from 'jotai';
import { http } from '../../../../shared/http.ts';
import './details.mock.ts';
import { EstablishmentDetails } from './details.types.ts';

// Асинхронный атом для загрузки данных заведения
export const establishmentAtom = atom(async () => {
  const response = await http.get('/food/establishment/get', {
    // params: { id: 0 },  // Тут ID можно менять динамически
  });
  return response.data.establishment;
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
