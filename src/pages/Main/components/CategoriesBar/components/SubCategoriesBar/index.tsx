import React, { startTransition } from 'react';
import { motion } from 'framer-motion';
import './SubCategories.scss';
import { Category, selectedSubcategoriesAtom } from '../../categroies.atoms.ts';
import { Atom, useAtom } from 'jotai';

interface SubcategoriesBarProps {
  subcategories: Omit<Category, "innerCategoriesTitle">[];
  selectedInnerCategoryAtom:Atom<any>
}

const SubcategoriesBar: React.FC<SubcategoriesBarProps> = ({ subcategories,selectedInnerCategoryAtom }) => {

  const [selectedSubcategories, setSelectedSubcategories] = useAtom(selectedInnerCategoryAtom);

  const handleSelectSubcategory = (id: number) => {
    startTransition(() => {
      if (selectedSubcategories.includes(id)) {
        // Если подкатегория уже выбрана, то удаляем её из массива
        setSelectedSubcategories(selectedSubcategories.filter(subcategoryId => subcategoryId !== id));
      } else {
        // Если подкатегория не выбрана, то добавляем её в массив
        setSelectedSubcategories([...selectedSubcategories, id]);
      }
    })
  };
  return (
    <div className={"subcategories"}>
      <div className="subcategory-label">Предпочтения</div>
      <motion.div
        className="subcategory-bar"
        drag="x"
        dragConstraints={{ left: -100, right: 0 }} // Ограничиваем область перетаскивания
        dragElastic={0.1}
        whileTap={{ cursor: 'grabbing' }}
      >
        {subcategories.map((subcategory) => (
          <div  key={subcategory.id}
                className={`subcategory-button ${
                  selectedSubcategories.includes(subcategory.id) ? 'active' : ''
                }`}
                onClick={() => handleSelectSubcategory(subcategory.id)}
          >
            {subcategory.title}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SubcategoriesBar;
