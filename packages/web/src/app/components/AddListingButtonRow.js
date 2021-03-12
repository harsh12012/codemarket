import React from 'react';
import { Button } from 'react-bootstrap';

const AddListingButtonRow = ({
  onBackButtonPress,
  onNextButtonPress,
  activeIndex,
}) => {
  return (
    <div className='back-next-btn-row'>
      {activeIndex != 1 && (
        <Button variant='primary' onClick={onBackButtonPress}>
          Back
        </Button>
      )}
      {activeIndex != 20 && (
        <Button variant='success' onClick={onNextButtonPress}>
          Next
        </Button>
      )}
    </div>
  );
};

export default AddListingButtonRow;
