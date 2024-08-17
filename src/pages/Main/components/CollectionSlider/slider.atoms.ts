// collections.atoms.ts
import { atom } from 'jotai';
import axios from 'axios';
import { atomWithCache } from 'jotai-cache';
import { http, resetApiProvider } from '../../../../shared/http.ts';
import { mockCollections } from './slider.mock.ts';
export interface CollectionItem {
  id: number;
  imageUrl: string;
  title: string;
}

export const collectionsAtom = atomWithCache(async (get) => {
  // resetApiProvider()
  // const response = await http.get('/api/collections');
  // return response.data;
  return mockCollections
});
