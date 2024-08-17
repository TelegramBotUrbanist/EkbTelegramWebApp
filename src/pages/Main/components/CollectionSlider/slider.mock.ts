// collections.mock.ts

import { mockHttp } from '../../../../shared/http.ts';

const mockCollections = [
  {
    id: 1,
    imageUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
    title: 'public! рекомендует',
  },
  {
    id: 2,
    imageUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
    title: 'Флеганов рекомендует',
  },
  {
    id: 3,
    imageUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
    title: '«Куда сходить?» локации',
  },
  {
    id: 4,
    imageUrl: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
    title: 'Подборка мест с шашлыком',
  },
];

mockHttp.onGet('/api/collections').reply(200, mockCollections);
