import React from 'react';
import { useAtomValue } from 'jotai';
import { motion } from 'framer-motion';
import './CollectionSlider.scss';
import { collectionsAtom } from './slider.atoms.ts';

const CollectionSlider: React.FC = () => {
  const collections = useAtomValue(collectionsAtom);



  return (
    <div className="collection-slider">
      <div className="collection-label">Подборки</div>
      <motion.div
        className="collection-slider-container"
        drag="x"
        dragConstraints={{ left: -200, right: 0 }}
        dragElastic={0.05}
        whileTap={{ cursor: 'grabbing' }}
      >
        {collections.map((item) => (
          <div key={item.id} className="collection-item">
            <div className="collection-image-wrapper">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="collection-image"
                onDragStart={(e) => e.preventDefault()} // Отключаем стандартное поведение
              />
              <p className="collection-title">{item.title}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CollectionSlider;
