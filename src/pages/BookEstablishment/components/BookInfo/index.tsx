import React from 'react';
import Header from '../Header';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './BookInfo.scss'
import CustomInput from '../../../../shared/Input';
import { useAtom } from 'jotai';
import { contactDataAtom } from '../../book.atoms.ts';
import Button from '../../../../shared/Button';
import { handleSubmitSnackBar } from '../../../../utils/snackbar.ts';


const Index = () => {
  const {id} = useParams()
  const [contactData,setContactData] = useAtom(contactDataAtom)

  const handleChangeValue = (name,value) =>{
    setContactData((prev)=>({...prev,[name]:value}))
  }

  const navigate = useNavigate()
  return (
    <div className={'book_contacts'}>
      <Header title={'Kitchen'} onClose={() => navigate(`establishment/${id}`)} />
      <Header title={`Контактная информация`} cls={'header'} />
      <div className={'book_contacts__inputs'}>
        <CustomInput
          label={'Ваше имя'}
          name={'name'}
          value={contactData.name}
          onChange={handleChangeValue}
          type="text"
          placeholder="Алексей *"
          // onEditClick={handleCopyClick} // Кнопка для копирования
        />
        <CustomInput label={'Телефон'}
                     name={'phone'}
                     value={contactData.phone}
                     onChange={handleChangeValue}
                     type="text"
                     placeholder="+7 999 999 99 99 *"
          // onEditClick={handleCopyClick} // Кнопка для копирования
        />
        <CustomInput
          label={'Комментарий'}
          name={'comment'}
          value={contactData.comment}
          onChange={handleChangeValue}
          type="text"
          placeholder="Что хотели бы рассказать нам?"
          // onEditClick={handleCopyClick} // Кнопка для копирования
        />
        <CustomInput
          label={'Промокод'}
          name={'promo'}
          value={contactData.promo}
          onChange={handleChangeValue}
          type="text"
          placeholder="Промокод"
          // onEditClick={handleCopyClick} // Кнопка для копирования
        />
      </div>
      <div className={'buttonContainer'}>
        <Link onClick={()=>handleSubmitSnackBar('Столик забронирован')} to={`establishment/${id}`}>
          <Button type="primary">Забронировать</Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;