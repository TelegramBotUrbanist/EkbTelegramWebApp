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

    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    const handlePhoneClick = (phoneNumber: string) => {
        if (isIOS) {
            // Для iOS откроем окно для вызова
            window.location.href = `telprompt:${phoneNumber}`;
        } else if (isAndroid) {
            // Для Android откроем приложение "Телефон" с номером
            window.location.href = `tel:${phoneNumber}`;
        }
    };

  return (
    <div className="additional-info">
      <p>Средний чек: <span>{averageBill}</span></p>
      <p>Доставка: <span>{hasDelivery ? 'Да' : 'Нет'}</span></p>
      <p>Парковка: <span>{hasParking ? 'Да' : 'Нет'}</span></p>
      <p>Кейтеринг: <span>{hasCatering ? 'Да' : 'Нет'}</span></p>
      <p>Банкеты: <span>{hasBanquets ? 'Да' : 'Нет'}</span></p>
      <div className={'info_telephone'}>Телефон: <div>{phoneNumbers?.map((phone, index) => (
          <span
              key={index}
              onClick={() => handlePhoneClick(phone)}
              className={'info_telephone_tel'}
          >
            {phone}
          </span>
      ))}</div></div>
      <p>Сайт: <a href={webSiteLink}>{webSiteLink}</a></p>
    </div>
  );
};

export default AdditionalInfo;
