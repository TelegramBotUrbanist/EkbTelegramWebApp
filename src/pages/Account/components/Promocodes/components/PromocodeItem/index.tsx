import React from 'react';
import './Item.scss';
import { PromoCode } from '../../promocodes.types.ts';

interface PromoCodeItemProps {
  promoCode: PromoCode;
  onClick: () => void;
}

const PromoCodeItem: React.FC<PromoCodeItemProps> = ({ promoCode, onClick }) => {
  return (
    <div className="promo-code-item" onClick={onClick}>
      <div className="promo-code-item__image">
        <img src={promoCode.image} alt={promoCode.title} />
      </div>
      <div className="promo-code-item__content">
        <div className="promo-code-item__header">
          <h3 className="promo-code-item__title">{promoCode.title}</h3>
        </div>
        <p className="promo-code-item__description">
          <span className="promo-code-item__discount">{promoCode.discount}% </span>
          {promoCode.description}</p>
      </div>
    </div>
  );
};

export default PromoCodeItem;


