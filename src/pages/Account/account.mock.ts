// pages/Account/account.mocks.ts
import { ReservationObject, ReservationStatus } from './account.types';
import { mockHttp } from '../../shared/http.ts';

const mockReservations: ReservationObject[] = [
  {
    id: 1,
    type: 'FOOD_ESTABLISHMENT',
    title: 'Kitchen',
    image: {
      id: 1,
      filename: 'kitchen.jpg',
      url: 'https://img.freepik.com/free-photo/the-adorable-illustration-of-kittens-playing-in-the-forest-generative-ai_260559-483.jpg'
    },
    serialNumber: 1,
    categoryInfoDto: {
      id: 1,
      title: 'Европейская'
    },
    innerCategoryInfo: {
      id: 11,
      title: 'Европейская кухня',
      serialNumber: 1,
    },
    reservationBidInfoList: [
      {
        id: 1,
        date: '2024-11-13',
        startTime: { hour: 17, minute: 0 },
        endTime: { hour: 19, minute: 0 },
        tableTitle: 'Стол №3',
        guestsCount: 1,
        reservationStatus: 'WAITING' as ReservationStatus
      },
      // {
      //   id: 2,
      //   date: '2024-06-23',
      //   startTime: { hour: 17, minute: 0 },
      //   endTime: { hour: 19, minute: 0 },
      //   tableTitle: 'Стол №3',
      //   guestsCount: 1,
      //   reservationStatus: 'REJECTED' as ReservationStatus
      // },
      // {
      //   id: 3,
      //   date: '2024-06-23',
      //   startTime: { hour: 17, minute: 0 },
      //   endTime: { hour: 19, minute: 0 },
      //   tableTitle: 'Стол №3',
      //   guestsCount: 1,
      //   reservationStatus: 'REJECTED' as ReservationStatus
      // },{
      //   id: 4,
      //   date: '2024-06-23',
      //   startTime: { hour: 17, minute: 0 },
      //   endTime: { hour: 19, minute: 0 },
      //   tableTitle: 'Стол №3',
      //   guestsCount: 1,
      //   reservationStatus: 'REJECTED' as ReservationStatus
      // },{
      //   id: 5,
      //   date: '2024-06-23',
      //   startTime: { hour: 17, minute: 0 },
      //   endTime: { hour: 19, minute: 0 },
      //   tableTitle: 'Стол №3',
      //   guestsCount: 1,
      //   reservationStatus: 'REJECTED' as ReservationStatus
      // }
    ],
    promotionExist: true,
    inFavorites: true
  }
];

// Мокаем GET запрос для получения списка бронирований
mockHttp.onGet('/account/reservation/objects/find').reply(200, {
  objectReservationsInfoList: mockReservations
});

// Мокаем GET запрос для получения категорий бронирований
mockHttp.onGet('/account/reservation/categories').reply(200, [
  {
    id: 1,
    title: 'Рестораны',
    serialNumber: 1
  },
  {
    id: 2,
    title: 'Мероприятия',
    serialNumber: 2
  }
]);

// Мокаем POST запрос для отмены бронирований
mockHttp.onPost('/account/reservation/objects/cancel').reply(200);

mockHttp.onGet('/account/reservation/categories').reply(200, [
  {
    id: 1,
    title: 'Рестораны',
    serialNumber: 1,
    innerCategories: [
      {
        id: 11,
        title: 'Европейская кухня',
        serialNumber: 1
      },
      {
        id: 12,
        title: 'Азиатская кухня',
        serialNumber: 2
      }
    ]
  },
  {
    id: 2,
    title: 'Мероприятия',
    serialNumber: 2,
    innerCategories: [
      {
        id: 21,
        title: 'Концерты',
        serialNumber: 1
      },
      {
        id: 22,
        title: 'Выставки',
        serialNumber: 2
      }
    ]
  }
]);