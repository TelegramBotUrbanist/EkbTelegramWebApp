import React, { useState, useEffect, useRef } from 'react';
import { atom, useAtom, useSetAtom } from 'jotai';
import { availableTimeAtom, bookingPointChooseAtom, bookingTimeAtom } from './time.atoms.ts';
import './time.scss'
import { useLoadableAtom } from '../../../../../../hooks/useLoadableAtom.ts';
import { LoadingProvider } from '../../../../../../providers/LoadingProvider.tsx';
import { useNavigate } from 'react-router-dom';




const BookingTime: React.FC = ({tableId}) => {
  const [focusedInput, setFocusedInput] = useAtom(bookingPointChooseAtom);
  const [bookingTime, setBookingTime] = useAtom(bookingTimeAtom);
  const componentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'hours' | 'minutes'>('hours');
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const {data:availableTime,loading,error} = useLoadableAtom(availableTimeAtom,[bookingTime.startTime]);
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
        if (focusedInput) {
          setFocusedInput(null);
          setSelectedHour(null);
          setActiveTab('hours');
          // if (focusedInput === 'start') {
          //   setBookingTime(prev => ({ ...prev, startTime: {} }));
          // } else {
          //   setBookingTime(prev => ({ ...prev, endTime: '' }));
          // }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [focusedInput]);


  if (loading) return '123'



  const getInputValue = (type: 'start' | 'end') => {
    const timeObj = type === 'start' ? bookingTime.startTime : bookingTime.endTime;
    const spacing = type==='start'? ' '.repeat(4) : ' '.repeat(6)
    if (timeObj.hours && timeObj.minutes === '' && (focusedInput === type || focusedInput===null)) {
      return selectedHour !== null
        ? `${spacing}${String( selectedHour).padStart(2, '0')}:__`
        : `${spacing}${String( timeObj.hours).padStart(2, '0')}:__`
        ;
    }
    if (timeObj.hours === '' && timeObj.minutes === '') {
      return '';
    }
    return `${spacing}${String(timeObj.hours).padStart(2, '0')}:${String(timeObj.minutes).padStart(2, '0')}`;
  };

  const getSelectedItem = (dto, type:'hours'|'minutes') => {
    if(focusedInput){
      const timeType = focusedInput === 'start' ? 'startTime' : 'endTime'
      return String(dto) === bookingTime[timeType][type] ? 'selected' : ''
    }
    return ''
  }



  return (
    <div className="booking-time" ref={componentRef}>
      <div className="booking-time__inputs">
        <div className="booking-time__input-wrapper">
          <label>Время бронирования</label>
          <span>c</span>
          <input
            type="text"
            value={getInputValue('start')}
            onFocus={() => {
              setFocusedInput('start');
              setActiveTab('hours');
              setSelectedHour(null);
            }}
            className={focusedInput === 'start' ? 'focus' :''}
            placeholder="    __:__"
            readOnly
          />
        </div>
        <div className="booking-time__input-wrapper">
          <label>{' '}</label>
          <span>до</span>
          <input
            className={focusedInput === 'end' ? 'focus' : ''}
            type="text"
            value={`${getInputValue('end')}`}
            onFocus={() => {
              if (bookingTime.startTime) {
                setFocusedInput('end');
                setActiveTab('hours');
                setSelectedHour(null);
              }
            }}
            placeholder="      __:__"
            readOnly
            disabled={!bookingTime.startTime.hours && !bookingTime.startTime.minutes}
          />
        </div>
      </div>

      {focusedInput && (
        <div className="booking-time__selector">
          <h3 className={`label-${focusedInput}`}>{focusedInput === 'start' ? 'Во сколько вы придете?' : 'До скольки вы будете?'}</h3>

          <div className="booking-time__tabs">
            <div onClick={() => setActiveTab('hours')} className={`tab ${activeTab === 'hours' ? 'active' : ''}`}>Часы</div>
            <div  onClick={() =>  {
              const haveHours = focusedInput === 'start' ? !!bookingTime.startTime.hours : !!bookingTime.endTime.hours
              haveHours && setActiveTab('minutes')}
            } className={`tab ${activeTab === 'minutes' ? 'active' : ''}`}>Минуты</div>
          </div>
          <LoadingProvider isLoading={loading}>
          {activeTab === 'hours'? (
            <div className="booking-time__hours">
              {availableTime?.hours.map((hourData) => (
                <button
                  key={hourData.hour}
                  className={`hour-button ${hourData.fullyOccupied ? 'disabled' : ''} ${getSelectedItem(hourData.hour,'hours')}`}
                  // onClick={() => !hourData.fullyOccupied && setSelectedHour(hourData.hour)}
                  onClick={()=>{
                    if(!hourData.fullyOccupied){
                      setSelectedHour(hourData.hour)
                      if (focusedInput === 'start') {
                        setBookingTime((prev)=>({
                          ...bookingTime,
                          startTime: {
                            hours: String(hourData.hour),
                            minutes: prev.startTime.minutes
                          }
                        }));
                      } else {
                        setBookingTime((prev)=>({
                          ...bookingTime,
                          endTime: {
                            hours: String(hourData.hour),
                            minutes: prev.endTime.minutes
                          }
                        }));
                      }
                      if(focusedInput === 'start') {
                        !(bookingTime.startTime.minutes) && setActiveTab('minutes')
                      } else if (focusedInput === 'end'){
                        !(bookingTime.endTime.minutes) && setActiveTab('minutes')
                        }
                    }}}
                  disabled={hourData.fullyOccupied}
                  style={{
                    opacity: hourData.fullyOccupied ? 0.5 : 1,
                    background: `linear-gradient(to right, #7676801F ${hourData.occupancyRate}%, transparent ${hourData.occupancyRate}%)`
                  }}
                >
                  {String(hourData.hour).padStart(2, '0')}
                </button>
              ))}
            </div>
          ) : activeTab === 'minutes' ? (
            <div className="booking-time__minutes">
              {availableTime.hours
                .find(h => focusedInput==='start' ?  h.hour == bookingTime.startTime.hours : focusedInput==='end' ? h.hour == bookingTime.endTime.hours : selectedHour)
                ?.minuteBlocks.map((block) => (
                  <button
                    key={block.minute}
                    className={`minute-button ${block.occupied ? 'disabled' : ''} ${getSelectedItem(block.minute,'minutes')}`}
                    onClick={() => {
                      const hourToKeep = focusedInput==='start' ? bookingTime.startTime.hours : focusedInput === 'end' ? bookingTime.endTime.hours : selectedHour
                      if (!block.occupied) {
                        if (focusedInput === 'start') {
                          setBookingTime({
                            ...bookingTime,
                            startTime: {
                              hours: String(hourToKeep),
                              minutes: String(block.minute)
                            }
                          });
                        } else {
                          setBookingTime({
                            ...bookingTime,
                            endTime: {
                              hours: String(hourToKeep),
                              minutes: String(block.minute)
                            }
                          });
                          navigate(`/establishment/${tableId}/book/tables`)
                        }
                        setSelectedHour(null);
                        setFocusedInput(null);
                        setActiveTab('hours');
                      }
                    }}
                    disabled={block.occupied}
                  >
                    {String(block.minute).padStart(2, '0')}
                  </button>
                ))}
            </div>

          ) : <></>}
            </LoadingProvider>
        </div>

      )}
    </div>
  );
};

export default BookingTime;