import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai/index';
import { searchValueAtom } from '../../components/SearchBar/search.atom.ts';
import Skeleton from 'react-loading-skeleton';
import ImageSlider from '../../components/ImageSlider';
import { List } from '@telegram-apps/telegram-ui';
import CollectionSlider from '../Main/components/CollectionSlider';
import { collectionsAtom } from '../Main/components/CollectionSlider/slider.atoms.ts';
import SearchBar from '../../components/SearchBar';
import CategoriesBar from '../Main/components/CategoriesBar';
import CategorySection from '../Main/components/CategorySection';
import {
  eventCategoriesAtom,
  eventCollectionsAtom,
  eventsAtom,
  imagesAtom,
  selectedEventCategoryAtom, selectedEventSubcategoriesAtom,
} from './events.atoms.ts';

const EventsPage = () => {
  debugger
  const [loading, setLoading] = useState(false);
  const [images] = useAtom(imagesAtom)


  const [searchValue, setSearchValue] = useAtom(searchValueAtom);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  return (
    <>
      {loading ? (
        <div>
          {/* Скриншоты показывают секции, которые можно превратить в скелетоны */}
          <Skeleton height={30} width={200} />
          <Skeleton height={200} />
          <Skeleton height={20} width={`60%`} />
          <Skeleton height={20} width={`80%`} />
          <Skeleton height={20} width={`40%`} />
        </div>
      ) : (
        <>
          <ImageSlider images={images} />

          <List className={'main__page'}>
            <CollectionSlider collectionsAtom={eventCollectionsAtom} />
            <SearchBar value={searchValue} onChange={handleSearchChange} />

            <CategoriesBar atom={eventCategoriesAtom} selectedCategoryAtom={selectedEventCategoryAtom} selectedInnerCategoryAtom={selectedEventSubcategoriesAtom}/>


            <CategorySection
              dataAtom={eventsAtom}
              categoriesAtom={eventCategoriesAtom}
              selectedCategoryAtom={selectedEventCategoryAtom}
              type="events"
            />
          </List>
        </>
      )}
    </>
  );
};

export default EventsPage;