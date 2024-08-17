import { mockHttp } from '../../../../shared/http.ts';
import { CostLevelEnum, EstablishmentDetails, ReservationTypeEnum, WeekDay } from './details.types.ts';

const mockEstablishment: EstablishmentDetails = {
  id: 1,
  rating: 4.4,
  imgs: [
    {
      id: 1,
      name: 'restaurant1.jpg',
      url:'https://img.freepik.com/free-photo/the-adorable-illustration-of-kittens-playing-in-the-forest-generative-ai_260559-483.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723680000&semt=ais_hybrid',

    },
    {
      id: 2,
      name: 'restaurant2.jpg',
      url:'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg'

    },
    {
      id: 3,
      name: 'restaurant3.jpg',
      url:'https://avatars.mds.yandex.net/get-mpic/1859063/img_id8310638138210677240.jpeg/orig'

    },
  ],
  categoryForEstablishmentInfoDto: {
    id: 1,
    title: 'Ресторан',
    serialNumber: 1,

  },
  innerCategoryInfo: {
    id: 11,
    title: 'Европейская кухня',
    serialNumber: 1,
  },
  title: 'Kitchen',
  locationInfo: 'Екатеринбург, Ткачей, 23, БЦ Clever Park, 23 этаж',
  openingHours: [
    {
      "weekDay": WeekDay.MONDAY,
      "from": "2024-09-03T19:02:27.473Z",
      "till": "2024-09-03T19:02:27.473Z",
      "currentDay": isToday(WeekDay.MONDAY)
    },
    {
      "weekDay": WeekDay.TUESDAY,
      "from": "2024-09-03T19:02:27.473Z",
      "till": "2024-09-03T19:02:27.473Z",
      "currentDay": isToday(WeekDay.TUESDAY)
    },
    {
      "weekDay": WeekDay.WEDNESDAY,
      "from": "2024-09-03T03:00:27.473Z",
      "till": "2024-09-03T18:00:00.473Z",
      "currentDay": isToday(WeekDay.WEDNESDAY)
    },
    {
      "weekDay": WeekDay.THURSDAY,
      "from": "2024-09-03T19:02:27.473Z",
      "till": "2024-09-03T19:02:27.473Z",
      "currentDay": isToday(WeekDay.THURSDAY)
    },
    {
      "weekDay": WeekDay.FRIDAY,
      "from": "2024-09-03T19:02:27.473Z",
      "till": "2024-09-03T19:02:27.473Z",
      "currentDay": isToday(WeekDay.FRIDAY)
    },
    {
      "weekDay": WeekDay.SATURDAY,
      "from": "2024-09-03T19:02:27.473Z",
      "till": "2024-09-03T19:02:27.473Z",
      "currentDay": isToday(WeekDay.SATURDAY)
    },
    {
      "weekDay": WeekDay.SUNDAY,
      "from": "2024-09-03T19:02:27.473Z",
      "till": "2024-09-03T19:02:27.473Z",
      "currentDay": isToday(WeekDay.SUNDAY)
    }

  ],
  description: 'Kitchen — ресторан с авторскими блюдами европейской кухни, специальной комнатой для вяления и террасой на последнем этаже бизнес-центра Clever Park. Отсюда открывается прекрасный вид на город.',
  promoCode: {
    title:'10%',
    description:'Распространяется на всё меню ресторана, за исключением барной карты. Действует с 10 мая по 10 июля.',
    code:"Купон123",
    receivedByUser:false
  },
  mapLocation: {
    latitude: '56.838926',
    longitude: '60.605702',
    mapLink:'https://yandex.ru/maps/geo/yekaterinburg/53166537/?ll=60.597465%2C56.838011&z=12',
    pointTitle:'Улица Ткачей, 23Б'
  },
  costLevel: CostLevelEnum.TWO,
  averageBill: '1700–3000 ₽',
  hasBreakfasts: false,
  hasBusinessLunches: false,
  hasDelivery: true,
  hasParking: true,
  hasCatering: false,
  hasBanquets: true,
  phoneNumbers: ['+7 (343) 288 77 48','+7 (343) 288 77 48'],
  webSiteLink: 'http://kitchen23.org',
  reservationTypeEnum: ReservationTypeEnum.BY_PHONE,
};

mockHttp.onGet('/food/establishments/get').reply(200, {
  establishment: mockEstablishment,
});

function getCurrentWeekDay(): WeekDay {
  const currentDayIndex = new Date().getDay();

  switch (currentDayIndex) {
    case 0:
      return WeekDay.SUNDAY;
    case 1:
      return WeekDay.MONDAY;
    case 2:
      return WeekDay.TUESDAY;
    case 3:
      return WeekDay.WEDNESDAY;
    case 4:
      return WeekDay.THURSDAY;
    case 5:
      return WeekDay.FRIDAY;
    case 6:
      return WeekDay.SATURDAY;
    case 7:
      return WeekDay.SUNDAY;
    default:
      throw new Error('Unknown day');
  }
}

function isToday(day: WeekDay): boolean {
  const today = getCurrentWeekDay();
  return today === day;
}

mockHttp.onPost('/getPromoCode').reply(200, {
  id : 0,
  title : '10%',
  code: 'F12HK4K2A9',
  description: 'Распространяется на всё меню ресторана, за исключением барной карты. Действует с 10 мая по 10 июля.',
  receivedByUser: true,
});
