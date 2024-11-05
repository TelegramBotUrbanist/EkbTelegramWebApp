import React, { forwardRef, useState, useEffect, useRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale';
import { parse, isValid, format } from 'date-fns';
import CustomInput from '../../shared/Input';
import './Calendar.scss'
import { useAtom } from 'jotai/index';
import { calendarValueAtom } from '../../pages/BookEstablishment/book.atoms.ts';

registerLocale('ru', ru);

interface CalendarProps {
  label?: string;
  excludedDates? :Date[]
}

const formatDateWithOnlyDigits = (date) => {
  let formatDate = format(date, 'dd.MM.yyyy', { locale: ru });
  formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
  return formatDate;
};

const Calendar: React.FC<CalendarProps> = ({label, excludedDates }) => {
  const [value, setCalendarValue] = useAtom(calendarValueAtom);
  const datePickerRef = useRef<DatePicker|null>(null);
  const [inputValue, setInputValue] = useState<string>( '');

  useEffect(() => {
    if (value) {
      setInputValue(formatDateWithOnlyDigits(new Date()));
    }
  }, [inputValue]);

  // useEffect(() => {
  //   return ()=> setCalendarValue(new Date())
  // }, []);

  const handleInputChange = (newValue: string | number | Date) => {
    if (typeof newValue === 'string') {
      setInputValue(newValue);
    }
  };

  const handleBlur = () => {
    const parsedDate = parse(inputValue, 'dd.MM.yyyy', new Date());
    if (isValid(parsedDate)) {
      setCalendarValue(parsedDate);
    } else {
      setInputValue(value ? formatDateWithOnlyDigits(value) : '');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
      if (datePickerRef.current) {
        datePickerRef.current.setOpen(false);
      }
    }
  };

  const CustomDateInput = forwardRef<HTMLInputElement, any>(
    ({ value, onClick }, ref) => (
      <div onClick={onClick}>
        <CustomInput
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          label={label}
          placeholder="Выберите дату"
        />
      </div>
    )
  );
  const handleDateChange = (date: Date | null) => {
    setCalendarValue(date);
  };

  return (
    <div>
      <DatePicker
        ref={datePickerRef}
        selected={value}
        excludeDates={excludedDates ?? []}
        dateFormat="dd.MM.yyyy"
        onChange={handleDateChange}
        customInput={<CustomDateInput />}
        locale="ru"
      />
    </div>
  );
};

export default Calendar;
