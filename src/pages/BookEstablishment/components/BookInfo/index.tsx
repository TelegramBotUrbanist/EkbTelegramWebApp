import React from 'react';
import Header from '../Header';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './BookInfo.scss'
import CustomInput from '../../../../shared/Input';
import { useAtom, useAtomValue } from 'jotai';
import { contactDataAtom, currentTableValueAtom } from '../../book.atoms.ts';
import Button from '../../../../shared/Button';
import { handleSubmitSnackBar } from '../../../../utils/snackbar.ts';
import { useLoadableAtom } from '../../../../hooks/useLoadableAtom.ts';
import { establishmentAtom } from '../../../Establishment/components/Details/details.atoms.ts';
import { eventAtom } from '../../../Events/events.atoms.ts';
import { Simulate } from 'react-dom/test-utils';
import load = Simulate.load;
import Loader from '../../../../shared/Loader';
import { BookingButton } from '../../../../components/BookingButton';

interface BookInfoProps {
  type: 'establishment' | 'events'; // Добавляем пропс для типа
}

const BookInfo: React.FC<BookInfoProps> = ({ type }) => {
  const { id } = useParams();
  const [contactData, setContactData] = useAtom(contactDataAtom);
  const { data: establishmentData, loading: establishmentLoading } = useLoadableAtom(establishmentAtom, );
  const { data: eventData, loading: eventLoading } = useLoadableAtom(eventAtom, );
  const currentTableId = useAtomValue(currentTableValueAtom).id
  const data = type === 'establishment' ? establishmentData : eventData;
  const loading = type === 'establishment' ? establishmentLoading : eventLoading;

  const handleChangeValue = (name: string, value: string) => {
    setContactData((prev) => ({ ...prev, [name]: value }));
  };



  const navigate = useNavigate();

  if (loading) return <Loader/>

  return (
    <div className={'book_contacts'}>

      <Header title={`Контактная информация`} cls={'header'} />
      <div className={'book_contacts__inputs'}>
        <CustomInput
            required={true}
          label={'Ваше имя'}
          name={'name'}
          value={contactData.name}
          onChange={handleChangeValue}
          type="text"
          placeholder="Алексей"
        />
        <CustomInput
            required={true}
          label={'Телефон'}
          name={'phone'}
          value={contactData.phone}
          onChange={handleChangeValue}
          type="tel"
          placeholder="+7 999 999 99 99"
        />
        <CustomInput
          label={'Комментарий'}
          name={'comment'}
          value={contactData.comment}
          onChange={handleChangeValue}
          type="text"
          placeholder="Что хотели бы рассказать нам?"
        />
        {/* Поле промокода отображаем только для заведения */}
        {type === 'establishment' && (
          <CustomInput
            label={'Промокод'}
            name={'promo'}
            value={contactData.promo}
            onChange={handleChangeValue}
            type="text"
            placeholder="Промокод"
          />
        )}
      </div>
      <div className={'buttonContainer'}>
        <BookingButton type={type} id={id} data={{ ...data,number:currentTableId }}/>
      </div>
    </div>
  );
};

export default BookInfo;
