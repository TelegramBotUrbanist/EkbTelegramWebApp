import React, { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { imagesAtom, currentIndexAtom } from './slider.atoms.ts';
import { motion, useAnimationControls } from 'framer-motion';
import './ImageSlider.scss'; // Добавим сюда стили

const SlideIntervalConst = 5000;

const ImageSlider: React.FC = () => {
  const [images] = useAtom(imagesAtom);
  const [currentIndex, setCurrentIndex] = useAtom(currentIndexAtom);
  const controls = useAnimationControls();

  const slideInterval = SlideIntervalConst;
  const swipeConfidenceThreshold = 100; // Порог силы свайпа, после которого переключается изображение
  const intervalRef = useRef<NodeJS.Timeout | string | number | undefined>(
    undefined,
  ); // Храним ссылку на интервал

  // Запускаем интервал
  const startSlideShow = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, slideInterval);
  };

  const stopSlideShow = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startSlideShow(); // Запускаем слайдшоу при монтировании компонента
    return () => stopSlideShow(); // Очищаем интервал при размонтировании компонента
  }, [images.length, setCurrentIndex]);

  useEffect(() => {
    controls.start({ width: '100%' }).then(() => controls.start({ width: 0 }));
  }, [currentIndex, controls]);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -swipeConfidenceThreshold) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else if (info.offset.x > swipeConfidenceThreshold) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length,
      );
    }
    startSlideShow();
  };

  // Если изображения еще не загружены, показываем загрузку
  if (!images || images.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="image-slider">
      <div className="slider-container">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="slider-image"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragStart={stopSlideShow}
          onDragEnd={handleDragEnd}
        />
      </div>
      <div className="progress-indicator">
        {images.map((_, index) => (
          <div key={index} className="progress-segment">
            <motion.div
              exit={{ width: '0%' }}
              className="progress-bar"
              initial={{ width: 0 }}
              animate={{
                width: currentIndex === index ? '100%' : '0%',
              }}
              transition={
                currentIndex === index
                  ? { duration: slideInterval / 1000, ease: 'linear' }
                  : {}
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
