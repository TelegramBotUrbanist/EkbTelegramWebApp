enum WeekDay {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

enum CostLevelEnum {
  ONE = 1,
  TWO = 2,
  THREE = 3,
}

interface Image {
  id: number;
  name: string;
  url: string;
}

interface PromoCode {
  title: string;
  description: string;
  code: string;
  receivedByUser: boolean;
}

interface MapLocation {
  latitude: string;
  longitude: string;
  mapLink: string;
  pointTitle: string;
}

interface OpeningHours {
  weekDay: WeekDay;
  from: string;
  till: string;
  currentDay: boolean;
}

interface CategoryInfo {
  id: number;
  title: string;
  serialNumber: number;
}

export interface EventDetails {
  id: number;
  rating: number;
  imgs: Image[];
  categoryForEstablishmentInfoDto: CategoryInfo;
  innerCategoryInfo: CategoryInfo | null;
  title: string;
  locationInfo: string;
  openingHours: OpeningHours[];
  description: string;
  promoCode?: PromoCode;
  mapLocation: MapLocation;
  costLevel: CostLevelEnum;
  averageBill?: string;
  hasBreakfasts: boolean;
  hasBusinessLunches: boolean;
  hasDelivery: boolean;
  hasParking: boolean;
  hasCatering: boolean;
  hasBanquets: boolean;
  phoneNumbers: string[];
  webSiteLink?: string;
}
