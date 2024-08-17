// Updated mock with types
import { MapLocation } from './map.types.ts';
import { mockHttp } from '../../shared/http.ts';

const mockMapLocations: MapLocation[] = [
  {
    id: 1,
    type: 'FOOD_ESTABLISHMENT',
    title: 'Горожане горожане',
    rating: 4.8,
    coordinates: [56.839439, 60.614971],
    image: {
      id:0,
      name:'',
      url: 'https://avatars.mds.yandex.net/get-mpic/1859063/img_id8310638138210677240.jpeg/orig'
    },
    categoryInfoDto: {
      id: 1,
      title: 'Европейская'
    }
  },
  {
    id: 2,
    type: 'FOOD_ESTABLISHMENT',
    title: 'Gavi',
    rating: 4.9,
    coordinates: [56.838234, 60.615912],
    image: {
      id:0,
      name:'',
      url: 'https://avatars.mds.yandex.net/get-mpic/1859063/img_id8310638138210677240.jpeg/orig'
    },
    categoryInfoDto: {
      id: 2,
      title: 'Итальянская'
    }
  }
];

// Мокаем GET запрос для получения локаций
mockHttp.onGet('/map/food/establishments/points').reply((config) => {
  const { lat, lng, radius } = config.params;

  // В реальном приложении здесь можно добавить фильтрацию
  // локаций по расстоянию от центра карты
  return [200, { locations: mockMapLocations }];
});
