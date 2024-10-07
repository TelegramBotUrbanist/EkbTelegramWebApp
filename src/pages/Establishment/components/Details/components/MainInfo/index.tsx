import React from 'react';
import './mainInfo.scss'
import { CostLevelEnum } from '../../details.types.ts';
import CostLevel from '../CostLevel';
import HoursComponent from '../WorkingHours';
import { AgeRating, EventType } from '../../../../../Events/events.types.ts';

interface CategoryInfo {
  id: number;
  title: string;
}

interface Hours {
  openingHours?: {
    weekDay: string;
    from: string;
    till: string;
    currentDay: boolean;
  }[];
  dateTime?: string;
  startDate?: string;
  endDate?: string;
}

export interface IProps {
  mainCategory: CategoryInfo;
  innerCategory: CategoryInfo | null;
  costLevel?: CostLevelEnum;
  title: string;
  address: string;
  hours: Hours;
  ageLevel: AgeRating;
  type: EventType;
}
const MainInfoComponent: React.FC<IProps> = ({
                                               mainCategory,
                                               innerCategory,
                                               costLevel,
                                               title,
                                               address,
                                               hours,
                                               ageLevel,
                                               type
                                             }) => {
  return <div className={'establishment-page__mainInfo'}>
    <div className={'establishment-page__mainInfo_categories'}>
      <span className={'establishment-page__mainInfo_categories_category'}>{mainCategory?.title}</span>
      <span className={'establishment-page__mainInfo_categories_category'}>{innerCategory?.title}</span>
      {costLevel && <CostLevel level={costLevel}/>}
      {ageLevel && <span className={'establishment-page__mainInfo_categories_category last'} >{ageLevel}+</span>}
    </div>
    <div className={'establishment-page__mainInfo_title'}>{title}</div>
    <div className={'establishment-page__mainInfo_address'}>{address}</div>
    <HoursComponent type={type} openingHours={hours.openingHours} endDate={hours.endDate} startDate={hours.startDate} dateTime={hours.dateTime}  />
  </div>;
};

export default MainInfoComponent;
