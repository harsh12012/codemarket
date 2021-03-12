import React from 'react';

const CheckBoxItem = ({ label, name, onClick, checked }) => {
  return (
    <div className='check-box-item'>
      <p className='check-box-label'>{label}</p>
      <input
        type='checkbox'
        name={name}
        className='check-box-input'
        onClick={onClick}
        value={checked}
        checked={checked}
      />
    </div>
  );
};

export default CheckBoxItem;
