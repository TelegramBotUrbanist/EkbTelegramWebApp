import React, { startTransition, useMemo, useRef, useEffect, useState } from 'react';
import { Atom, useAtom, useAtomValue } from 'jotai';
import { motion, useMotionValue } from 'framer-motion';
import './categories.scss';
import { Category } from './categroies.atoms.ts';
import SubcategoriesBar from './components/SubCategoriesBar';
import Loader from '../../../../shared/Loader';

interface IProps {
  atom: Atom<any>;
  selectedCategoryAtom: Atom<any>;
  selectedInnerCategoryAtom: Atom<any> | null;
}

const CategoriesBar: React.FC<IProps> = ({
                                           atom,
                                           selectedCategoryAtom,
                                           selectedInnerCategoryAtom
                                         }) => {
  const categories = useAtomValue(atom);
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const [ dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const x = useMotionValue(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const selectedCategoryData = useMemo(
    () => categories?.data?.find(cat => cat.id === selectedCategory),
    [categories?.data, selectedCategory]
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  useEffect(() => {
    const updateDragConstraints = () => {
      if (scrollContainerRef.current && contentRef.current) {
        const containerWidth = scrollContainerRef.current.clientWidth;
        const contentWidth = contentRef.current.scrollWidth;

        // Вычисляем максимальное смещение влево
        const maxDragLeft = Math.min(0, containerWidth - contentWidth);

        setDragConstraints({
          left: maxDragLeft,
          right: 0
        });
      }
    };

    updateDragConstraints();

    // Добавляем слушатель изменения размера окна
    window.addEventListener('resize', updateDragConstraints);

    return () => {
      window.removeEventListener('resize', updateDragConstraints);
    };
  }, [categories?.data]); // Пересчитываем при изменении данных

  if (categories.state === 'loading') return <Loader />;

  const handleSelectCategory = (id: number | null) => {
    startTransition(() => {
      setSelectedCategory(id);
    });
  };

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();

    if (contentRef.current && scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const contentWidth = contentRef.current.scrollWidth;
      const maxDragLeft = Math.min(0, containerWidth - contentWidth);

      const currentX = x.get();
      let newX = currentX - event.deltaY;

      // Ограничиваем скролл
      newX = Math.min(0, Math.max(maxDragLeft, newX));

      // Плавно анимируем перемещение
      x.set(newX);
    }
  };

  return (
    <>
      <div ref={scrollContainerRef} className="navigate-bar-container">
        <motion.div
          className="navigate-bar"
          ref={contentRef}
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          style={{ x }}
          whileTap={{ cursor: 'grabbing' }}
        >
          <div className="navigate-bar-content">
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
          </div>
        </motion.div>
      </div>

      {selectedCategoryData?.innerCategories && (
        <SubcategoriesBar
          selectedInnerCategoryAtom={selectedInnerCategoryAtom}
          subcategories={selectedCategoryData.innerCategories}
        />
      )}
    </>
  );
};

export default CategoriesBar;