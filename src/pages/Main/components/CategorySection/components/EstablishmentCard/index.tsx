import React from 'react';
import './EstablishmentCard.scss';
import { FoodEstablishmentInfoDto } from '../../categorySection.types.ts';
import classNames from 'classnames';
import Rating from '../../../../../../shared/Rating';
import LikeButton from '../../../../../../shared/LikeButton';
import {formatDateTime, formatPeriod} from "../../../../../../utils/date.ts";

interface EstablishmentCardProps {
  establishment: FoodEstablishmentInfoDto;
  isDetailed?:boolean
    onLikeClick:()=>void
}


const EstablishmentCard: React.FC<EstablishmentCardProps> = ({isDetailed, establishment,onLikeClick }) => {
  const getDateForCaption = () => {
    if(establishment.type==='WORKING_HOURS') return ''
    else if (establishment.type === 'DATE_TIME') return <span>{formatDateTime(establishment?.dateTime)}</span>
    else if (establishment.type === 'PERIOD') return <span>{formatPeriod(establishment?.startDate,establishment?.endDate)}</span>
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
          <div onClick={(e)=>{
              e.preventDefault()
              e.stopPropagation()
              onLikeClick()
          }} className={'like-container'}>
              <LikeButton isLiked={establishment.inFavorites}/>
          </div>

      </div>
      <div className="details">
        <span className="category">
          {establishment.categoryForEstablishmentInfoDto.title}
        </span>
        <div className="name">{establishment.title}</div>
          {establishment.type && <span className={'details__time'}>{getDateForCaption()}</span>}
      </div>
    </div>
  );
};

export default EstablishmentCard;
