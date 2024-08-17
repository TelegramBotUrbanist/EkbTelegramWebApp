// collections.atoms.ts
import { atom } from 'jotai';
import axios from 'axios';
import { atomWithCache } from 'jotai-cache';
import { http } from '../../../../shared/http.ts';
import './slider.mock.ts';
export interface CollectionItem {
  id: number;
  imageUrl: string;
  title: string;
}

export const collectionsAtom = atomWithCache(async (get) => {
  const response = await http.get('/api/collections');
  return response.data;
});
