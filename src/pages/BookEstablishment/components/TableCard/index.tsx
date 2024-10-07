import React from 'react';
import './TableCard.scss';
import { TableCardProps } from '../../book.types.ts'; // Подключаем файл стилей

interface IProps {
  table:TableCardProps
  onClick: ()=>void
}

const TableCard: React.FC<IProps> = ({ table,onClick }) => {

  // Берем последние 5 занятых периодов (если есть)
  const lastFiveOccupiedPeriods =  table.occupiedPeriods.slice(-5)
  return (
    <div className="table-card">
      <div onClick={onClick} className="image-container">
        <img
          src={table.imgs[0].imageUrl} // Берем первую картинку
          alt={table.title}
          className="table-image"
          onDragStart={(e) => e.preventDefault()}
        />
        {/*<div className="status">*/}
        {/*  {isOccupied ? (*/}
        {/*    <span>Занят</span>*/}
        {/*  ) : (*/}
        {/*    <span>Свободен</span>*/}
        {/*  )}*/}
        {/*</div>*/}
        {lastFiveOccupiedPeriods.length > 0 && (
          <div className="statuses">
            {lastFiveOccupiedPeriods.map((period, index) => (
              <div key={index} className="period">
                Занят с {period.occupiedFrom} до {period.occupiedTo}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="details">
        <span className="location">{table.locationDescription}</span>
        <div className={'block'}>
        <div className="name">№{table.title}</div>
        <div className="capacity">
          <img src={'/capacity.svg'}/><span>{table.capacity}</span>
        </div>
        {/* Отображаем последние 5 занятых периодов */}
        </div>
      </div>
    </div>
  );
};

export default TableCard;
