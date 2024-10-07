import React, { useState } from 'react';
import Modal from '../../shared/Modal'; // Импортируем универсальную модалку
import Button from '../../shared/Button';
import CustomInput from '../../shared/Input';
import './PromoCode.scss'
interface IProps {
  promoCode: {
    code: string;
    receivedByUser: boolean;
  };
  onClose: () => void;
  onPromoCodeReceived: () => void;
}

const PromoCodeModal: React.FC<IProps> = ({ promoCode, onClose, onPromoCodeReceived }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(promoCode.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal align={'end'} onClose={onClose} title="Ваш промокод на скидку 10%">
      <p>
        Распространяется на всё меню ресторана, за исключением барной карты. Действует с 10 мая по 10 июля.
      </p>

      <CustomInput
        value={promoCode.code}
        onChange={() => {}}
        type={!promoCode.receivedByUser ? 'password' : 'text'}
        placeholder="Промокод"
        onCopy={handleCopyClick}
        // onEditClick={handleCopyClick} // Кнопка для копирования
      />
      <div className={'promoModal-button'}>
      {!promoCode.receivedByUser ? (
        <Button type="primary" onClick={onPromoCodeReceived}>
          Получить промокод
        </Button>
      ) : (
        <Button type="secondary" disabled>
          Промокод получен
        </Button>
      )}
      </div>
    </Modal>
  );
};

export default PromoCodeModal;
