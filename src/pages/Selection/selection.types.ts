// Тип для информации о файле
import {AgeRating} from "../Events/events.types.ts";
import CostLevel from "../Establishment/components/Details/components/CostLevel";
import {CostLevelEnum} from "../Establishment/components/Details/details.types.ts";

interface MainImageInfo {
    id: number;
    name: string;
    url: string;
}

// Тип для категории
interface CategoryInfo {
    id: number;
    title: string;
}

// Тип для внутренней категории
interface InnerCategoryInfo {
    id: number;
    title: string;
    serialNumber?: number;
}

// Тип контента для заведения общественного питания
export interface FoodEstablishmentContent {
    id: number;
    type: 'FOOD_ESTABLISHMENT';
    mainImg: MainImageInfo;
    title: string;
    description: string;
    categoryInfoDto: CategoryInfo;
    innerCategoryInfo?: InnerCategoryInfo;
    serialNumber: number;
    inFavorites: boolean;
    costLevel: CostLevelEnum;
}

// Тип контента для мероприятия
export interface EventContent {
    id: number;
    type: 'EVENT';
    mainImg: MainImageInfo;
    title: string;
    description: string;
    categoryInfoDto: CategoryInfo;
    innerCategoryInfo?: InnerCategoryInfo;
    serialNumber: number;
    inFavorites: boolean;
    ageLimit: AgeRating;
}

// Объединенный тип контента
export type ContentObject = FoodEstablishmentContent | EventContent;

// Основной тип для ответа сервера
export interface SelectionInfoResponse {
    mainImg: MainImageInfo;
    title: string;
    description: string;
    contentObjects: ContentObject[];
}
