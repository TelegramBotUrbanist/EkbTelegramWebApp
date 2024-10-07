import React, { startTransition, useMemo } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import './CategorySection.scss';
import CategoryHeader from './components/CategoryHeader';
import EstablishmentList from './components/EstablishmentList';
import Loader from '../../../../shared/Loader';

interface CategorySectionProps {
  dataAtom: any;  // Атом для заведений или мероприятий
  categoriesAtom: any; // Атом для категорий
  selectedCategoryAtom: any;  // Атом для выбранной категории
  type: 'establishments' | 'events';  // Тип данных
}

const CategorySection: React.FC<CategorySectionProps> = ({ dataAtom, categoriesAtom, selectedCategoryAtom, type }) => {
  debugger
  const data = useAtomValue(dataAtom);  // Используем атом для заведений или мероприятий
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const [categories] = useAtom(categoriesAtom);

  const groupedByCategory = useMemo(() => {
    if (!data?.data) return {};

    if (Array.isArray(data.data)) {
      // Группировка массива по категориям
      return data.data.reduce((acc, item) => {
        const categoryId = item.categoryForEstablishmentInfoDto.id;
        if (!acc[categoryId]) {
          acc[categoryId] = [];
        }
        acc[categoryId].push(item);
        return acc;
      }, {} as Record<number, any[]>);
    }

    // Если данные — это объект (мапа), возвращаем как есть
    return data.data;
  }, [data]);

  const handleCategorySelect = (id: number) => {
    startTransition(() => {
      setSelectedCategory(id);
    });
  };

  if (categories.state === 'loading' || data.state === 'loading') return <Loader />;

  const renderCategorySection = () => {
    if (selectedCategory) {
      const filteredItems = groupedByCategory[selectedCategory] || [];
      return (
        <div className="detailed-view">
          <EstablishmentList type={type} isDetailed direction={'y'} establishments={filteredItems} />
        </div>
      );
    }

    // Отображение всех категорий
    return Object.entries(groupedByCategory).map(([categoryId, items]) => {
      const category = categories.data.find((cat: any) => cat.id === Number(categoryId));
      return (
        <div key={categoryId} className="category-section">
          <CategoryHeader
            title={category?.title || ''}
            onSelect={() => handleCategorySelect(Number(categoryId))}
          />
          <EstablishmentList type={type} direction={'x'} establishments={items} />
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
