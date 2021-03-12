import React from 'react';
import { FaMapMarker } from 'react-icons/fa';

const MarkerItem = () => {
  return (
    <div className="map-marker">
      <div className="price-circle">
        <small>$3.20</small>
      </div>
      <FaMapMarker className="map-marker-icon" />
    </div>
  );
};

export default MarkerItem;
