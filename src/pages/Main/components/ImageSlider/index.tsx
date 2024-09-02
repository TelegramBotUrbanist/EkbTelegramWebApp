import React, { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { imagesAtom, currentIndexAtom } from './slider.atoms.ts';
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageSlider.scss';

const SlideIntervalConst = 7000;

const ImageSlider: React.FC = () => {
  const [images] = useAtom(imagesAtom);
  const [currentIndex, setCurrentIndex] = useAtom(currentIndexAtom);
  const intervalRef = useRef<NodeJS.Timeout | string | number | undefined>(undefined);

  const startSlideShow = () => {
    intervalRef.current = setInterval(() => {
      sliderRef.current?.slickNext();
    }, SlideIntervalConst);
  };

  const stopSlideShow = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startSlideShow();
    return () => stopSlideShow();
  }, [images.length]);

  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    // dots: true,
    infinite: true,
    speed: SlideIntervalConst / 10,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: SlideIntervalConst / 10,
    draggable: true,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setCurrentIndex(newIndex);
      stopSlideShow(); // Останавливаем слайдшоу при ручном перелистывании
    },
    afterChange: () => {
      startSlideShow(); // Перезапускаем слайдшоу после завершения перелистывания
    },
  };

  if (!images || images.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="image-slider">
      <Slider ref={sliderRef} {...settings}>
        {images.map((src, index) => (
          <div key={index} className="slider-image-wrapper">
            <img src={src} alt={`Image ${index + 1}`} className="slider-image" />
          </div>
        ))}
      </Slider>
      <div className="progress-indicator">
        {images.map((_, index) => (
          <div key={index} className="progress-segment">
            <div
              className={`progress-bar ${currentIndex === index ? 'active' : ''}`}
              style={{
                width: currentIndex === index ? '100%' : '0%',
                transition: currentIndex === index ? `width ${SlideIntervalConst}ms linear` : 'none',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
