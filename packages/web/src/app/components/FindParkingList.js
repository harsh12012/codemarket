import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ImLocation2, ImList2 } from 'react-icons/im';
import { GrClose } from 'react-icons/gr';
import ListingCardItem from './ListingCardItem';

const FindParkingList = ({ setVisible, selected, parkings }) => {
  const [showSelected, setShowSelected] = useState(true);

  return (
    <div className="find-parking-list">
      <div className="control-btns">
        <Button
          variant={showSelected ? 'primary' : 'outline-primary'}
          onClick={() => setShowSelected(true)}>
          <ImLocation2 />
        </Button>
        <Button
          variant={!showSelected ? 'primary' : 'outline-primary'}
          onClick={() => setShowSelected(false)}>
          <ImList2 />
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => {
            setVisible(false);
          }}>
          <GrClose />
        </Button>
      </div>
      <div className="find-parking-list-wrapper">
        {showSelected ? (
          <ListingCardItem {...selected} />
        ) : (
          parkings.map((item) => <ListingCardItem {...item} />)
        )}
      </div>
    </div>
  );
};

export default FindParkingList;
