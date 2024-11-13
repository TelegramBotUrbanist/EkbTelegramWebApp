import {EventType, WeekDay} from "../../../Events/events.types.ts";
import { ReservationBid } from '../../../Account/account.types.ts';

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
  dateTime?: string;
  startDate?: string;
  endDate?: string;
  openingHours?: {
    till: string;
    currentDay: boolean;
    weekDay: keyof typeof WeekDay;
    from: string
  }[];
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
  inFavorites?: boolean;
  // Добавляем новые поля для бронирований
  reservationBidInfoList?: ReservationBid[];
  entityType?: 'FOOD_ESTABLISHMENT' | 'EVENT'; // Тип сущности для маршрутизации
}

export enum EventType {
  WORKING_HOURS = 'WORKING_HOURS',
  DATE_TIME = 'DATE_TIME',
  PERIOD = 'PERIOD'
}

export enum ReservationStatus {
  WAITING = 'WAITING',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
  FINISHED = 'FINISHED'
}


export type EstablishmentMapResponse = Record<number, FoodEstablishmentInfoDto[]>;

export type EstablishmentListResponse = FoodEstablishmentInfoDto[];
