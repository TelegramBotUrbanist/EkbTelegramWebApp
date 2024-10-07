import React from 'react';
import './mainInfo.scss'
import { CostLevelEnum } from '../../details.types.ts';
import CostLevel from '../CostLevel';
import HoursComponent from '../WorkingHours';

const MainInfoComponent = ({ mainCategory,innerCategory,costLevel,title,address,openingHours,ageLevel }) => {
  return <div className={'establishment-page__mainInfo'}>
    <div className={'establishment-page__mainInfo_categories'}>
      <span className={'establishment-page__mainInfo_categories_category'}>{mainCategory?.title}</span>
      <span className={'establishment-page__mainInfo_categories_category'}>{innerCategory?.title}</span>
      {costLevel && <CostLevel level={costLevel}/>}
      {ageLevel && <span className={'establishment-page__mainInfo_categories_category last'} >{ageLevel}+</span>}
    </div>
    <div className={'establishment-page__mainInfo_title'}>{title}</div>
    <div className={'establishment-page__mainInfo_address'}>{address}</div>
    <HoursComponent openingHours={openingHours} />
  </div>;
};

export default MainInfoComponent;
