import React, { FC, useMemo } from 'react';
import { motion } from 'framer-motion';
import './slider.scss';
import {useNavigate} from "react-router-dom";

interface SliderItem {
  id: number;
  title: string;
  imageUrl: string;
}

interface GenericSliderProps {
  label: string;  // Общая подпись для слайдера
  items: SliderItem[];  // Массив элементов для слайдера
    type:'events'|'establishments'
}
//TODO: Переделать айди на получение из объекта
const GenericSlider: FC<GenericSliderProps> = ({ label, items,type }) => {
    const navigate = useNavigate()
  // Используем useMemo для мемоизации элементов слайдера
  const renderedItems = useMemo(() => {
    return items.map((item) => (
      <div key={item.id} className="slider-item"
           onClick={()=>navigate(`selection/${type}/0`)}
      >
        <div className="slider-image-wrapper">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="slider-image"
            onDragStart={(e) => e.preventDefault()} // Отключаем стандартное поведение
          />
          <p className="slider-title">{item.title}</p>
        </div>
      </div>
    ));
  }, [items]);

  return (
    <div className="generic-slider">
      <div className="slider-label">{label}</div>
      <motion.div
        className="slider-container"
        drag="x"
        dragConstraints={{ left: -200, right: 0 }}
        dragElastic={0.05}
        whileTap={{ cursor: 'grabbing' }}
      >
        {renderedItems}
      </motion.div>
    </div>
  );
};

export default GenericSlider;
