import React, { useState } from 'react';
import './hours.scss';  // Добавим стили
import { motion } from 'framer-motion';

const DAYS_OF_WEEK = {
  MONDAY: 'понедельник',
  TUESDAY: 'вторник',
  WEDNESDAY: 'среда',
  THURSDAY: 'четверг',
  FRIDAY: 'пятница',
  SATURDAY: 'суббота',
  SUNDAY: 'воскресенье'
};

// Функция для форматирования времени из ISO в HH:MM
const formatTime = (isoTime) => {
  const date = new Date(isoTime);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const HoursComponent = ({ openingHours }) => {
  const [showHours, setShowHours] = useState(false);
  // Найдем текущий день для выделения
  const currentDay = openingHours.find(day => day.currentDay);
  console.log(openingHours,currentDay,'12234');

  return (
    <motion.div className="hours-component">
      {/* Кнопка для раскрытия/свертывания */}
      <div className="hours-header" onClick={() => setShowHours(!showHours)}>
        <span>
          Открыто с {formatTime(currentDay.from)} до {formatTime(currentDay.till)}
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
            <li
              key={index}
              className={`hours-item ${hours.currentDay ? 'current-day' : ''}`}
            >
              <span className="day">{DAYS_OF_WEEK[hours.weekDay]}</span>
              <span className="time">{formatTime(hours.from)}–{formatTime(hours.till)}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default HoursComponent;
