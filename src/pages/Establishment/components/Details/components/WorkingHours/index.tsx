import React, { useEffect, useState } from 'react';
import './hours.scss';
import { motion } from 'framer-motion';

const DAYS_OF_WEEK = {
  MONDAY: 'понедельник',
  TUESDAY: 'вторник',
  WEDNESDAY: 'среда',
  THURSDAY: 'четверг',
  FRIDAY: 'пятница',
  SATURDAY: 'суббота',
  SUNDAY: 'воскресенье',
};

// Функция для форматирования даты
const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
};

// Функция для форматирования времени из ISO в HH:MM
const formatTime = (isoTime: string) => {
  const date = new Date(isoTime);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

interface HoursComponentProps {
  type: 'WORKING_HOURS' | 'DATE_TIME' | 'PERIOD';
  openingHours?: { weekDay: string; from: string; till: string; currentDay: boolean }[];
  dateTime?: string;
  startDate?: string;
  endDate?: string;
}

const HoursComponent: React.FC<HoursComponentProps> = ({ type, openingHours, dateTime, startDate, endDate }) => {
  const [showHours, setShowHours] = useState(false);

  if (type === 'DATE_TIME' && dateTime) {
    return <div className="hours-header not-clickable">Ждем вас {formatDate(dateTime)} в {formatTime(dateTime)}</div>;
  }

  if (type === 'PERIOD' && startDate && endDate) {
    return <div className="hours-header not-clickable">Ждем вас с {formatDate(startDate)} по {formatDate(endDate)}</div>;
  }

  if (type === 'WORKING_HOURS' && openingHours) {
    const currentDay = openingHours.find(day => day.currentDay);

    useEffect(()=>{
      !currentDay && setShowHours(true)
    },[currentDay])

    return (
      <motion.div className="hours-component">
        <div className="hours-header" onClick={() => setShowHours(!showHours)}>
          <span>
            {currentDay ? `Открыто с ${currentDay ? formatTime(currentDay.from) : ''} до ${currentDay ? formatTime(currentDay.till) : ''}`: "График работы"}
          </span>
          <img
            src={`/dropdown.svg`}
            className={`arrow ${showHours ? 'up' : 'down'}`}
            alt="Toggle Arrow"
            width="12"
            height="7"
          />
        </div>

        {showHours && (
          <ul className="hours-list">
            {openingHours.map((hours, index) => (
              <li key={index} className={`hours-item ${hours.currentDay ? 'current-day' : ''}`}>
                <span className="day">{DAYS_OF_WEEK[hours.weekDay]}</span>
                <span className="time">
                  {formatTime(hours.from)}–{formatTime(hours.till)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    );
  }

  return null;
};

export default HoursComponent;
