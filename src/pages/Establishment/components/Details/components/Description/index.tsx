import React, { useState } from 'react';
import './Description.scss';

const DescriptionComponent = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 175;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const isContentLong = description.length > MAX_LENGTH;
  const displayedContent = description.slice(0, MAX_LENGTH) + (isContentLong ? '' : '');

  return (
    <div className={`description ${isExpanded ? 'expanded' : ''}`}>
      <div>
        {isExpanded ? description : displayedContent}
        {isContentLong && (
          <div className="show-more" onClick={toggleExpanded}>
            {isExpanded ? 'Скрыть' : 'Ещё'}
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionComponent;
