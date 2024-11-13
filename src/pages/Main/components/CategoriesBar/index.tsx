import React, { startTransition, useMemo } from 'react';
import { Atom, useAtom, useAtomValue } from 'jotai';
import { motion } from 'framer-motion';
import './categories.scss';
import { categoriesAtom, Category, selectedCategoryAtom } from './categroies.atoms.ts';
import SubcategoriesBar from './components/SubCategoriesBar';
import Loader from '../../../../shared/Loader';
interface IProps{
  atom:Atom<any>,
  selectedCategoryAtom:Atom<any>
  selectedInnerCategoryAtom:Atom<any> | null
}

const CategoriesBar: React.FC<IProps> = ({atom,selectedCategoryAtom,selectedInnerCategoryAtom}) => {
  const categories = useAtomValue(atom)
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const selectedCategoryData = useMemo(
    () => categories?.data?.find(cat => cat.id === selectedCategory),
    [categories?.data]
  );

  if(categories.state==='loading') return <Loader/>


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
      {categories?.data?.map((category) => (
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
      {selectedCategoryData?.innerCategories &&  (
        <SubcategoriesBar selectedInnerCategoryAtom={selectedInnerCategoryAtom}  subcategories={selectedCategoryData.innerCategories} />
      )}
    </>
  );
};

export default CategoriesBar;
