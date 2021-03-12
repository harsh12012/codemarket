import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { GrClose } from 'react-icons/gr';
import ListingCardItem from './ListingCardItem';

const ParkingsListView = ({ setListView, parkings }) => {
  return (
    <div className="find-parking-list">
      <div className="control-btns">
        <Button
          variant="outline-danger"
          onClick={() => {
            setListView(false);
          }}>
          <GrClose />
        </Button>
      </div>
      <div className="find-parking-list-wrapper">
        {parkings.map((item) => (
          <ListingCardItem {...item} />
        ))}
      </div>
    </div>
  );
};

export default ParkingsListView;
