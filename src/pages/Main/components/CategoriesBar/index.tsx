import React, { startTransition, useMemo } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { motion } from 'framer-motion';
import './categories.scss';
import { categoriesAtom, Category, selectedCategoryAtom } from './categroies.atoms.ts';
import SubcategoriesBar from './components/SubCategoriesBar';
import Loader from '../../../../shared/Loader';

const CategoriesBar: React.FC = () => {
  const categories = useAtomValue(categoriesAtom)
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  if(categories.state==='loading') return <Loader/>

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const selectedCategoryData = useMemo(()=>categories.data.find(cat => cat.id === selectedCategory),[selectedCategory]);

  const handleSelectCategory = (id: number | null) => {
    startTransition(() => {
      setSelectedCategory(id);
    });
  };

  return (
    <>
    <motion.div
      className="navigate-bar"
      drag="x"
      dragConstraints={{ left: -100, right: 0 }} // Ограничиваем область перетаскивания
      dragElastic={0.1}
      whileTap={{ cursor: 'grabbing' }}
    >
      {categories.data.map((category) => (
        <div
          key={category.id}
          className={`navigate-button ${
            selectedCategory === category.id ? 'active' : ''
          }`}
          onClick={() => handleSelectCategory(category.id)}
        >
          {category.title}
        </div>
      ))}

    </motion.div>
      {selectedCategoryData?.innerCategories && (
        <SubcategoriesBar subcategories={selectedCategoryData.innerCategories} />
      )}
    </>
  );
};

export default CategoriesBar;
