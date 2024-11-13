import { atom } from 'jotai';
import { atomWithCache } from 'jotai-cache';
import { loadable } from 'jotai/utils';
import './favorites.mocks.ts'
import { Category } from '../../../Main/components/CategoriesBar/categroies.atoms.ts';
import { http } from '../../../../shared/http.ts';

// Базовая категория "Все"
const allCategory: Category = {
  id: 0,
  title: 'Все',
  serialNumber: 0
};

// Атом для категорий
export const favoriteCategoriesAtom = loadable(
  atomWithCache(async () => {
    const response = await http.get('/account/favorite/categories');
    return [allCategory, ...response.data.categories];
  })
);

// Атом для выбранной категории
export const selectedFavoriteCategoryAtom = atom<number>(0);

// Атом для получения избранных объектов
export const favoritesAtom =loadable(
  atom(async (get) => {
    const selectedCategory = get(selectedFavoriteCategoryAtom);

    if (selectedCategory === 0) {
      const response = await http.get('/account/favorite/find/for/all/categories');
      return response.data.favoriteObjectsList;
    }

    const response = await http.get('/account/favorite/find', {
      params: { categoryId: selectedCategory }
    });
    return response.data.favoriteObjectsList;
  })
);
