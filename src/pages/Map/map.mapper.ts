interface ApiMapLocation {
  id: number;
  imageUrl: string;
  title: string;
  categoryInfo: {
    id: number;
    title: string;
  };
  mapPoint: {
    addressTitle: string;
    latitude: number;
    longitude: number;
  };
}

interface MapLocation {
  id: number;
  type: 'FOOD_ESTABLISHMENT';
  title: string;
  rating: number;
  coordinates: [number, number];
  image: {
    id: number;
    name: string;
    url: string;
  };
  categoryInfoDto: {
    id: number;
    title: string;
  };
}

export const mapLocationsFromApi = (apiData: ApiMapLocation[]): MapLocation[] => {
  return apiData.map(item => ({
    id: item.id,
    type: 'FOOD_ESTABLISHMENT',
    title: item.title,
    rating: 0,
    coordinates: [item.mapPoint.latitude, item.mapPoint.longitude],
    image: {
      id: 0,
      name: '',
      url: item.imageUrl
    },
    categoryInfoDto: {
      id: item.categoryInfo.id,
      title: item.categoryInfo.title
    }
  }));
};