import React, { useState } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';

const ListingDetailMenu = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="add-listing-menu">
      <ul>
        <li
          className={activeIndex === 1 ? 'menu-item-active' : 'menu-item'}
          onClick={() => {
            setActiveIndex(1);
          }}>
          <Link to="location" smooth={true} duration={1000}>
            <div>Location</div>
          </Link>
        </li>

        <li
          className={activeIndex === 2 ? 'menu-item-active' : 'menu-item'}
          onClick={() => {
            setActiveIndex(2);
          }}>
          <Link to="property" smooth={true} duration={1000}>
            Property
          </Link>
        </li>
        <li
          className={activeIndex === 3 ? 'menu-item-active' : 'menu-item'}
          onClick={() => {
            setActiveIndex(3);
          }}>
          <Link to="parking-space" smooth={true} duration={1500}>
            Parking Spaces
          </Link>
        </li>
        <li
          className={activeIndex === 4 ? 'menu-item-active' : 'menu-item'}
          onClick={() => {
            setActiveIndex(4);
          }}>
          <Link to="availability" smooth={true} duration={2000}>
            Availability
          </Link>
        </li>
        <li
          className={activeIndex === 5 ? 'menu-item-active' : 'menu-item'}
          onClick={() => {
            setActiveIndex(5);
          }}>
          <Link to="booking-setting" smooth={true} duration={2000}>
            Booking Settings
          </Link>
        </li>
        <li
          className={activeIndex === 6 ? 'menu-item-active' : 'menu-item'}
          onClick={() => {
            setActiveIndex(6);
          }}>
          <Link to="pricing" smooth={true} duration={2000}>
            Pricing
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default ListingDetailMenu;
