import { atom } from 'jotai';
import { loadable } from 'jotai/utils';
import { atomWithCache } from 'jotai-cache';
// import './promocodes.mocks.ts'
import { PromoCode, PromoCodeCategory } from './promocodes.types.ts';
import { http, resetApiProvider } from '../../../../shared/http.ts';

// Базовая категория "Все"
const allCategory: PromoCodeCategory = {
  id: 0,
  title: 'Все',
  serialNumber: 0
};

// Атом для категорий
export const promoCodeCategoriesAtom = loadable(
  atomWithCache(async () => {
    resetApiProvider()
    const response = await http.get('/account/promo/code/categories');
    return [allCategory, ...response.data.categories];
  })
);

// Атом для выбранной категории
export const selectedPromoCodeCategoryAtom = atom<number>(0);

// Атом для получения промокодов
export const promoCodesAtom = loadable(
  atom(async (get) => {
    const selectedCategory = get(selectedPromoCodeCategoryAtom);
    const params = selectedCategory ? { categoryId: selectedCategory } : {};
    resetApiProvider()
    const response = await http.get('/account/promo/code/find', { params });
    return response.data.promoCodes;
  })
);

// Атом для модального окна
export const selectedPromoCodeAtom = atom<PromoCode | null>(null);

export const receivePromoCodeAtom = atom(
  null, // read value
  async (get, set, promoCode: PromoCode) => {
    try {
      resetApiProvider()
      // await http.post(`/food/establishments/receive/promo/code`, {
      //   id: promoCode.id,
      //   code: promoCode.code
      // });

      // Сбрасываем выбранный промокод
      set(selectedPromoCodeAtom, null);

      // Перезагружаем список промокодов
      const currentCategory = get(selectedPromoCodeCategoryAtom);
      const params = currentCategory ? { categoryId: currentCategory } : {};
      resetApiProvider()
      // const response = await http.get('/account/promo/code/find', { params });
      return true;
    } catch (error) {
      console.error('Failed to receive promo code:', error);
      return false;
    }
  })
