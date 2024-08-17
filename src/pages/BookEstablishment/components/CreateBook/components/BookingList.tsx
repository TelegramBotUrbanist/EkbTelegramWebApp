import './list.scss'
const BookingList = ({ bookings }) => {
  const formatTime = (time) => {
    const hour = String(time.hour).padStart(2, '0');
    const minute = String(time.minute).padStart(2, '0');
    return `${hour}:${minute}`;
  };

  const calculateDuration = (start, end) => {
    const startMinutes = start.hour * 60 + start.minute;
    const endMinutes = end.hour * 60 + end.minute;
    const diffMinutes = endMinutes - startMinutes;

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    if (minutes === 0) {
      return `${hours} часа`;
    }
    return `${hours} часа ${minutes} мин`;
  };

  return (
    <div className="booking-list">
      {bookings.map((booking, index) => {
        const timeRange = `${formatTime(booking.bookingStart)}-${formatTime(booking.bookingEnd)}`;
        const duration = calculateDuration(booking.bookingStart, booking.bookingEnd);

        return (
          <div key={index} className="booking-value">
            <span className="book">
              Бронь №{index + 1}: <span className={'range'}>{timeRange}</span>{' '}
              <span className="duration">{duration}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default BookingList
