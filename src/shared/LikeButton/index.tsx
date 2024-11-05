import React from 'react';

const Index = ({iconSrc = '/like.svg', isLiked=false}) => {
    const currentTypeOfIcon = iconSrc.split('.')
    const finalSrc = `${currentTypeOfIcon[0]}${isLiked?'-true':''}.${currentTypeOfIcon[1]}`

  return (
    <div className="like-button">
      <img src={finalSrc} alt="Like" />
    </div>
  );
};

export default Index;