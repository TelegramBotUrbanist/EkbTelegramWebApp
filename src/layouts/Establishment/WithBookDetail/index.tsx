import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import BookDetails from '../../../pages/BookEstablishment/components/BookDetails';
import { useLoadableAtom } from '../../../hooks/useLoadableAtom.ts';
import { establishmentAtom } from '../../../pages/Establishment/components/Details/details.atoms.ts';
import { eventAtom } from '../../../pages/Events/events.atoms.ts';
import Header from '../../../pages/BookEstablishment/components/Header';
import { useAtomValue } from 'jotai';
import { bookingTimeAtom } from '../../../pages/Establishment/components/Details/components/BookingTime/time.atoms.ts';
import './styles.scss'
interface IProps{
  children:any
  withHeader?:boolean,
  type?:'establishment'|'event'
}
const Index:React.FC<IProps> = ({children,withHeader=true,type='establishment'}) => {
  const navigate = useNavigate()
  const {id} = useParams()
  const { data: establishmentData, loading: establishmentLoading } = useLoadableAtom(establishmentAtom, );
  debugger
  const { data: eventData, loading: eventLoading } = useLoadableAtom(eventAtom, );
  const bookTime = useAtomValue(bookingTimeAtom)
  const data = type==='establishment' ? establishmentData : eventData
  if (!bookTime.startTime.hours || !bookTime.endTime.hours){
    navigate(type === 'establishment' ? `establishment/${id}/book` : `events/${id}/book`)
    return
  }
  return (
    <div className={'detailed-container'}>
      {withHeader &&  <Header
        title={data?.title} // Используем данные в зависимости от типа
        onClose={() => navigate(type === 'establishment' ? `establishment/${id}` : `events/${id}`)}
      />}
      <BookDetails/>
      {children}
    </div>
  );
};

export default Index;