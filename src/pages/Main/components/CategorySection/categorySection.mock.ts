import { mockHttp } from '../../../../shared/http.ts';
import { EstablishmentMapResponse, EstablishmentListResponse } from './categorySection.types.ts';

// Мок для данных в формате мапы (для /food/establishments/find/for/all/categories)
const mockMapData: EstablishmentMapResponse = {
  1: [
    {
      id: 1,
      title: 'Своя компания',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 4.2,
      categoryForEstablishmentInfoDto: { id: 1, title: 'Кафе' },
      innerCategoryInfo: null,
      promotionExist: true,
    },
    {
      id: 2,
      title: 'Su Mo',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 4.8,
      categoryForEstablishmentInfoDto: { id: 1, title: 'Кафе' },
      innerCategoryInfo: null,
      promotionExist: false,
    },
    {
      id: 3,
      title: 'Поль-бейкер',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 4.9,
      categoryForEstablishmentInfoDto: { id: 1, title: 'Кафе' },
      innerCategoryInfo: null,
      promotionExist: false,
    },
  ],
  2: [
    {
      id: 4,
      title: 'Шоко',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 4.4,
      categoryForEstablishmentInfoDto: { id: 2, title: 'Кофейни' },
      innerCategoryInfo: null,
      promotionExist: false,
    },
    {
      id: 5,
      title: '21 Cups',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 4.8,
      categoryForEstablishmentInfoDto: { id: 2, title: 'Кофейни' },
      innerCategoryInfo: null,
      promotionExist: true,
    },
  ],
  3: [
    {
      id: 6,
      title: 'Барбара',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 4.9,
      categoryForEstablishmentInfoDto: { id: 3, title: 'Рестораны' },
      innerCategoryInfo: null,
      promotionExist: false,
    },
    {
      id: 7,
      title: 'Итальянец',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 4.2,
      categoryForEstablishmentInfoDto: { id: 3, title: 'Рестораны' },
      innerCategoryInfo: null,
      promotionExist: true,
    },
    {
      id: 8,
      title: 'Гастроли',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 4.8,
      categoryForEstablishmentInfoDto: { id: 3, title: 'Рестораны' },
      innerCategoryInfo: null,
      promotionExist: false,
    },
  ],
};

// Мок для данных в формате списка (для /food/establishments/find)
const mockListData: EstablishmentListResponse = [
  {
    id: 9,
    title: 'Su Mo',
    imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
    serialNumber: 4.8,
    categoryForEstablishmentInfoDto: { id: 1, title: 'Кафе' },
    innerCategoryInfo: { id: 1, title: 'Пиццерия', serialNumber: 1 },
    promotionExist: true,
  },
  {
    id: 10,
    title: 'Гастроли',
    imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
    serialNumber: 4.8,
    categoryForEstablishmentInfoDto: { id: 3, title: 'Рестораны' },
    innerCategoryInfo: { id: 2, title: 'Стейкхаус', serialNumber: 2 },
    promotionExist: true,
  },
  {
    id: 11,
    title: 'Kitchen',
    imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
    serialNumber: 4.9,
    categoryForEstablishmentInfoDto: { id: 3, title: 'Рестораны' },
    innerCategoryInfo: { id: 3, title: 'Морепродукты', serialNumber: 3 },
    promotionExist: false,
  },
  {
    id: 12,
    title: 'Свой Бар',
    imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
    serialNumber: 4.5,
    categoryForEstablishmentInfoDto: { id: 4, title: 'Бары' },
    innerCategoryInfo: { id: 4, title: 'Пабы', serialNumber: 1 },
    promotionExist: false,
  },
  {
    id: 13,
    title: 'Джаз-клуб',
    imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
    serialNumber: 4.7,
    categoryForEstablishmentInfoDto: { id: 4, title: 'Бары' },
    innerCategoryInfo: { id: 5, title: 'Коктейльные бары', serialNumber: 2 },
    promotionExist: true,
  },
  {
    id: 14,
    title: 'Поль-бейкер',
    imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
    serialNumber: 4.9,
    categoryForEstablishmentInfoDto: { id: 1, title: 'Кафе' },
    innerCategoryInfo: null,
    promotionExist: false,
  },
];

mockHttp.onGet('/food/establishments/find/for/all/categories').reply(200, mockMapData);
mockHttp.onGet('/food/establishments/find').reply(200, mockListData);
