import React from 'react';
import { CostLevelEnum } from '../../details.types.ts';
import './level.scss'
const  CostLevel = {
  'ONE':1,
  'TWO':2,
  "THREE":3,
  "FOUR":4
}
const Index = ({level}) => {
  return <div className={'establishment-page__costLevel'}>
    <div className={`establishment-page__costLevel_level ${CostLevel[level]>=1 ? 'active' : '' }`}>₽</div>
    <div className={`establishment-page__costLevel_level ${CostLevel[level]>=2 ? 'active' : '' }`}>₽</div>
    <div className={`establishment-page__costLevel_level ${CostLevel[level]>=3 ? 'active' : '' }`}>₽</div>
    <div className={`establishment-page__costLevel_level ${CostLevel[level]>=4 ? 'active' : '' }`}>₽</div>
  </div>;
};

export default Index;