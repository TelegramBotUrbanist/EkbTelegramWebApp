import React from 'react';
import './EstablishmentCard.scss';
import { FoodEstablishmentInfoDto } from '../../categorySection.types.ts';
import classNames from 'classnames';
import Rating from '../../../../../../shared/Rating';
import LikeButton from '../../../../../../shared/LikeButton';

interface EstablishmentCardProps {
  establishment: FoodEstablishmentInfoDto;
  isDetailed?:boolean
}


const EstablishmentCard: React.FC<EstablishmentCardProps> = ({isDetailed, establishment }) => {

  const getDateForCaption = () => {
    if(establishment.type==='WORKING_HOURS') return ''
    else if (establishment.type === 'DATE_TIME') return <span>13 ноября в 18:00</span>
    else if (establishment.type === 'PERIOD') return <span>Июнь - Сентябрь</span>
  }

  return (
    <div className="establishment-card">
      <div className={classNames("image-container",{"detailed":isDetailed})}>
        <img
          src={establishment.imgUrl}
          alt={establishment.title}
          className={"establishment-image"}
          onDragStart={(e) => e.preventDefault()}
        />
      <Rating rating={establishment.serialNumber}/>
        {establishment.promotionExist && (
          <div className="promotion">Розыгрыш</div>
        )}
        <LikeButton/>
      </div>
      <div className="details">
        <span className="category">
          {establishment.categoryForEstablishmentInfoDto.title}
        </span>
        <div className="name">{establishment.title}</div>
        <span>{getDateForCaption()}</span>
      </div>
    </div>
  );
};

export default EstablishmentCard;
