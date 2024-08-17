
// Мок категорий
import { mockHttp } from '../../../../shared/http.ts';

mockHttp.onGet('/account/promo/code/categories').reply(200, {
  categories: [
    { id: 1, title: 'Рестораны', serialNumber: 1 },
    { id: 2, title: 'Кофейни', serialNumber: 2 },
    { id: 3, title: 'Кино', serialNumber: 3 }
  ]
});

// Моковые данные промокодов
const promoCodes = [
  {
    id: 1,
    title: 'Kitchen',
    description: 'Распространяется на всё меню ресторана',
    code: 'KITCHEN10',
    receivedByUser: false,
    discount: 10,
    image: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg'
  },
  {
    id: 2,
    title: 'Гастроли',
    description: 'Распространяется на всё меню ресторана',
    code: 'GASTRO5',
    receivedByUser: true,
    discount: 5,
    image: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg'
  }
  // Добавьте больше моковых данных
];

// Мок для получения промокодов
mockHttp.onGet('/account/promo/code/find').reply((config) => {
  const { categoryId } = config.params;
  let filteredCodes = promoCodes;

  if (categoryId) {
    filteredCodes = promoCodes.filter(code => code.categoryId === parseInt(categoryId));
  }

  return [200, { promoCodes: filteredCodes }];
});
