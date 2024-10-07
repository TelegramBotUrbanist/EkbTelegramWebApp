import React from 'react';
import './rating.scss'
const Index = ({rating}) => {
  return (
    <div className="rating">
      <span>{rating}</span>
    </div>
  );
};

export default Index;