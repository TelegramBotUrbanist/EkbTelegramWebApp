import { FoodEstablishmentInfoDto } from '../pages/Main/components/CategorySection/categorySection.types.ts';
import { ReservationObject } from '../pages/Account/account.types.ts';

export const mapReservationToEstablishment = (reservation: ReservationObject): FoodEstablishmentInfoDto => {
  return {
    id: reservation.id,
    title: reservation.title,
    imgUrl: reservation.image.url,
    serialNumber: reservation.serialNumber,
    categoryForEstablishmentInfoDto: {
      id: reservation.categoryInfoDto.id,
      title: reservation.categoryInfoDto.title,
    },
    innerCategoryInfo: reservation.innerCategoryInfo || null,
    promotionExist: reservation.promotionExist,
    inFavorites: reservation.inFavorites
  };
};