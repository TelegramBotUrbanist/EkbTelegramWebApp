import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import CreateBook from './components/CreateBook/CreateBook.tsx';
import Calendar from '../../components/Calendar';
import CustomInput from '../../shared/Input';
import { useAtom } from 'jotai';
import { calendarValueAtom, tablesForDateAtom } from './book.atoms.ts';
import { useLoadableAtom } from '../../hooks/useLoadableAtom.ts';
import TableCard from './components/TableCard';
import './BookEstablishment.scss'
import Header from './components/Header';
import { eventAtom, eventsAtom } from '../Events/events.atoms.ts';
import { establishmentAtom } from '../Establishment/components/Details/details.atoms.ts';

interface IndexProps {
  type: 'establishment' | 'event'; // Добавляем пропс для типа
}
const Index:React.FC<IndexProps> = ({ type }) =>{
  const {id} = useParams()
  const { data: establishmentData, loading: establishmentLoading } = useLoadableAtom(establishmentAtom, );
  const { data: eventData, loading: eventLoading } = useLoadableAtom(eventAtom, );

  const data = type === 'establishment' ? establishmentData : eventData;
  const loading = type === 'establishment' ? establishmentLoading : eventLoading;

  const { data: tablesData, loading: tablesLoading } = useLoadableAtom(tablesForDateAtom, [],{
    enabled: type === 'establishment', // Загружаем столы только если это заведение
  });
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
        <Calendar label={'Дата бронирования'} />
        <CustomInput
          name={'count'}
          label={'Количество гостей'}
          value={1}
          onChange={() => {}}
          type="number"
          placeholder="Количество гостей"
        />
      </div>

      {/* Условный рендер столов только если это заведение */}
      {type === 'establishment' && (
        <>
          <Header title={'Столы'} cls={'header'} />
          <div className='tables'>
            {tablesData?.availableTables.map((table) => (
              <TableCard
                onClick={() => navigate(`establishment/${id}/tables/${table.id}`, { replace: true })}
                key={table.id}
                table={table}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Index;