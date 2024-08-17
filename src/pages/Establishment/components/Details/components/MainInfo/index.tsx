import React from 'react';
import './mainInfo.scss'
import { CostLevelEnum } from '../../details.types.ts';
import CostLevel from '../CostLevel';
import HoursComponent from '../WorkingHours';
import {AgeRating, AgeRatingRu, EventType} from '../../../../../Events/events.types.ts';

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
  mainCategory?: CategoryInfo;
  innerCategory?: CategoryInfo | null;
  costLevel?: CostLevelEnum;
  title: string;
  address?: string;
  hours?: Hours;
  ageLevel?: AgeRating;
  type?: EventType;
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
  debugger
  return <div className={'establishment-page__mainInfo'}>
      {mainCategory?.id || innerCategory?.id ? <div className={'establishment-page__mainInfo_categories'}>
        {mainCategory?.id && <span className={'establishment-page__mainInfo_categories_category'}>{mainCategory?.title}</span> }
        {innerCategory?.id && <span className={'establishment-page__mainInfo_categories_category'}>{innerCategory?.title}</span> }
      {costLevel && <CostLevel level={costLevel}/>}
      {ageLevel && <span className={'establishment-page__mainInfo_categories_category last'} >{AgeRatingRu[ageLevel]}+</span>}
    </div> : <></>}
    <div className={'establishment-page__mainInfo_title'}>{title}</div>
      {address && <div className={'establishment-page__mainInfo_address'}>{address}</div>}
      {hours && type && <HoursComponent type={type} hours={hours} openingHours={hours.openingHours} endDate={hours.endDate} startDate={hours.startDate} dateTime={hours.dateTime}  />}
  </div>;
};

export default MainInfoComponent;
