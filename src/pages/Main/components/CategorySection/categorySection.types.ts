export interface CategoryInfo {
  id: number;
  title: string;
  serialNumber:number
}

export interface InnerCategoryInfo extends CategoryInfo {
  serialNumber: number;
}

export interface FoodEstablishmentInfoDto {
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
  promotionExist: boolean;
}

export type EstablishmentMapResponse = Record<number, FoodEstablishmentInfoDto[]>;

export type EstablishmentListResponse = FoodEstablishmentInfoDto[];
