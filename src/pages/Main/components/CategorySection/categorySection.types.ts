import {EventType, WeekDay} from "../../../Events/events.types.ts";

export interface CategoryInfo {
  id: number;
  title: string;
  serialNumber:number
}

export interface InnerCategoryInfo extends CategoryInfo {
  serialNumber: number;
}

export interface FoodEstablishmentInfoDto {
  type?: EventType;
  dateTime?: string; // Используется, если type === 'DATE_TIME'
  startDate?: string; // Используется, если type === 'PERIOD'
  endDate?: string; // Используется, если type === 'PERIOD'
  openingHours?: { till: string; currentDay: boolean; weekDay: keyof typeof WeekDay; from: string }[];
  id: number;
  title: string;
  imgUrl: string;
  serialNumber: number;
  categoryForEstablishmentInfoDto: {
    id: number;
    title: string;
  };
  innerCategoryInfo: {
    id: number;
    title: string;
    serialNumber: number;
  } | null;
  promotionExist?: boolean;
  inFavorites?:boolean;
}

export type EstablishmentMapResponse = Record<number, FoodEstablishmentInfoDto[]>;

export type EstablishmentListResponse = FoodEstablishmentInfoDto[];
