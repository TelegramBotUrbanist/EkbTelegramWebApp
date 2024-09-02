import {
  EstablishmentListResponse,
  EstablishmentMapResponse,
} from './categorySection.types.ts';
import './categorySection.mock.ts'
import { http } from '../../../../shared/http.ts';
import { atomWithCache } from 'jotai-cache';
import { searchValueAtom } from '../../../../components/SearchBar/search.atom.ts';
import { selectedCategoryAtom, selectedSubcategoriesAtom } from '../CategoriesBar/categroies.atoms.ts';
import { atom } from 'jotai';
import { loadable } from "jotai/utils"

export const establishmentsAtom = loadable(atom<Promise<EstablishmentMapResponse | EstablishmentListResponse>>(async (get) => {
  const searchValue = get(searchValueAtom);
  const selectedCategory = get(selectedCategoryAtom);
  const selectedInnerCategories = get(selectedSubcategoriesAtom);

  let url = '/food/establishments/find/for/all/categories';
  let params: any = { searchValue };

  if (selectedCategory) {
    url = '/food/establishments/find';
    params = {
      ...params,
      categoryId: selectedCategory.toString(),
      innerCategoriesIds: selectedInnerCategories.length ? selectedInnerCategories : undefined,
    };
  }

  const response = await http.get<EstablishmentMapResponse | EstablishmentListResponse>(url, { params });
  debugger

  return response.data;
}));

