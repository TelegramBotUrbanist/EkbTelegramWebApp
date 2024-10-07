import { atom } from 'jotai';

// Атом для хранения данных о мероприятиях
import { atom } from 'jotai';
import { loadable } from 'jotai/utils';
import { searchValueAtom } from '../../components/SearchBar/search.atom.ts';
import { http } from '../../shared/http.ts';
import { atomWithCache } from 'jotai-cache';
import { mapDto } from '../../utils/mapper.ts';
import '../../components/ImageSlider/slider.mock.ts';
import './events.mocks.ts'


// Атом для списка мероприятий
export const selectedEventSubcategoriesAtom = atom<number[]>([]);
export const selectedEventCategoryAtom = atom<number | null>(null);
export const eventsAtom = atom<Promise<any>>(async (get) => {
  const searchValue = get(searchValueAtom); // Значение поиска
  const selectedCategory = get(selectedEventCategoryAtom); // Выбранная категория мероприятий
  const selectedInnerCategories = get(selectedEventSubcategoriesAtom); // Выбранные подкатегории мероприятий

  let url = '/events/find/for/all/categories';  // URL по умолчанию для всех категорий
  let params: any = { searchValue };

  if (selectedCategory) {
    // Если выбрана категория, меняем URL и добавляем параметры
    url = '/events/find';
    params = {
      ...params,
      categoryId: selectedCategory.toString(),
      innerCategoriesIds: selectedInnerCategories.length ? selectedInnerCategories : undefined,
    };
  }

  const response = await http.get(url, { params });

  return response;  // Возвращаем данные мероприятий
});

export interface EventCategory {
  id: number;
  title: string;
  serialNumber: number;
  innerCategoriesTitle?: string;
  innerCategories?: Omit<EventCategory, "innerCategoriesTitle">[];
}

// Статическая категория "Все"
const allEventCategory: EventCategory = {
  id: 0,
  title: 'Все',
  serialNumber: 0,
};

export const eventCategoriesAtom = loadable(atomWithCache<Promise<EventCategory[]>>(async () => {
  const response = await http.get<{ categories: EventCategory[] }>(
    '/events/categories/all'  // URL для получения всех категорий мероприятий
  );
  const rawCategories = response.data.categories;

  const categories: EventCategory[] = rawCategories.map((category: any) =>
    mapDto<EventCategory>(category, null)
  );

  return [allEventCategory, ...categories];  // Добавляем статическую категорию "Все"
}));


export const imagesAtom = atom(async (get) => {
  const response = await http.get('/events/slider/content');
  return response.data;
});

// Atom для хранения текущего индекса изображения

export const eventCollectionsAtom = atomWithCache(async (get) => {
  const response = await http.get('/events/selections/all');
  return response.data;
});

export const eventAtom = atom(async () => {
  const response = await http.get('/events/establishment/get', {
    // params: { id: 0 },  // Тут ID можно менять динамически
  });
  debugger
  return response.data?.establishment ?? response.data;
});