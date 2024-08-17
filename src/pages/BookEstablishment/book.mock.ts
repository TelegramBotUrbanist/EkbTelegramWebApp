import { mockHttp } from '../../shared/http.ts';
import { TableCardProps, TimeOfDay } from './book.types.ts';

// Вспомогательная функция для создания объекта времени
const createTime = (hours: number, minutes: number): TimeOfDay => ({
  hour: hours,
  minute: minutes,
  second: 0,
  nano: 0
});

// Моковые данные столов в новом формате
const tables: TableCardProps[] = [
  {
    id:0,
    tableName: "3",
    photoUrl: {
      id: 3,
      title: "restaurant3.jpg",
      imgUrl: "https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg"
    },
    capacity: 2,
    hallName: "Основной зал",
    occupied: false,
    occupiedUntil: createTime(12, 30),
    occupiedFrom: createTime(10, 0),
    nextBooking: createTime(12, 30),
    freeTimePeriodForNextBooking: createTime(1, 30),
    bookings: [
      {
        bookingStart: createTime(12, 30),
        bookingEnd: createTime(14, 30)
      },
      {
        bookingStart: createTime(14, 30),
        bookingEnd: createTime(17, 0)
      }
    ]
  },
  {
    id:1,
    tableName: "32",
    photoUrl: {
      id: 1,
      title: "restaurant1.jpg",
      imgUrl: "https://img.freepik.com/free-photo/the-adorable-illustration-of-kittens-playing-in-the-forest-generative-ai_260559-483.jpg"
    },
    capacity: 4,
    hallName: "Терраса",
    occupied: true,
    occupiedUntil: createTime(16, 0),
    occupiedFrom: createTime(14, 0),
    nextBooking: createTime(16, 0),
    freeTimePeriodForNextBooking: createTime(0, 30),
    bookings: [
      {
        bookingStart: createTime(16, 0),
        bookingEnd: createTime(16, 30)
      },
      {
        bookingStart: createTime(16, 30),
        bookingEnd: createTime(17, 30)
      },
      {
        bookingStart: createTime(17, 30),
        bookingEnd: createTime(18, 0)
      },
      {
        bookingStart: createTime(18, 30),
        bookingEnd: createTime(20, 0)
      }
    ]
  }
];

const tableDetails = [
  {
    id:0,
    tableName: "3",
    photoUrls: [{
      id: 3,
      title: "restaurant3.jpg",
      imgUrl: "https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg"
    }],
    capacity: 2,
    hallName: "Основной зал",
    locationDescription:'Описание локации',
    bookings: [
      {
        bookingStart: createTime(12, 30),
        bookingEnd: createTime(14, 30)
      },
      {
        bookingStart: createTime(14, 30),
        bookingEnd: createTime(17, 0)
      }
    ]
  },
  {
    id:1,
    tableName: "32",
    photoUrls: [{
      id: 1,
      title: "restaurant1.jpg",
      imgUrl: "https://img.freepik.com/free-photo/the-adorable-illustration-of-kittens-playing-in-the-forest-generative-ai_260559-483.jpg"
    }],
    capacity: 4,
    hallName: "Терраса",
    occupied: true,
    occupiedUntil: createTime(16, 0),
    occupiedFrom: createTime(14, 0),
    nextBooking: createTime(16, 0),
    freeTimePeriodForNextBooking: createTime(0, 30),
    bookings: [
      {
        bookingStart: createTime(16, 0),
        bookingEnd: createTime(16, 30)
      },
      {
        bookingStart: createTime(16, 30),
        bookingEnd: createTime(17, 30)
      },
      {
        bookingStart: createTime(17, 30),
        bookingEnd: createTime(18, 0)
      },
      {
        bookingStart: createTime(18, 30),
        bookingEnd: createTime(20, 0)
      }
    ]
  }
];

// Функция проверки доступности стола на основе времени
const isTableAvailable = (
  table: TableCardProps,
  date: string,
  startTime: string,
  endTime: string
): boolean => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  // Проверяем пересечение с существующими бронированиями
  return !table.bookings.some(booking => {
    const bookingStart = booking.bookingStart.hour * 60 + booking.bookingStart.minute;
    const bookingEnd = booking.bookingEnd.hour * 60 + booking.bookingEnd.minute;
    const requestStart = startHour * 60 + startMinute;
    const requestEnd = endHour * 60 + endMinute;

    return (
      (requestStart >= bookingStart && requestStart < bookingEnd) ||
      (requestEnd > bookingStart && requestEnd <= bookingEnd) ||
      (requestStart <= bookingStart && requestEnd >= bookingEnd)
    );
  });
};

// Функция фильтрации столов по количеству гостей
const filterTablesByCapacity = (tables: TableCardProps[], guests: number): TableCardProps[] => {
  return tables.filter(table => table.capacity >= guests);
};

// Обновленный мок для основного эндпоинта
mockHttp.onGet(/\/food\/establishments\/get\/(\d+)\/reservation\/available\/tables/).reply(config => {
  const { date, startTime, endTime, guests } = config.params;
  // Фильтруем столы по всем критериям
  const filteredTables = tables
    .filter(table => isTableAvailable(table, date, startTime, endTime))
    .filter(table => filterTablesByCapacity([table], parseInt(guests, 10)).length > 0);

  return [200, filteredTables];
});

// Обновленный мок для получения конкретного стола
mockHttp.onGet(/\/food\/establishments\/get\/(\d+)\/table\/(\d+)\/details/).reply(config => {
  debugger
  const tableId = config.url?.split('/')[6];
  const table = tableDetails.find(t => t.id === Number(tableId));

  if (table) {
    return [200, table];
  } else {
    return [404, { message: 'Столик не найден' }];
  }
});