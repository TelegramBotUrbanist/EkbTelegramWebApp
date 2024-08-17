import { useNavigate } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai';
import { bookingModalAtom } from '../BookingModal/booking.atom.ts';
import Button from '../../shared/Button';
import { formatDate } from '../../utils/date.ts';
import { calendarValueAtom } from '../../pages/BookEstablishment/book.atoms.ts';

export const BookingButton = ({ type, id, data }) => {
  const [, setBookingModal] = useAtom(bookingModalAtom);
  const calendarValue = useAtomValue(calendarValueAtom)
  const navigate = useNavigate();

  const handleClick = () => {
    setBookingModal({
      showModal: true,
      message: type === 'establishment' ? <div><b>{`Столик №${data.number} забронирован`}</b><p>{formatDate(calendarValue)}</p></div> : <span>{'Вы зарегистрировались'}<br/>{`${formatDate(calendarValue)}`}</span>,
      type
    });
    // Переход к соответствующей странице
    navigate(type === 'establishment' ? `/establishment/${id}` : `/events/${id}`);
  };

  return (
    <Button type="primary" onClick={handleClick}>
      {type === 'establishment' ? 'Забронировать' : 'Зарегистрироваться'}
    </Button>
  );
};