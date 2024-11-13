import { mockHttp } from '../../../../shared/http.ts';
import { EventType } from '../../../Main/components/CategorySection/categorySection.types.ts';

mockHttp.onGet('/account/favorite/categories').reply(200, {
  categories: [
    {
      id: 1,
      title: 'Рестораны',
      serialNumber: 1
    },
    {
      id: 2,
      title: 'Кафе',
      serialNumber: 2
    },
    {
      id: 3,
      title: 'Кофейни',
      serialNumber: 3
    }
  ]
});

const favoriteItems = [
  {
    id: 1,
    type: EventType.DATE_TIME,
    title: 'Kitchen',
    imgUrl: 'https://img.freepik.com/free-photo/the-adorable-illustration-of-kittens-playing-in-the-forest-generative-ai_260559-483.jpg',
    serialNumber: 1,
    categoryForEstablishmentInfoDto: {
      id: 1,
      title: 'Европейская'
    },
    innerCategoryInfo: null,
    promotionExist: true,
    inFavorites: true,
    entityType: 'FOOD_ESTABLISHMENT'
  },
  // Добавьте больше моковых данных по необходимости
];

mockHttp.onGet('/account/favorite/find').reply((config) => {
  const categoryId = config.params?.categoryId;
  if (categoryId) {
    return [200, {
      favoriteObjectsList: favoriteItems.filter(
        item => item.categoryForEstablishmentInfoDto.id === parseInt(categoryId)
      )
    }];
  }
  return [200, { favoriteObjectsList: favoriteItems }];
});

mockHttp.onGet('/account/favorite/find/for/all/categories').reply(200, {
  favoriteObjectsList: favoriteItems
});
