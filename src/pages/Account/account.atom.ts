import { atom } from 'jotai';
import { loadable } from 'jotai/utils';
import { atomWithCache } from 'jotai-cache';
import { http } from '../../shared/http';
import { AccountCategory, FetchReservationsParams, UserProfile } from './account.types';
import './account.mock';

// Утилиты
const groupReservationsByCategory = (reservations: any[]) => {
  return reservations.reduce((acc, reservation) => {
    const categoryId = reservation.categoryInfoDto.id;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push({
      ...reservation,
      categoryForEstablishmentInfoDto: reservation.categoryInfoDto,
      imgUrl: reservation.image.url
    });
    return acc;
  }, {});
};

const fetchReservations = async (params: FetchReservationsParams = {}) => {
  const response = await http.get('/account/reservation/objects/find', {
    params: {
      categoryId: params.categoryId,
      offset: params.offset || 0,
      limit: params.limit || 20
    }
  });

  return groupReservationsByCategory(response.data.objectReservationsInfoList);
};

// Базовые атомы состояния
export const userProfileAtom = atom<UserProfile>({
  id: 0,
  displayName: '',
  username: '',
  photoUrl: null
});

export const accountPaginationAtom = atom({
  offset: 0,
  limit: 20
});

// Атомы для категорий
const allCategory: AccountCategory = {
  id: 0,
  title: 'Все',
  serialNumber: 0,
};


export const accountCategoriesAtom = loadable(
  atomWithCache(async () => {
    const response = await http.get('/account/reservation/categories');
    return [allCategory, ...response.data];
  })
);

export const selectedAccountCategoryAtom = atom<number | null>(0);
export const selectedAccountSubcategoryAtom = atom<number[]>([]);

export const accountDataAtom = loadable(
  atom(async (get) => {
    const selectedCategory = get(selectedAccountCategoryAtom);
    const pagination = get(accountPaginationAtom);

    return fetchReservations({
      categoryId: selectedCategory?.toString(),
      offset: pagination.offset,
      limit: pagination.limit
    });
  })
);

export const updateAccountDataAtom = atom(
  null,
  (get, set, categoryId: number | null) => {
    set(accountPaginationAtom, { offset: 0, limit: 20 });
    set(selectedAccountCategoryAtom, categoryId);
  }
);

export const loadMoreAccountDataAtom = atom(
  null,
  (get, set) => {
    const pagination = get(accountPaginationAtom);
    set(accountPaginationAtom, {
      ...pagination,
      offset: pagination.offset + pagination.limit
    });
  }
);

export const cancelReservationsAtom = atom(
  null,
  async (get, set, reservationIds: number[]) => {
    try {
      await http.post('/account/reservation/objects/cancel', { ids: reservationIds });
      set(selectedAccountCategoryAtom, null);
      get(accountDataAtom)
      return true;
    } catch (error) {
      console.error('Failed to cancel reservations:', error);
      return false;
    }
  }
);