import React, { startTransition } from 'react';
import { motion } from 'framer-motion';
import './SubCategories.scss';
import { Category } from '../../categroies.atoms.ts';
import { Atom, useAtom } from 'jotai';

interface SubcategoriesBarProps {
  subcategories: Omit<Category, "innerCategoriesTitle">[];
  selectedInnerCategoryAtom: Atom<any>;
}

const SubcategoriesBar: React.FC<SubcategoriesBarProps> = ({
                                                             subcategories,
                                                             selectedInnerCategoryAtom
                                                           }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useAtom(selectedInnerCategoryAtom);

  const handleSelectSubcategory = (id: number) => {
    startTransition(() => {
      // Если текущая подкатегория уже выбрана, сбрасываем выбор
      if (selectedSubcategory === id) {
        setSelectedSubcategory(null);
      } else {
        // Иначе выбираем новую подкатегорию
        setSelectedSubcategory(id);
      }
    });
  };

  return (
    <div className="subcategories">
      <div className="subcategory-label">Предпочтения</div>
      <motion.div
        className="subcategory-bar"
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        dragElastic={0.1}
        whileTap={{ cursor: 'grabbing' }}
      >
        {subcategories?.map((subcategory) => (
          <div
            key={subcategory.id}
            className={`subcategory-button ${
              selectedSubcategory === subcategory.id ? 'active' : ''
            }`}
            onClick={() => handleSelectSubcategory(subcategory.id)}
          >
            {subcategory?.title}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SubcategoriesBar;