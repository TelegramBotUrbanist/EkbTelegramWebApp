import React from 'react';
import './Header.scss';

const Index = ({ title, onClose,cls  }) => {
  return (
    <div className={`header-container ${cls}`}>
      <div className="header-title">{title}</div>
      {onClose && (
        <img onClick={onClose} src={'/close-circle.svg'}/>
      )}
    </div>
  );
};

export default Index;
