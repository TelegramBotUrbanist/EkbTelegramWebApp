import { CostLevelEnum, ReservationTypeEnum, WeekDay } from './details.types.ts';

interface TimeFormat {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

interface ApiOpeningHour {
  weekDay: string;
  from: string; // "10:30:15:20"
  till: string; // "10:30:15:20"
  open: boolean;
  currentDay: boolean;
}

interface ApiEstablishmentDetails {
  id: number;
  rating: number;
  imagesUrls: string[];
  categoryInfoDto: {
    id: number;
    title: string;
  };
  innerCategoryInfo: {
    id: number;
    title: string;
    serialNumber: number;
  } | null;
  costLevel: string;
  title: string;
  locationInfo: string;
  openingHours: ApiOpeningHour[];
  description: string;
  promoCode?: {
    title: string;
    description: string;
    code: string;
    receivedByUser: boolean;
  };
  mapLocation: {
    pointTitle: string;
    latitude: number;
    longitude: number;
    mapLink: string;
  };
  averageBill: number;
  hasBreakfasts: boolean;
  hasBusinessLunches: boolean;
  hasDelivery: boolean;
  hasParking: boolean;
  hasCatering: boolean;
  hasBanquets: boolean;
  phoneNumbers: string[];
  webSiteLink: string;
  reservationTypeEnum: string;
  categoryForEstablishmentInfoDto: {
    id: number;
    title: string;
  };
}

const parseTimeString = (timeStr: string): TimeComponents => {
  const [hours, minutes = '0', seconds = '0', nanos = '0'] = timeStr.split(':');
  return {
    hours: parseInt(hours, 10),
    minutes: parseInt(minutes, 10),
    seconds: parseInt(seconds, 10),
    nanos: parseInt(nanos, 10)
  };
};

const formatTimeToISO = (timeStr: string): string => {
  const date = new Date();
  const { hours, minutes = 0, seconds = 0, nanos = 0 } = parseTimeString(timeStr);
  date.setHours(hours, minutes, seconds, Math.floor(nanos / 1000000)); // Convert nanos to milliseconds
  return date.toISOString();
};


export const mapEstablishmentDetails = (apiData: ApiEstablishmentDetails) => {
  debugger
  return {
    id: apiData.id,
    rating: apiData.rating,
    type:"WORKING_HOURS",
    imgs: apiData.imagesUrls.map((url, index) => ({
      id: index + 1,
      name: `image${index + 1}.jpg`,
      url: url
    })),
    categoryForEstablishmentInfoDto: {
      id: apiData.categoryForEstablishmentInfoDto.id,
      title: apiData.categoryForEstablishmentInfoDto.title,
      serialNumber: 1 // Default value as it's required in the mock
    },
    innerCategoryInfo: apiData.innerCategoryInfo ? {
      id: apiData.innerCategoryInfo.id,
      title: apiData.innerCategoryInfo.title,
      serialNumber: apiData.innerCategoryInfo.serialNumber
    } : null,
    title: apiData.title,
    locationInfo: apiData.locationInfo,
    openingHours: apiData.openingHours.map(hour => ({
      weekDay: hour.weekDay as WeekDay,
      from: formatTimeToISO(hour?.from ?? "00:00:00"),
      till: formatTimeToISO(hour?.till ?? "00:00:00"),
      currentDay: hour.currentDay,
      open:hour?.open
    })),
    description: apiData.description,
    promoCode: apiData.promoCode ? {
      title: apiData.promoCode.title,
      description: apiData.promoCode.description,
      code: apiData.promoCode.code,
      receivedByUser: apiData.promoCode.receivedByUser
    } : null,
    mapLocation: apiData?.mapLocation ? {
      latitude: apiData?.mapLocation?.latitude.toString(),
      longitude: apiData?.mapLocation?.longitude.toString(),
      mapLink: apiData?.mapLocation?.mapLink,
      pointTitle: apiData?.mapLocation?.pointTitle
    } : null,
    costLevel: apiData.costLevel as CostLevelEnum,
    averageBill: `${apiData.averageBill} ₽`, // Конвертируем число в строку с символом рубля
    hasBreakfasts: apiData.hasBreakfasts,
    hasBusinessLunches: apiData.hasBusinessLunches,
    hasDelivery: apiData.hasDelivery,
    hasParking: apiData.hasParking,
    hasCatering: apiData.hasCatering,
    hasBanquets: apiData.hasBanquets,
    phoneNumbers: apiData.phoneNumbers,
    webSiteLink: apiData.webSiteLink,
    reservationTypeEnum: apiData.reservationTypeEnum as ReservationTypeEnum
  };
};