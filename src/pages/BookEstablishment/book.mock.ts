import { mockHttp } from '../../shared/http.ts';
import { TableCardProps } from './book.types.ts';

const tables:{restarauntName:string,tables:TableCardProps[]} = {
  restarauntName:'Kitchen',
  tables:[
  {
    id: 0,
    title: "3",
    locationDescription: "Основной зал",
    occupiedDates: [new Date('2024-10-04'), new Date('2024-10-05')],
    description: "Небольшой столик для 2 гостей",
    capacity: 2,
    occupiedPeriods: [
      { occupiedFrom: "10:00", occupiedTo: "12:00" },
      { occupiedFrom: "12:30", occupiedTo: "13:30" },
      { occupiedFrom: "14:00", occupiedTo: "15:00" },
      { occupiedFrom: "16:00", occupiedTo: "17:00" },
      { occupiedFrom: "18:00", occupiedTo: "19:00" },
      { occupiedFrom: "20:00", occupiedTo: "21:00" }
    ],
    imgs: [
      {
        id: 3,
        title: 'restaurant3.jpg',
        imageUrl:'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg'

      },
    ],
  },
  {
    id: 1,
    title: "5",
    locationDescription: "Терраса",
    occupiedDates: [new Date('2024-10-04')],
    description: "Уютный столик для 4 гостей",
    capacity: 4,
    occupiedPeriods: [
      { occupiedFrom: "12:00", occupiedTo: "14:00" },
      { occupiedFrom: "16:00", occupiedTo: "18:00" }
    ],
    imgs: [
      {
        id: 1,
        title: 'restaurant1.jpg',
        imageUrl:'https://img.freepik.com/free-photo/the-adorable-illustration-of-kittens-playing-in-the-forest-generative-ai_260559-483.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723680000&semt=ais_hybrid',

      },
      {
        id: 2,
        title: 'restaurant2.jpg',
        imageUrl:'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg'

      },
      {
        id: 3,
        title: 'restaurant3.jpg',
        imageUrl:'https://avatars.mds.yandex.net/get-mpic/1859063/img_id8310638138210677240.jpeg/orig'

      },
    ],
  },
]};

const filterTablesByDate = (date: Date) => {
  return {restarauntName: tables.restarauntName,availableTables:tables.tables.filter(table => {
    // Проверяем, есть ли дата в occupiedDates
    const isDateOccupied = table.occupiedDates.some(occupiedDate => {
      const occupiedDateStr = occupiedDate.toISOString().split('T')[0];
      const targetDateStr = date.toISOString().split('T')[0];
      return occupiedDateStr === targetDateStr; // Сравниваем только дату
    });

    return !isDateOccupied; // Возвращаем только те столики, которые не заняты в выбранную дату
  })}
};

const getTableById = (tableId: number) => {
  return tables.tables.find(table => table.id === tableId);
};

// Настройка мока для запроса по столу
mockHttp.onGet(/\/food\/establishments\/get\/(\d+)\/reservation\/available\/tables\/(\d+)/).reply(config => {
  debugger
  const { tableId } = config.params; // Получаем ID столика из параметров
  const table = getTableById(parseInt(tableId, 10)); // Ищем столик по ID

  if (table) {
    return [200, { table }]; // Возвращаем найденный столик
  } else {
    return [404, { message: 'Столик не найден' }]; // Если стол не найден, возвращаем 404
  }
});

// Настройка мока для запроса
mockHttp.onGet(/\/food\/establishments\/get\/(\d+)\/reservation\/available\/tables/).reply(config => {
  const { id } = config.params; // Получаем id заведения из запроса
  const dateString = config.params.date; // Получаем дату из параметров запроса
  const date = new Date(dateString); // Преобразуем строку в объект Date

  const { restarauntName,availableTables } = filterTablesByDate(date); // Фильтруем столики по дате

  return [200, { id,restarauntName, availableTables }]; // Возвращаем ответ
});