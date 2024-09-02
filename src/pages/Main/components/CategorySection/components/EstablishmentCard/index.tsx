import React from 'react';
import './EstablishmentCard.scss';
import { FoodEstablishmentInfoDto } from '../../categorySection.types.ts';
import classNames from 'classnames';

interface EstablishmentCardProps {
  establishment: FoodEstablishmentInfoDto;
  isDetailed?:boolean
}

const EstablishmentCard: React.FC<EstablishmentCardProps> = ({isDetailed, establishment }) => {
  return (
    <div className="establishment-card">
      <div className={classNames("image-container",{"detailed":isDetailed})}>
        <img
          src={establishment.imgUrl}
          alt={establishment.title}
          className={"establishment-image"}
          onDragStart={(e) => e.preventDefault()}
        />
        <div className="rating">
          <span>{establishment.serialNumber}</span>
        </div>
        {establishment.promotionExist && (
          <div className="promotion">Розыгрыш</div>
        )}
        <div className="like-button">
          <img src="/heart.svg" alt="Like" />
        </div>
      </div>
      <div className="details">
        <span className="category">
          {establishment.categoryForEstablishmentInfoDto.title}
        </span>
        <div className="name">{establishment.title}</div>
      </div>
    </div>
  );
};

export default EstablishmentCard;
