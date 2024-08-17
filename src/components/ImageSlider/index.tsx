import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageSlider.scss';
import React, { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import LikeButton from "../../shared/LikeButton";
import Rating from "../../shared/Rating";
import {currentIndexAtom} from "./slider.atoms.ts";
import Close from "../../shared/Close";



const SlideIntervalConst = 7000;

const ImageSlider: React.FC<{ images: string[],rating?:number,canLike?:boolean, isLiked?:boolean,onClose?:()=>void }> = ({ images, rating,canLike,isLiked,onClose }) => {
  debugger
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
    return () => {
      stopSlideShow();
      setCurrentIndex(0);  // Reset the currentIndex when component unmounts
    };
  }, [images?.length]);

  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    infinite: true,
    speed: SlideIntervalConst / 10,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: SlideIntervalConst / 10,
    draggable: true,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setCurrentIndex(newIndex);
      stopSlideShow();
    },
    afterChange: () => {
      startSlideShow();
    },
  };

  return (
    <div className="image-slider">
      <Slider ref={sliderRef} {...settings}>
        {images?.map((src, index) => (
          <div key={index} className="slider-image-wrapper">
            {Boolean(rating) && (
              <div className="rating-container">
                <Rating rating={rating} />
              </div>
            )}
            <img src={src} alt={`Image ${index + 1}`} className="slider-image" />
            {canLike && (
              <div className="like-container">
                <LikeButton isLiked={isLiked} iconSrc={'/like-big.svg'}/>
              </div>
            )}
            {onClose && (
                <div className="close-container">
                  <Close onClose={onClose}/>
                </div>
            )}

          </div>
        ))}
      </Slider>
      <div className="progress-indicator">
        {images?.length > 1 && images?.map((_, index) => (
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
