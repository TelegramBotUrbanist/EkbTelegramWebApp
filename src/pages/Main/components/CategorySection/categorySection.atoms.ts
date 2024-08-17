import {
  EstablishmentListResponse,
  EstablishmentMapResponse,
} from './categorySection.types.ts';
// import './categorySection.mock.ts'
import { http, resetApiProvider } from '../../../../shared/http.ts';
import { atomWithCache } from 'jotai-cache';
import { searchValueAtom } from '../../../../components/SearchBar/search.atom.ts';
import { selectedCategoryAtom, selectedSubcategoriesAtom } from '../CategoriesBar/categroies.atoms.ts';
import { atom } from 'jotai';
import { loadable } from "jotai/utils"
import { log } from 'node:util';
import { mapEstablishmentCategories, mapEstablishmentList } from '../../main.mapper.ts';
export const establishmentsRefreshAtom = atom(0)
export const establishmentsAtom = loadable(atom<Promise<any>>(async (get) => {
  get(establishmentsRefreshAtom); // добавляем зависимость
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
      innerCategoriesIds: selectedInnerCategories!==null ? selectedInnerCategories : undefined,
    };
  }
  resetApiProvider()
  const response = await http.get<EstablishmentMapResponse | EstablishmentListResponse>(url, { params }).catch((e)=>console.log(e));
  debugger
  return selectedCategory ?  mapEstablishmentList(response.data) : mapEstablishmentCategories(response.data);
}));

