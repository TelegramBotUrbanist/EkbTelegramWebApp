import React from 'react';
import Button from '../../shared/Button';
import './EmptyEstablishments.scss';

interface EmptyEstablishmentsProps {
  mainLabel: string;
  secondLabel: string;
  onClick?: () => void;
  buttonText?: string;
  imagePath?: string;
}

const EmptyEstablishments: React.FC<EmptyEstablishmentsProps> = ({
                                                                   mainLabel,
                                                                   secondLabel,
                                                                   onClick,
                                                                   buttonText = 'Посмотреть места',
                                                                   imagePath = '/empty_reservation.gif'
                                                                 }) => {
  return (
    <div className="empty-state">
      <div className="empty-state--container">
        <img
          className="empty-state--container-image"
          src={imagePath}
          alt="Empty state"
        />
        <div className="empty-state--container-empty">
          {mainLabel}
        </div>
        <div className="empty-state--container-empty-label">
          {secondLabel}
        </div>
        {onClick && (
          <div className="empty-state--container-button">
            <Button onClick={onClick} type="primary">
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyEstablishments;