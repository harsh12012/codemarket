import React from 'react';

const RadioItem = ({ label, name, onClick, value, checked }) => {
  return (
    <div className='check-box-item'>
      <p className='check-box-label'>{label}</p>
      <input
        type='radio'
        name={name}
        className='check-box-input'
        onClick={onClick}
        value={value}
        checked={checked}
      />
    </div>
  );
};

export default RadioItem;
