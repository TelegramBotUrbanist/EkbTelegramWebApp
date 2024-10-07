import { Category } from '../Main/components/CategoriesBar/categroies.atoms.ts';
import { mockHttp } from '../../shared/http.ts';
import {
  EstablishmentListResponse,
  EstablishmentMapResponse,
} from '../Main/components/CategorySection/categorySection.types.ts';
import {
  CostLevelEnum,
  EstablishmentDetails,
  ReservationTypeEnum,
  WeekDay,
} from '../Establishment/components/Details/details.types.ts';
import { isToday } from 'date-fns';
import { EventDetails } from './events.types.ts';
const mockEventCategories: Category[] = [
  {
    id: 1,
    title: 'Кино',
    serialNumber: 1,
    innerCategoriesTitle: 'Типы кино',
    innerCategories: [
      {
        id: 11,
        title: 'Художественные фильмы',
        serialNumber: 1,
      },
      {
        id: 12,
        title: 'Документальные фильмы',
        serialNumber: 2,
      },
      {
        id: 13,
        title: 'Анимация',
        serialNumber: 3,
      },
    ],
  },
  {
    id: 2,
    title: 'Концерты',
    serialNumber: 2,
    innerCategoriesTitle: 'Типы концертов',
    innerCategories: [
      {
        id: 21,
        title: 'Рок-концерты',
        serialNumber: 1,
      },
      {
        id: 22,
        title: 'Классическая музыка',
        serialNumber: 2,
      },
    ],
  },
  {
    id: 3,
    title: 'Театры',
    serialNumber: 3,
  },
  {
    id: 4,
    title: 'Стендап',
    serialNumber: 4,
  },
];

mockHttp.onGet('/events/categories/all').reply(200, {
  categories: mockEventCategories,
});




// Мок для данных в формате мапы (для /food/establishments/find/for/all/categories)
const mockEventMapData: EstablishmentMapResponse = {
  1: [
    {
      id: 1,
      title: 'Фильм: Вечное сияние чистого разума',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 8.5,
      categoryForEstablishmentInfoDto: { id: 1, title: 'Кино' },
      innerCategoryInfo: { id: 11, title: 'Художественные фильмы', serialNumber: 1 },
      promotionExist: true,
    },
    {
      id: 2,
      title: 'Фильм: Доктор Стрэндж',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 7.9,
      categoryForEstablishmentInfoDto: { id: 1, title: 'Кино' },
      innerCategoryInfo: { id: 12, title: 'Документальные фильмы', serialNumber: 2 },
      promotionExist: false,
    },
    {
      id: 5,
      title: 'Фильм: Доктор Стрэндж',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 7.9,
      categoryForEstablishmentInfoDto: { id: 1, title: 'Кино' },
      innerCategoryInfo: { id: 12, title: 'Документальные фильмы', serialNumber: 2 },
      promotionExist: false,
    },
    {
      id: 6,
      title: 'Фильм: Доктор Стрэндж',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 7.9,
      categoryForEstablishmentInfoDto: { id: 1, title: 'Кино' },
      innerCategoryInfo: { id: 12, title: 'Документальные фильмы', serialNumber: 2 },
      promotionExist: false,
    },
  ],
  2: [
    {
      id: 3,
      title: 'Концерт: Ария - Группа Мечты',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 9.0,
      categoryForEstablishmentInfoDto: { id: 2, title: 'Концерты' },
      innerCategoryInfo: { id: 21, title: 'Рок-концерты', serialNumber: 1 },
      promotionExist: false,
    },
    {
      id: 4,
      title: 'Концерт: Петр Чайковский - Лебединое озеро',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 9.5,
      categoryForEstablishmentInfoDto: { id: 2, title: 'Концерты' },
      innerCategoryInfo: { id: 22, title: 'Классическая музыка', serialNumber: 2 },
      promotionExist: true,
    },
    {
      id: 7,
      title: 'Концерт: Ария - Группа Мечты',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 9.0,
      categoryForEstablishmentInfoDto: { id: 2, title: 'Концерты' },
      innerCategoryInfo: { id: 21, title: 'Рок-концерты', serialNumber: 1 },
      promotionExist: false,
    },
    {
      id: 8,
      title: 'Концерт: Ария - Группа Мечты',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 9.0,
      categoryForEstablishmentInfoDto: { id: 2, title: 'Концерты' },
      innerCategoryInfo: { id: 21, title: 'Рок-концерты', serialNumber: 1 },
      promotionExist: false,
    },
  ],
  3: [
    {
      id: 9,
      title: 'Театр: Ромео и Джульетта',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 8.9,
      categoryForEstablishmentInfoDto: { id: 3, title: 'Театры' },
      innerCategoryInfo: null,
      promotionExist: false,
    },
    {
      id: 10,
      title: 'Театр: Вишневый сад',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 8.7,
      categoryForEstablishmentInfoDto: { id: 3, title: 'Театры' },
      innerCategoryInfo: null,
      promotionExist: true,
    },
    {
      id: 11,
      title: 'Театр: Ромео и Джульетта',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 8.9,
      categoryForEstablishmentInfoDto: { id: 3, title: 'Театры' },
      innerCategoryInfo: null,
      promotionExist: false,
    },
    {
      id: 12,
      title: 'Театр: Ромео и Джульетта',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 8.9,
      categoryForEstablishmentInfoDto: { id: 3, title: 'Театры' },
      innerCategoryInfo: null,
      promotionExist: false,
    },
  ],
  4: [
    {
      id: 7,
      title: 'Стендап: Илья Соболев',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 9.3,
      categoryForEstablishmentInfoDto: { id: 4, title: 'Стендап' },
      innerCategoryInfo: null,
      promotionExist: true,
    },
    {
      id: 8,
      title: 'Стендап: Алексей Щербаков',
      imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
      serialNumber: 9.1,
      categoryForEstablishmentInfoDto: { id: 4, title: 'Стендап' },
      innerCategoryInfo: null,
      promotionExist: false,
    },
  ],
};

mockHttp.onGet('/events/find/for/all/categories').reply(200, mockEventMapData);

const mockEventListData: EstablishmentListResponse = [
  {
    id: 9,
    title: 'Фильм: Дюна',
    imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
    serialNumber: 9.0,
    categoryForEstablishmentInfoDto: { id: 1, title: 'Кино' },
    innerCategoryInfo: { id: 12, title: 'Документальные фильмы', serialNumber: 2 },
    promotionExist: true,
  },
  {
    id: 10,
    title: 'Концерт: Metallica - World Tour',
    imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
    serialNumber: 9.8,
    categoryForEstablishmentInfoDto: { id: 2, title: 'Концерты' },
    innerCategoryInfo: { id: 21, title: 'Рок-концерты', serialNumber: 1 },
    promotionExist: true,
  },
  {
    id: 11,
    title: 'Театр: Король Лир',
    imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
    serialNumber: 8.5,
    categoryForEstablishmentInfoDto: { id: 3, title: 'Театры' },
    innerCategoryInfo: null,
    promotionExist: false,
  },
  {
    id: 12,
    title: 'Стендап: Павел Воля',
    imgUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
    serialNumber: 9.3,
    categoryForEstablishmentInfoDto: { id: 4, title: 'Стендап' },
    innerCategoryInfo: null,
    promotionExist: true,
  },
];

mockHttp.onGet('/events/find').reply(200, mockEventListData);

const mockEventCollections = [
  {
    id: 1,
    imageUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
    title: 'Лучшие фильмы 2024 года',
  },
  {
    id: 2,
    imageUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
    title: 'Топ концертов лета',
  },
  {
    id: 3,
    imageUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
    title: 'Шоу, которые стоит увидеть',
  },
  {
    id: 4,
    imageUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
    title: 'Лучшие стендап выступления',
  },
];

mockHttp.onGet('/events/selections/all').reply(200, mockEventCollections);


const mockImages = [
  // 'https://img.freepik.com/free-photo/the-adorable-illustration-of-kittens-playing-in-the-forest-generative-ai_260559-483.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723680000&semt=ais_hybrid',
  // 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
  // 'https://avatars.mds.yandex.net/get-mpic/1859063/img_id8310638138210677240.jpeg/orig',
  // 'https://img.freepik.com/free-photo/the-adorable-illustration-of-kittens-playing-in-the-forest-generative-ai_260559-483.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723680000&semt=ais_hybrid',
  'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
  'https://avatars.mds.yandex.net/get-mpic/1859063/img_id8310638138210677240.jpeg/orig',
  // 'https://avatars.mds.yandex.net/get-mpic/1859063/img_id8310638138210677240.jpeg/orig',
  // 'https://avatars.mds.yandex.net/get-mpic/1859063/img_id8310638138210677240.jpeg/orig',
];

mockHttp.onGet('/events/slider/content').reply(200, mockImages);


const mockEvent: any = {
  id: 1,
  rating: 4.9,
  imgs: [
    {
      id: 1,
      name: 'event1.jpg',
      url: 'https://img.freepik.com/free-photo/concert-stage-with-bright-lights_140725-213.jpg',
    },
    {
      id: 2,
      name: 'event2.jpg',
      url: 'https://img.freepik.com/free-photo/musical-concert-at-night_140725-204.jpg',
    },
    {
      id: 3,
      name: 'event3.jpg',
      url: 'https://img.freepik.com/free-photo/rock-concert-at-night_140725-193.jpg',
    },
  ],
  categoryForEstablishmentInfoDto: {
    id: 1,
    title: 'Мероприятие',
    serialNumber: 1,
  },
  innerCategoryInfo: {
    id: 11,
    title: 'Концерт',
    serialNumber: 1,
  },
  title: 'Концерт группы Coldplay',
  locationInfo: 'Москва, Олимпийский стадион, Лужники, ул. Лужники, 24',
  openingHours: [
    {
      weekDay: WeekDay.FRIDAY,
      from: '2024-05-20T18:00:00.473Z',
      till: '2024-05-20T22:00:00.473Z',
      currentDay: true, // Мы вызвали isToday, результат должен быть логическим значением
    },
    {
      weekDay: WeekDay.SATURDAY,
      from: '2024-05-21T18:00:00.473Z',
      till: '2024-05-21T22:00:00.473Z',
      currentDay: false,
    },
  ],
  description:
    'Coldplay возвращаются с новым туром в поддержку их последнего альбома "Music of the Spheres". Это будет незабываемый концерт с потрясающими визуальными эффектами и хитами, которые любят миллионы.',
  promoCode: {
    title: 'Скидка 5% на билеты',
    description: 'Используйте этот промокод для получения скидки при покупке билетов на концерт Coldplay.',
    code: 'COLDPLAY2024',
    receivedByUser: false,
  },
  mapLocation: {
    latitude: '55.715763',
    longitude: '37.553944',
    mapLink:
      'https://yandex.ru/maps/geo/luzhniki/53166537/?ll=37.553944%2C55.715763&z=12',
    pointTitle: 'Олимпийский стадион Лужники',
  },
  ageLevel: '0',
  averageBill: '3500–12000 ₽',
  hasBreakfasts: false,
  hasBusinessLunches: false,
  hasDelivery: false,
  hasParking: true,
  hasCatering: false,
  hasBanquets: false,
  phoneNumbers: ['+7 (495) 123-45-67'],
  webSiteLink: 'https://coldplayconcert2024.com',
};

mockHttp.onGet('/events/establishment/get').reply(200, mockEvent);
