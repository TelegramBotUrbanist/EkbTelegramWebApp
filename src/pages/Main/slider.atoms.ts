import { atom } from 'jotai';
import axios from 'axios';
import { http, mockHttp } from '../../shared/http.ts';
import { atomWithCache } from 'jotai-cache';
import { mockImages } from '../../components/ImageSlider/slider.mock.ts';
export const imagesAtom = atomWithCache(async (get) => {
  // const response = await http.get('/food/establishments/slider/content');
  // return response.data;
  return mockImages
});

// Atom для хранения текущего индекса изображения
