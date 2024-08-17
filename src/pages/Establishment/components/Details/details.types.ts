export interface Image {
  id: number;
  name: string;
  url: string;
}

export enum WeekDay {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export interface OpeningHours {
  weekDay: WeekDay;
  from: string;   // Формат времени как строка, например, "10:00"
  till: string;   // Формат времени как строка, например, "22:00"
  currentDay: boolean;
}

export interface CategoryInfo {
  id: number;
  title: string;
  serialNumber: number;
}

export interface MapLocation {
  latitude: string;
  longitude: string;
  mapLink:string
  pointTitle:string

}

export enum ReservationTypeEnum {
  BY_PHONE = 'BY_PHONE',
  WITH_TABLE_SELECTION = 'WITH_TABLE_SELECTION',
  WITHOUT_TABLE_SELECTION = 'WITHOUT_TABLE_SELECTION',
}

export enum CostLevelEnum {
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE',
}

export interface EstablishmentDetails {
  id: number;
  rating: number;
  imgs: Image[];
  categoryForEstablishmentInfoDto: CategoryInfo;
  innerCategoryInfo:CategoryInfo
  title: string;
  locationInfo: string;
  openingHours: OpeningHours[];
  description: string;
  promoCode?: {
    title:string,
    description:string,
    code:string,
    receivedByUser:boolean
  };
  costLevel: CostLevelEnum;
  mapLocation: MapLocation;
  averageBill: string;
  hasBreakfasts: boolean;
  hasBusinessLunches: boolean;
  hasDelivery: boolean;
  hasParking: boolean;
  hasCatering: boolean;
  hasBanquets: boolean;
  phoneNumbers: string[];
  webSiteLink: string;
  reservationTypeEnum: ReservationTypeEnum;
}




