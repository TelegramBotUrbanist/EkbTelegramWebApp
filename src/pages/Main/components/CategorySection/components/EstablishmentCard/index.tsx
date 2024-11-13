import React, { useRef, useState } from 'react';
import './EstablishmentCard.scss';
import { EventType, FoodEstablishmentInfoDto } from '../../categorySection.types.ts';
import classNames from 'classnames';
import Rating from '../../../../../../shared/Rating';
import LikeButton from '../../../../../../shared/LikeButton';
import { formatDateTime, formatDateWithPrefix, formatPeriod } from '../../../../../../utils/date.ts';
import { AnimatePresence,motion } from 'framer-motion';
import { Checkbox, Radio } from '@telegram-apps/telegram-ui';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetRef } from 'react-modal-sheet';
import Button from '../../../../../../shared/Button';

interface EstablishmentCardProps {
  establishment: FoodEstablishmentInfoDto;
  isDetailed?: boolean;
  onLikeClick: () => void;
  type: 'establishments' | 'events' | 'account';
  onReservationSelect?: (ids: number[]) => void;
  selectedReservationIds?: number[];
}

const getStatusColor = (status: string) => {
  const colors = {
    'WAITING': '#FEFEB1',
    'REJECTED': '#FFCCCC',
    'APPROVED': '#CCFFCC',
    'FINISHED': '#9f9f9f'
  };
  return colors[status] || 'var(--tg-theme-text-color)';
};

const getStatusText = (status: string) => {
  const texts = {
    'WAITING': 'Ждет подтверждения',
    'REJECTED': 'Отклонена',
    'APPROVED': 'Подтверждена',
    'FINISHED': 'Завершена'
  };
  return texts[status] || status;
};


const EstablishmentCard: React.FC<EstablishmentCardProps> = ({
                                                               isDetailed,
                                                               establishment,
                                                               onLikeClick,
                                                               type,
                                                               onReservationSelect,
                                                               // selectedReservationIds = []
                                                             }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedReservationIds,setSelectedReservationIds] = useState([])
  const navigate = useNavigate()
  const getDateForCaption = () => {
    if (type === 'account' && establishment.reservationBidInfoList?.length === 1) {
      const reservation = establishment.reservationBidInfoList[0];
      return (
        <>
          <div className="table-info">
            {`Стол №${reservation.tableTitle}, ${reservation.guestsCount} ${
              reservation.guestsCount === 1 ? 'гость' : 'гостя'
            }`}
          </div>
          <div className="date-info">
            {formatDateTime(reservation.date)}
          </div>
        </>
      );
    }

    if (!establishment.type) return null;

    switch (establishment.type) {
      case EventType.WORKING_HOURS:
        return '';
      case EventType.DATE_TIME:
        return establishment.dateTime && <span>{formatDateTime(establishment.dateTime)}</span>;
      case EventType.PERIOD:
        return establishment.startDate && establishment.endDate &&
          <span>{formatPeriod(establishment.startDate, establishment.endDate)}</span>;
      default:
        return null;
    }
  };
  const handleReservationSelect = (id: number) => {
      const newSelectedIds = selectedReservationIds.includes(id)
        ? selectedReservationIds.filter(selectedId => selectedId !== id)
        : [...selectedReservationIds, id];
      setSelectedReservationIds(newSelectedIds);
  };

  const renderReservationStatus = () => {
    const reservations = establishment.reservationBidInfoList;
    if (!reservations || reservations.length === 0) return null;

    if (reservations.length === 1) {
      return (
        <div
          className="reservation-status"
          style={{ backgroundColor: getStatusColor(reservations[0].reservationStatus) }}
        >
          {getStatusText(reservations[0].reservationStatus)}
        </div>
      );
    }

    if (reservations.length > 1) {
      return (
        <div
          className="reservation-status more-details"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDetailsOpen(!isDetailsOpen);
          }}
        >
          Подробнее...
        </div>
      );
    }
  };



  const handleNavigate = () => {
    return  type === 'establishments' ? navigate(`/establishment/${0}`) : type == 'events' ?  navigate(`/events/${0}`) : setIsDetailsOpen(true)
  }

  return (
    <div onClick={handleNavigate} className="establishment-card">
      <div className={classNames ('image-container', { 'detailed': isDetailed })}>
        <img
          src={establishment.imgUrl}
          alt={establishment.title}
          className="establishment-image"
          onDragStart={(e) => e.preventDefault ()}
        />
        <Rating rating={establishment.serialNumber} />

        {establishment.promotionExist && <div className="promotion">Розыгрыш</div>}

        <div onClick={(e) => {
          e.preventDefault ();
          e.stopPropagation ();
          onLikeClick ();
        }} className="like-container">
          <LikeButton isLiked={establishment.inFavorites} />
        </div>
        {type === 'account' && renderReservationStatus()}
      </div>





      <div className="details">
        <span className="category">
          {establishment.categoryForEstablishmentInfoDto.title}
        </span>
        <div className="name">{establishment.title}</div>
        <div className="details__time">{getDateForCaption()}</div>
      </div>
      {type === 'account' && <ModalSheetContainer establishment={establishment} setIsSheetOpen={setIsDetailsOpen} navigate={navigate} isSheetOpen={isDetailsOpen} handleReservationSelect={handleReservationSelect} onReservationSelect={onReservationSelect} selectedReservationIds={selectedReservationIds}/>}
    </div>
  );
};

export default EstablishmentCard;

const ModalSheetContainer = ({establishment,isSheetOpen,setIsSheetOpen,selectedReservationIds,handleReservationSelect,onReservationSelect,navigate}) => {
  const snapPoints = [450,300,];
  const ref = useRef<SheetRef>();
  const handleNavigate = () => {
    debugger
    return  establishment.entityType === 'FOOD_ESTABLISHMENT' ? navigate(`/establishment/${0}`) :  navigate(`/events/${0}`)
  }
  return (
      <Sheet ref={ref}
        className={'establishment-card-sheet'}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        snapPoints={snapPoints}
        initialSnap={1}
        onSnap={(index) => {
          if (index === 2) setIsSheetOpen(false);
        }}
      >
        <Sheet.Container  >
          <div className={'sheet-container'}>
          <Sheet.Header className={'sheet-main-header'}>Детали бронирования</Sheet.Header>
          <Sheet.Header>
            <div className="sheet-header">
              <div className="establishment-info">
                <img
                  src={establishment.imgUrl}
                  alt={establishment.title}
                  className="establishment-preview"
                />
                <div className="text-info">
                  <span className="category">{establishment.categoryForEstablishmentInfoDto.title}</span>
                  <h2>{establishment.title}</h2>
                  <Button onClick={()=>handleNavigate()} type={'secondary'}>Подробнее</Button>
                </div>
              </div>
              <button className="close-button" onClick={() => setIsSheetOpen(false)}>
                ✕
              </button>
            </div>
          </Sheet.Header>
          <Sheet.Content style={{ paddingBottom: ref.current?.y }}>
            <Sheet.Scroller draggableAt="both">

            <div className="reservations-list">
              {establishment?.reservationBidInfoList?.map(reservation => (
                <div key={reservation.id} className="reservation-item">
                  <Checkbox
                    className={'checkbox'}
                    checked={selectedReservationIds.includes(reservation.id)}
                    onChange={() => handleReservationSelect(reservation.id)}
                  />
                  <div className="reservation-info">
                    <div className="date-time">
                      {formatDateWithPrefix(new Date(reservation.date),reservation.startTime,reservation.endTime)}
                    </div>
                    <div className="table-guests">
                      {`${reservation.tableTitle}, ${reservation.guestsCount} гостя`}
                    </div>
                    <div
                      className="status"
                      style={{ backgroundColor: getStatusColor(reservation.reservationStatus) }}
                    >
                      {getStatusText(reservation.reservationStatus)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {selectedReservationIds.length > 0 && (
              <div className="cancel-button-container">
                <button
                  className="cancel-button"
                  onClick={() => {
                    onReservationSelect?.(selectedReservationIds);
                    setIsSheetOpen(false);
                  }}
                >
                  Отменить выбранные ({selectedReservationIds.length})
                </button>
              </div>
            )}
            </Sheet.Scroller>

          </Sheet.Content>
          </div>
        </Sheet.Container>
        <Sheet.Backdrop onTap={() => setIsSheetOpen(false)} />

      </Sheet>
    )
}
