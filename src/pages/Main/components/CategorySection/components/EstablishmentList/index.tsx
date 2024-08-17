import React, { useRef, useEffect, useState } from 'react';
import { FoodEstablishmentInfoDto } from '../../categorySection.types.ts';
import EstablishmentCard from '../EstablishmentCard';
import '../../CategorySection.scss';
import { motion, useMotionValue } from 'framer-motion';

interface EstablishmentListProps {
  establishments: FoodEstablishmentInfoDto[];
  direction: 'x' | 'y';
  [x: string]: unknown;
  type: 'establishments' | 'events' | 'account' | 'favorites';
}

const EstablishmentList: React.FC<EstablishmentListProps> = ({
                                                               establishments,
                                                               type,
                                                               direction,
                                                               ...rest
                                                             }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const x = useMotionValue(0);
  const SCROLL_END_PADDING = 16;
  const getCurrentType = (establishment: any) => {
    if (type === 'favorites') {
      return establishment.entityType === 'FOOD_ESTABLISHMENT' ? 'establishments' : 'events';
    } else if (type !== 'establishments' && type !== 'events') {
      return 'account';
    }
    return type;
  };

  useEffect(() => {
    const updateDragConstraints = () => {
      if (containerRef.current && contentRef.current && direction === 'x') {
        const containerWidth = containerRef.current.clientWidth;
        const contentWidth = contentRef.current.scrollWidth;
        const maxDragLeft = Math.min(0, containerWidth - contentWidth - SCROLL_END_PADDING);

        setDragConstraints({
          left: maxDragLeft,
          right: 0
        });
      }
    };

    updateDragConstraints();
    window.addEventListener('resize', updateDragConstraints);

    return () => {
      window.removeEventListener('resize', updateDragConstraints);
    };
  }, [establishments, direction]);

  const handleWheel = (event: WheelEvent) => {
    if (direction !== 'x') return;

    event.preventDefault();

    if (contentRef.current && containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const contentWidth = contentRef.current.scrollWidth;
      const maxDragLeft = Math.min(0, containerWidth - contentWidth - SCROLL_END_PADDING);

      const currentX = x.get();
      let newX = currentX - event.deltaY;

      // Ограничиваем скролл
      newX = Math.min(0, Math.max(maxDragLeft, newX));

      // Плавно анимируем перемещение
      x.set(newX);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container && direction === 'x') {
      container.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [direction]);

  return (
    <div ref={containerRef} className="establishment-list-container">
      <motion.div
        ref={contentRef}
        className={`establishment-list detailed`}
        drag={direction === 'x' ? 'x' : false}
        style={direction === 'x' ? { x } : undefined}
        dragConstraints={direction === 'x' ? dragConstraints : undefined}
        dragElastic={0.05}
        whileTap={{ cursor: 'grabbing' }}
      >
        {establishments?.map((establishment) => (
          <EstablishmentCard
            key={establishment.id}
            type={getCurrentType(establishment)}
            onLikeClick={() => console.log(`${type} liked, ${establishment?.inFavorites}`)}
            isDetailed={rest.isDetailed}
            establishment={establishment}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default EstablishmentList;