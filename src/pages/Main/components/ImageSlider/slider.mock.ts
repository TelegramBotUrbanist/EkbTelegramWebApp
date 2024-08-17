import { mockHttp } from '../../../../shared/http.ts';

const mockImages = [
  'https://img.freepik.com/free-photo/the-adorable-illustration-of-kittens-playing-in-the-forest-generative-ai_260559-483.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723680000&semt=ais_hybrid',
  'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
  'https://avatars.mds.yandex.net/get-mpic/1859063/img_id8310638138210677240.jpeg/orig',
  'https://img.freepik.com/free-photo/the-adorable-illustration-of-kittens-playing-in-the-forest-generative-ai_260559-483.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723680000&semt=ais_hybrid',
  'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
  'https://avatars.mds.yandex.net/get-mpic/1859063/img_id8310638138210677240.jpeg/orig',
  'https://avatars.mds.yandex.net/get-mpic/1859063/img_id8310638138210677240.jpeg/orig',
  'https://avatars.mds.yandex.net/get-mpic/1859063/img_id8310638138210677240.jpeg/orig',
];

mockHttp.onGet('/api/slider/images').reply(200, mockImages);
