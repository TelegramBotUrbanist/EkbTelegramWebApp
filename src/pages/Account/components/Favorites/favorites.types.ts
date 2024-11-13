// types/favorites.types.ts

import { FoodEstablishmentInfoDto } from '../../../Main/components/CategorySection/categorySection.types.ts';
import { Category } from '../../../Main/components/CategoriesBar/categroies.atoms.ts';



export interface FavoriteResponse {
  favoriteObjectsList: FoodEstablishmentInfoDto[];
}

export interface FavoriteCategoriesResponse {
  categories: Category[];
}

export interface FavoriteAllCategoriesResponse {
  [categoryId: string]: FoodEstablishmentInfoDto[];
}