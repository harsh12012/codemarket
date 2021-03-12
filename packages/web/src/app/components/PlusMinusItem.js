import React from 'react';
import { Button } from 'react-bootstrap';

const PlusMinusItem = ({ label, onPlus, onMinus }) => {
  return (
    <div className='plus-minus-item'>
      <Button
        variant='primary'
        size='sm'
        onClick={onMinus}
        className='plus-minus-btn'
      >
        -
      </Button>
      <p className='plus-minus-label'>{label}</p>
      <Button
        variant='primary'
        size='sm'
        onClick={onPlus}
        className='plus-minus-btn'
      >
        +
      </Button>
    </div>
  );
};

export default PlusMinusItem;
