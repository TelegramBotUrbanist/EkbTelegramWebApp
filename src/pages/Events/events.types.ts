export enum WeekDay {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export enum AgeRating {
  ZERO = 'ZERO',
  SIX = 'SIX',
  TWELVE = 'TWELVE',
  SIXTEEN = 'SIXTEEN',
  EIGHTEEN = 'EIGHTEEN',
}

export enum AgeRatingRu {
  ZERO = '0',
  SIX = '6',
  TWELVE = '12',
  SIXTEEN = '16',
  EIGHTEEN = '18',
}

export interface ImageInfo {
  id: number;
  name: string;
  url: string;
}

export interface CategoryInfo {
  id: number;
  title: string;
}

export interface MapLocation {
  pointTitle: string;
  latitude: string;
  longitude: string;
  mapLink: string;
}

export type EventType = 'WORKING_HOURS' | 'DATE_TIME' | 'PERIOD';

export interface EventDetails {
  id: number;
  title: string;
  type: EventType;
  imgs: ImageInfo[];
  categoryInfoDto: CategoryInfo;
  innerCategoryInfo: CategoryInfo | null;
  locationInfo: string;
  description: string;
  mapLocation: MapLocation;
  phoneNumbers: string[];
  webSiteLink: string;
  ageRating: AgeRating; // Зависит от того, как поле будет использоваться (например, 'ZERO')
  dateTime?: string; // Используется, если type === 'DATE_TIME'
  startDate?: string; // Используется, если type === 'PERIOD'
  endDate?: string; // Используется, если type === 'PERIOD'
  openingHours?: { till: string; currentDay: boolean; weekDay: keyof typeof WeekDay; from: string }[];
  inFavorites: boolean;
}
