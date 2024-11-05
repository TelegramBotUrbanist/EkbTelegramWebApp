import React from 'react';
import './TableCard.scss';
import { TableCardProps, TimeOfDay } from '../../book.types';

interface IProps {
  table: TableCardProps;
  onClick: () => void;
}

const formatTime = (time: TimeOfDay): string => {
  return `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`;
};

const TableCard: React.FC<IProps> = ({ table, onClick }) => {
  const {
    tableName,
    photoUrl,
    capacity,
    hallName,
    occupied,
    nextBooking,
    occupiedUntil,
    freeTimePeriodForNextBooking,
    bookings
  } = table;

  return (
    <div className="table-card">
      <div onClick={onClick} className="image-container">
        <img
          src={photoUrl.imgUrl}
          alt={tableName}
          className="table-image"
          onDragStart={(e) => e.preventDefault()}
        />
        <div className="statuses">
          {!occupied && nextBooking && (
            <div className="period pre-period">
              Свободно до {formatTime(nextBooking)}
              {freeTimePeriodForNextBooking &&<div className="sub-period">
                До брони {formatTime(freeTimePeriodForNextBooking)}
              </div>}
            </div>
          )}
          {occupied && occupiedUntil && (
            <div className="period pre-period">
              Занято до {formatTime(occupiedUntil)}
            </div>
          )}
          {bookings.slice(-5).map((booking, index) => (
            <div key={index} className="period">
              Занят с {formatTime(booking.bookingStart)} до {formatTime(booking.bookingEnd)}
            </div>
          ))}
        </div>
      </div>
      <div className="details">
        <span className="location">{hallName}</span>
        <div className="block">
          <div className="name">№{tableName}</div>
          <div className="capacity">
            <div className={`status-indicator ${occupied ? 'occupied' : 'available'}`} />
            <img src="/capacity.svg" alt="Capacity" />
            <span>{capacity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableCard;