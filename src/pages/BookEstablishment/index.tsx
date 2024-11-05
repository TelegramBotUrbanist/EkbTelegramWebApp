import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import CreateBook from './components/CreateBook/CreateBook.tsx';
import Calendar from '../../components/Calendar';
import CustomInput from '../../shared/Input';
import { useAtom } from 'jotai';
import { calendarValueAtom, guestCountAtom, tablesForDateAtom } from './book.atoms.ts';
import { useLoadableAtom } from '../../hooks/useLoadableAtom.ts';
import TableCard from './components/TableCard';
import './BookEstablishment.scss'
import Header from './components/Header';
import { eventAtom, eventsAtom } from '../Events/events.atoms.ts';
import { establishmentAtom } from '../Establishment/components/Details/details.atoms.ts';
import Button from '../../shared/Button';
import BookingTime from '../Establishment/components/Details/components/BookingTime';

interface IndexProps {
  type: 'establishment' | 'events'; // Добавляем пропс для типа
}
const Index:React.FC<IndexProps> = ({ type }) =>{
  const {id} = useParams()
  const [guestCount,setGuestCount] = useAtom(guestCountAtom)
  const { data: establishmentData, loading: establishmentLoading } = useLoadableAtom(establishmentAtom,[id] );
  const { data: eventData, loading: eventLoading } = useLoadableAtom(eventAtom, );

  const data = type === 'establishment' ? establishmentData : eventData;
  console.log(data,'data');
  const loading = type === 'establishment' ? establishmentLoading : eventLoading;


  const navigate = useNavigate()
  if(loading) return <></>

  return (
    <div className={'book_establishment'}>
      <Header
        title={type === 'establishment' ? data?.title : data?.title} // Используем данные в зависимости от типа
        onClose={() => navigate(type === 'establishment' ? `establishment/${id}` : `events/${id}`)}
      />
      <div className={'book_establishment__inputs'}>
        <div className={'book_establishment__inputs--header'}>Бронирование</div>
        <CustomInput
          name={'count'}
          label={'Количество гостей'}
          value={guestCount}
          onChange={(name, value) => setGuestCount(value as Number)}
          type="number"
          placeholder="Количество гостей"
        />
        <Calendar label={type==='establishment' ? 'Дата бронирования' : 'Дата регистрации'} />
      </div>

      {/* Условный рендер столов только если это заведение */}
      {type === 'establishment' && (
        <>
          <BookingTime tableId={id}/>


        </>
      )}
      {type==='events' && (
        <div className={'buttonContainer'}>
          <Link to={`events/${id}/book/info`}>
            <Button type="primary">Далее</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Index;