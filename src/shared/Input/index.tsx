import React, { useState } from 'react';
import './Input.scss';
import DatePicker from './components/DatePicker.tsx';

interface IProps {
  value: string | number | null | Date;
  onChange: (name:string,value: string | number | Date) => void;
  type?: 'text' | 'password' | 'number' | 'date'; // Добавлен тип date
  onEditClick?: () => void;
  onCopy?: () => void;
  label?: string;
  placeholder?: string;
  name:string
  min?: number; // Минимальное значение для инпута числа
}

const CustomInput: React.FC<IProps> = ({
                                         value,
                                         onChange,
  name,
                                         type = 'text',
                                         onEditClick,
                                         onCopy,
                                         placeholder,
                                         min = 1,
                                         label
                                       }) => {
  const [internalValue, setInternalValue] = useState<string | number | null>(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleIncrement = () => {
    if (typeof internalValue === 'number') {
      const newValue = Math.max(Number(internalValue) + 1, min);
      setInternalValue(newValue);
      onChange(newValue);
    }
  };

  const handleDecrement = () => {
    if (typeof internalValue === 'number' && internalValue > min) {
      const newValue = Math.max(Number(internalValue) - 1, min);
      setInternalValue(newValue);
      onChange(newValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = type === 'number' ? Number(e.target.value) : e.target.value;
    setInternalValue(newValue);
    onChange(name,newValue);
  };

  const handleFocus = () => {
    if (type === 'date') setIsFocused(true);
  };

  const handleBlur = () => {
    if (type === 'date') setIsFocused(false);
  };

  return (
    <>
      {label && <label className="input-label" htmlFor="input">{label}</label>}
      <div id="input" className="input-container">
        <div className="input-wrapper">
          {type === 'number' && (
            <div className="number-input-wrapper">
              <input
                type="number"
                value={internalValue || ''}
                onChange={handleChange}
                className="custom-input"
              />
              <div className="actions">
                <button
                  onClick={handleDecrement}
                  disabled={internalValue <= min}
                  className={`action-btn ${internalValue <= min ? 'disabled' : ''}`}
                >
                  -
                </button>
                <button onClick={handleIncrement} className="action-btn">
                  +
                </button>
              </div>
            </div>
          )}

          {type === 'date' && (
            <>
              <input
                type="text" // Используем type="text" для кастомизации поведения
                value={internalValue || ''}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                className="custom-input"
                placeholder={placeholder}
                readOnly // Запрещаем ручной ввод, только через datepicker
              />
              {isFocused && (
                <div className="datepicker">
                  {/* Здесь может быть вызов кастомного DatePicker компонента */}
                  <div className="calendar">
                   <DatePicker value={value} onChange={onChange}/>
                  </div>
                </div>
              )}
            </>
          )}

          {type !== 'number' && type !== 'date' && (
            <input
              type={type}
              value={internalValue || ''}
              onChange={handleChange}
              className="custom-input"
              placeholder={placeholder}
            />
          )}
        </div>

        <div className="actions">
          {onCopy && (
            <button onClick={onCopy} type="button" className="action-btn">
              <img src={'/copy.svg'} alt="Copy" />
            </button>
          )}
          {onEditClick && (
            <button type="button" className="action-btn" onClick={onEditClick}>
              {/* Your edit icon here */}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomInput;
