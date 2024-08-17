import { Image } from '../Establishment/components/Details/details.types.ts';

export type ImageType = {
  id?: number;
  url: string;
  filename?: string;
};

export type CategoryInfo = {
  id: number;
  title: string;
};

export type Coordinates = [number, number];

export interface MapLocation {
  id: number;
  type: 'FOOD_ESTABLISHMENT'|"EVENT";
  title: string;
  rating: number;
  coordinates: Coordinates;
  image: Image;
  categoryInfoDto: CategoryInfo;
}

// Optional: if you need to type the API response
export interface MapApiResponse {
  locations: MapLocation[];
}
