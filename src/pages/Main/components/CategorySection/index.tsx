import React, { startTransition, useEffect, useMemo, useRef } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import './CategorySection.scss';
import { establishmentsAtom } from './categorySection.atoms.ts';
import { FoodEstablishmentInfoDto, EstablishmentMapResponse, EstablishmentListResponse } from './categorySection.types.ts';
import CategoryHeader from './components/CategoryHeader';
import EstablishmentList from './components/EstablishmentList';
import { categoriesAtom, selectedCategoryAtom } from '../CategoriesBar/categroies.atoms.ts';
import Loader from '../../../../shared/Loader';

const CategorySection: React.FC = () => {
  const establishments = useAtomValue(establishmentsAtom);
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const [categories] = useAtom(categoriesAtom);

  const groupedByCategory = useMemo(() => {
    if (!establishments?.data) return {};

    if (Array.isArray(establishments.data)) {
      // Группировка массива по категориям
      return establishments.data.reduce((acc, establishment) => {
        const categoryId = establishment.categoryForEstablishmentInfoDto.id;
        if (!acc[categoryId]) {
          acc[categoryId] = [];
        }
        acc[categoryId].push(establishment);
        return acc;
      }, {} as EstablishmentMapResponse);
    }

    // Если `establishments` — это объект (мапа), возвращаем как есть
    return establishments.data as EstablishmentMapResponse;
  }, [establishments]);



  const handleCategorySelect = (id: number) => {
    startTransition(() => {
      setSelectedCategory(id);
    });
  };




  if(categories.state==='loading' || establishments.state==='loading') return <Loader/>



  const renderCategorySection = () => {
    if (selectedCategory) {
      // Фильтрация по выбранной категории
      const filteredEstablishments = groupedByCategory[selectedCategory] || [];
      return (
        <div className="detailed-view">
          <EstablishmentList isDetailed direction={'y'} establishments={filteredEstablishments} />
        </div>
      );
    }

    // Отображение всех категорий
    return Object.entries(groupedByCategory).map(([categoryId, estbs]) => {
      const category = categories.data.find((cat) => cat.id === Number(categoryId));
      return (
        <div key={categoryId} className="category-section">
          <CategoryHeader
            title={category?.title || ''}
            onSelect={() => handleCategorySelect(Number(categoryId))}
          />
          <EstablishmentList direction={'x'} establishments={estbs} />
        </div>
      );
    });
  };


  return (
    <div className="category-sections">
      {renderCategorySection()}
    </div>
  );
};

export default CategorySection;
