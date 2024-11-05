import React from 'react';

const Index = ({onClose}) => {
    return (
        <div onClick={onClose}>
            <img src={'/close.svg'}/>
        </div>
    );
};

export default Index;