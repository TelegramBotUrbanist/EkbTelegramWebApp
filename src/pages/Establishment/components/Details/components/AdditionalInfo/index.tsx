import React from 'react';
import { EstablishmentDetails } from '../../details.types.ts';
import './Info.scss'
interface AdditionalInfoProps {
  data: EstablishmentDetails | null;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ data }) => {
  if (!data) {
    return <p>Информация недоступна</p>; // Обработка случая, когда данные отсутствуют
  }

  const {
    averageBill,
    hasDelivery,
    hasParking,
    hasCatering,
    hasBanquets,
    phoneNumbers,
    webSiteLink,
  } = data;

  return (
    <div className="additional-info">
      <p>Средний чек: <span>{averageBill}</span></p>
      <p>Доставка: <span>{hasDelivery ? 'Да' : 'Нет'}</span></p>
      <p>Парковка: <span>{hasParking ? 'Да' : 'Нет'}</span></p>
      <p>Кейтеринг: <span>{hasCatering ? 'Да' : 'Нет'}</span></p>
      <p>Банкеты: <span>{hasBanquets ? 'Да' : 'Нет'}</span></p>
      <p>Телефон: <span>{phoneNumbers.join(', ')}</span></p>
      <p>Сайт: <a href={webSiteLink}>{webSiteLink}</a></p>
    </div>
  );
};

export default AdditionalInfo;
