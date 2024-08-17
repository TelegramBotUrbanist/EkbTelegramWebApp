import React from 'react';
import './Address.scss'
const AddressComponent = ({ address }) => {
  return (
    <div className="address">
      <div>{address}</div>
    </div>
  );
};

export default AddressComponent;
