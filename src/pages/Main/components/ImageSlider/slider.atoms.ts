import { atom } from 'jotai';
import axios from 'axios';
import { http, mockHttp } from '../../../../shared/http.ts';
import { atomWithCache } from 'jotai-cache';
import './slider.mock.ts';
export const imagesAtom = atomWithCache(async (get) => {
  const response = await http.get('/api/slider/images');
  return response.data;
});

// Atom для хранения текущего индекса изображения
export const currentIndexAtom = atom(0);
