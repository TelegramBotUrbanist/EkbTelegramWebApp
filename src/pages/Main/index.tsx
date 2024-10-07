import ImageSlider from '../../components/ImageSlider';
import { List, Section } from '@telegram-apps/telegram-ui';
import React, { Suspense, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import CollectionSlider from './components/CollectionSlider';
import './main.scss';
import SearchBar from '../../components/SearchBar';
import CategoriesBar from './components/CategoriesBar';
import CategorySection from './components/CategorySection';
import Loader from '../../shared/Loader';
import { useAtom } from 'jotai';
import { searchValueAtom } from '../../components/SearchBar/search.atom.ts';
import { establishmentsAtom } from './components/CategorySection/categorySection.atoms.ts';
import {
  categoriesAtom,
  selectedCategoryAtom,
  selectedSubcategoriesAtom,
} from './components/CategoriesBar/categroies.atoms.ts';
import { collectionsAtom } from './components/CollectionSlider/slider.atoms.ts';
import { imagesAtom } from './slider.atoms.ts';

const MainPage = () => {
  const [loading, setLoading] = useState(false);
  const [images] = useAtom(imagesAtom)
  // useEffect(() => {
  //   // Имитация загрузки данных
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

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
            <CollectionSlider collectionsAtom={collectionsAtom} />
            <SearchBar value={searchValue} onChange={handleSearchChange} />

            <CategoriesBar atom={categoriesAtom} selectedCategoryAtom={selectedCategoryAtom} selectedInnerCategoryAtom={selectedSubcategoriesAtom}/>


            <CategorySection
              dataAtom={establishmentsAtom}
              categoriesAtom={categoriesAtom}
              selectedCategoryAtom={selectedCategoryAtom}
              type="establishments"
            />
          </List>
        </>
      )}
    </>
  );
};

export default MainPage;
