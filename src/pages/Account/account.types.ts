export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

export interface UserProfile {
  id: number;
  displayName: string;
  username: string;
  photoUrl: string | null;
}

export type ReservationStatus = 'REJECTED' | 'APPROVED' | 'WAITING' | 'FINISHED';
export type ObjectType = 'FOOD_ESTABLISHMENT' | 'EVENT';

export interface ReservationBid {
  id: number;
  date: string;
  startTime: {
    hour: number;
    minute: number;
  };
  endTime: {
    hour: number;
    minute: number;
  };
  tableTitle: string;
  guestsCount: number;
  reservationStatus: ReservationStatus;
  bidRejectedComment?: string;
}


export interface ReservationObject {
  id: number;
  type: ObjectType;
  title: string;
  image: {
    id: number;
    filename: string;
    url: string;
  };
  serialNumber: number;
  categoryInfoDto: {
    id: number;
    title: string;
  };
  innerCategoryInfo?: {
    id: number;
    title: string;
    serialNumber: number;
  };
  reservationBidInfoList: ReservationBid[];
  promotionExist?: boolean;
  inFavorites?: boolean;
}

export interface AccountState {
  reservations: ReservationObject[];
  loading: boolean;
  error: string | null;
}

export interface AccountCategory {
  id: number;
  title: string;
  serialNumber: number;
  innerCategories?: AccountCategory[];
}

export interface FetchReservationsParams {
  categoryId?: string;
  offset?: number;
  limit?: number;
}