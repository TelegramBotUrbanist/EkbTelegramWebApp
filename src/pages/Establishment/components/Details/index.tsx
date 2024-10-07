import React, { useState } from 'react';
import './details.scss';
import Button from '../../../../shared/Button';
import ImageSlider from '../../../../components/ImageSlider';
import DescriptionComponent from './components/Description';
import AddressComponent from './components/Address';
import MapComponent from '../../../../components/Map/MapSmall';
import { establishmentAtom, fetchPromoCodeAtom } from './details.atoms.ts';
import Loader from '../../../../shared/Loader';
import { useLoadableAtom } from '../../../../hooks/useLoadableAtom.ts';
import MainInfoComponent from './components/MainInfo';
import { isMobile } from 'react-device-detect';
import AdditionalInfo from './components/AdditionalInfo';
import { AnimatePresence } from 'framer-motion';
import Modal from '../../../../shared/Modal';
import PromoCodeModal from '../../../../components/PromoCodeModal';
import { useAtom } from 'jotai';
import CustomInput from '../../../../shared/Input';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AgeRatingRu } from '../../../Events/events.types.ts'; // Либо другая библиотека для определения устройства

interface IProps{
  data:any
  type:'establishment' | 'events'
  id:number
}

const EstablishmentDetails:React.FC<IProps> = ({ id,type,data }) => {
  debugger
  const [, fetchPromoCode] = useAtom(fetchPromoCodeAtom);
  const navigate = useNavigate()

  const handleGetPromoCode = () => {
    // Отправляем запрос на получение промокода
    fetchPromoCode();
  };


  const [isPromoCodeModalOpen, setPromoCodeModalOpen] = useState(false);



  const {
    title,
    categoryForEstablishmentInfoDto: mainCategory,
    innerCategoryInfo: innerCategory,
    description,
    mapLocation,
    imgs,
    openingHours,
    costLevel,
    promoCode,
    ageRating,
    rating,
    dateTime,
    startDate,
    endDate,
    type:eventType
  } = data;
  console.log(data)
  // Функция для открытия ссылки на карту
  const handleMapClick = () => {
    const yandexMapsBaseUrl = 'https://yandex.ru/maps/?pt=';
    const yandexAppUrl = 'yandexmaps://maps.yandex.ru/?pt='; // Для открытия через приложение

    const coordinates = `${mapLocation.longitude},${mapLocation.latitude}`;

    if (isMobile) {
      // Открыть приложение Яндекс.Карт на мобильных устройствах
      window.location.href = `${yandexAppUrl}${coordinates}`;
    } else {
      // Открыть Яндекс.Карты в браузере на ПК
      window.open(`${yandexMapsBaseUrl}${coordinates}&z=16&l=map`, '_blank');
    }
  };

  const openPromoCodeModal = () => {
    setPromoCodeModalOpen(true);
  };

  const closePromoCodeModal = () => {
    setPromoCodeModalOpen(false);
  };


  return (
    <div className="establishment-details">
      <ImageSlider rating={rating} canLike={true} images={imgs.map((img) => img.url)} />
      <div className={'establishment-main'}>
        <MainInfoComponent
          type={eventType}
          ageLevel={type==='establishment' ? null : AgeRatingRu[ageRating]}
          title={title}
          address={data?.locationInfo}
          hours={{
            openingHours,
            dateTime,
            startDate,
            endDate
          }}
          mainCategory={mainCategory}
          innerCategory={innerCategory}
          costLevel={costLevel}
        />
        <DescriptionComponent description={description} />

        {promoCode && type==='establishment' && (
          <div className={'establishment-details__promo'}>
            <Button type="secondary" onClick={openPromoCodeModal}>
              Получить промокод
            </Button>
          </div>
        )}

        <AddressComponent address={data?.locationInfo} />
        <div className={'buttonContainer'}>
          <Link to={`${type}/${id}/book`} >
            <Button type="primary">{type === 'establishment' ? 'Забронировать столик' :'Зарегистрироваться'}</Button>
          </Link>
        </div>

        {/* Добавляем обработчик клика для карты */}
        <div onClick={handleMapClick}>
          <MapComponent
            latitude={mapLocation.latitude}
            longitude={mapLocation.longitude}
            pointTitle={mapLocation.pointTitle}
          />
        </div>
        {type === 'establishment' && <AdditionalInfo data={data}/>}
        <AnimatePresence>
          {type === 'establishment' && isPromoCodeModalOpen && (
            <PromoCodeModal onPromoCodeReceived={handleGetPromoCode} promoCode={promoCode} onClose={closePromoCodeModal} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EstablishmentDetails;
