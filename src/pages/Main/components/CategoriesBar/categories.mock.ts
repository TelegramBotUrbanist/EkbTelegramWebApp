import { mockHttp } from '../../../../shared/http.ts';
import { Category } from './categroies.atoms.ts';

const mockCategories: Category[] = [
  {
    id: 1,
    title: 'Рестораны',
    serialNumber: 1,
    innerCategoriesTitle: 'Типы ресторанов',
    innerCategories: [
      {
        id: 11,
        title: 'Фаст-фуд',
        serialNumber: 1,
      },
      {
        id: 12,
        title: 'Пиццерии',
        serialNumber: 2,
      },
      {
        id: 13,
        title: 'Гастропабы',
        serialNumber: 3,
      },
    ],
  },
  {
    id: 2,
    title: 'Кафе',
    serialNumber: 2,
    innerCategoriesTitle: 'Типы кафе',
    innerCategories: [
      {
        id: 21,
        title: 'Кофейни',
        serialNumber: 1,
      },
      {
        id: 22,
        title: 'Десертные',
        serialNumber: 2,
      },
    ],
  },
  {
    id: 3,
    title: 'Кофейни',
    serialNumber: 3,
  },
  {
    id: 4,
    title: 'Клубы',
    serialNumber: 4,
  },
];

mockHttp.onGet('/food/establishments/categories/all').reply(200, {
  categories: mockCategories,
});
