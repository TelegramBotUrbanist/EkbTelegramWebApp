interface CategoryInfo {
  id: number;
  title: string;
  serialNumber?: number;
}

interface InnerCategoryInfo extends CategoryInfo {
  serialNumber?: number;
}

interface EstablishmentBase {
  id: number;
  title: string;
  imgUrl: string;
  serialNumber?: number;
  categoryForEstablishmentInfoDto: CategoryInfo;
  innerCategoryInfo: InnerCategoryInfo | null;
  promotionExist: boolean;
  inFavorites: boolean;
}

interface ApiEstablishment {
  id: number;
  title: string;
  imgUrl: string;
  serialNumber?: number;
  categoryInfoDto: CategoryInfo;
  innerCategoryInfo: InnerCategoryInfo | null;
  promotionExist: boolean;
  inFavorites: boolean;
}

type EstablishmentMapResponse = {
  [key: number]: EstablishmentBase[];
};

type EstablishmentListResponse = EstablishmentBase[];

type GroupedApiResponse = {
  [key: string]: ApiEstablishment[];
};

export const mapEstablishmentList = (apiData: ApiEstablishment[]): EstablishmentListResponse => {
  return apiData.map(item => ({
    id: item.id,
    title: item.title,
    imgUrl: item.imgUrl,
    // serialNumber: item.serialNumber,
    categoryForEstablishmentInfoDto: {
      id: item.categoryInfoDto.id,
      title: item.categoryInfoDto.title
    },
    innerCategoryInfo: item.innerCategoryInfo ? {
      id: item.innerCategoryInfo.id,
      title: item.innerCategoryInfo.title,
      serialNumber: item.innerCategoryInfo.serialNumber
    } : null,
    promotionExist: item.promotionExist,
    inFavorites: item.inFavorites
  }));
};

export const mapEstablishmentCategories = (apiData: GroupedApiResponse): EstablishmentMapResponse => {
  const result: EstablishmentMapResponse = {};

  // Перебираем каждую категорию в объекте
  Object.entries (apiData).forEach (([categoryId, establishments]) => {
    result[Number (categoryId)] = establishments.map (item => ({
      id: item.id,
      title: item.title,
      imgUrl: item.imgUrl,
      // serialNumber: item.serialNumber,
      categoryForEstablishmentInfoDto: {
        id: item.categoryInfoDto.id,
        title: item.categoryInfoDto.title
      },
      innerCategoryInfo: item.innerCategoryInfo ? {
        id: item.innerCategoryInfo.id,
        title: item.innerCategoryInfo.title,
        serialNumber: item.innerCategoryInfo.serialNumber
      } : null,
      promotionExist: item.promotionExist,
      inFavorites: item.inFavorites
    }));
  });
  return result
}