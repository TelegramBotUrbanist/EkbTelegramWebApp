import { atom } from 'jotai';
import { atomWithCache } from 'jotai-cache';
import axios from 'axios';
import { http } from '../../../../shared/http.ts';
import './categories.mock.ts'
import { mapDto } from '../../../../utils/mapper.ts';
import { atomWithLazy } from 'jotai/vanilla/utils/atomWithLazy';
import { loadable } from 'jotai/utils';

export interface Category {
  id: number;
  title: string;
  serialNumber: number;
  innerCategoriesTitle?:string;
  innerCategories?: Omit<Category,"innerCategoriesTitle">[];
}

// Статическая категория "Все"
const allCategory: Category = {
  id: 0,
  title: 'Все',
  serialNumber: 0,
};

export const categoriesAtom = loadable(atomWithCache<Promise<Category[]>>(async () => {
  const response = await http.get<{ categories: Category[] }>(
    '/food/establishments/categories/all'
  );
  const rawCategories = response.data.categories;

  const categories:Category[] = rawCategories.map((category: any) =>
    mapDto<Category>(category, null)
  );
  return [allCategory, ...categories];
}));

export const selectedCategoryAtom = atom<number | null>(null);

export const selectedSubcategoriesAtom = atom<number[]>([]);


