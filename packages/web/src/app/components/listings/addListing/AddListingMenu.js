import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'react-feather';
import { menu } from '@parkyourself-frontend/shared/config/addListingMenu';
import { GoStop } from 'react-icons/go';
import { useListingCompleteStatus } from '@parkyourself-frontend/shared/hooks/listings';

const AddListingMenu = ({ activeIndex, setActiveIndex, spaceDetails, listing }) => {
  const { listingCompleteStatus } = useListingCompleteStatus({ listing });
  const {
    qtyOfSpaces,
    sameSizeSpaces,
    motorcycle,
    compact,
    midsized,
    large,
    oversized,
    motorcycleSpaces,
    compactSpaces,
    midsizedSpaces,
    largeSpaces,
    oversizedSpaces
  } = spaceDetails;

  const spacesSum =
    parseInt(motorcycleSpaces) +
    parseInt(compactSpaces) +
    parseInt(midsizedSpaces) +
    parseInt(largeSpaces) +
    parseInt(oversizedSpaces);

  const spaceLabelActive =
    qtyOfSpaces > 0 &&
    (sameSizeSpaces ||
      (spacesSum == qtyOfSpaces &&
        (!motorcycle || (motorcycle && motorcycleSpaces > 0)) &&
        (!compact || (compact && compactSpaces > 0)) &&
        (!midsized || (midsized && midsizedSpaces > 0)) &&
        (!large || (large && largeSpaces > 0)) &&
        (!oversized || (oversized && oversizedSpaces > 0))));

  const [subMenu, setSubMenu] = useState(null);

  useEffect(() => {
    if (activeIndex !== 0) {
      if (activeIndex > 1 && activeIndex < 6) {
        setSubMenu('property');
      } else if (activeIndex > 5 && activeIndex < 9) {
        setSubMenu('parkingSpaces');
      } else if (activeIndex > 9 && activeIndex < 14) {
        setSubMenu('bookingSettings');
      } else {
        setSubMenu(null);
      }
    }
  }, [activeIndex]);

  return (
    <div className="add-listing-menu">
      {/* <h1>{locationCompleteStatus.toString()}</h1> */}
      <ul>
        <li
          className={activeIndex === 1 ? 'menu-item-active' : 'menu-item'}
          onClick={() => {
            setActiveIndex(1);
            setSubMenu(null);
          }}>
          Location (1)
          {!listingCompleteStatus.location.status && (
            <span className="incomplete-icon">
              <GoStop />
            </span>
          )}
        </li>
        <li
          className={subMenu === 'property' ? 'menu-item-active' : 'menu-item'}
          onClick={() => {
            setSubMenu('property');
            setActiveIndex(0);
          }}>
          Property (2,3,4,5)
          {!listingCompleteStatus.property.status && (
            <span className="incomplete-icon">
              <GoStop />
            </span>
          )}
        </li>
        {subMenu === 'property' && (
          <ul className="add-listing-sub-menu">
            {menu[subMenu].subMenu.map((m, i) => (
              <li
                key={i}
                className={`${activeIndex === m.index ? 'menu-item-active' : 'menu-item'}`}
                onClick={() => setActiveIndex(m.index)}>
                {`${m.index} ${m.label}`}
                {!listingCompleteStatus.property[m.index] && (
                  <span className="incomplete-icon">
                    <GoStop />
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
        <li
          className={subMenu === 'parkingSpaces' ? 'menu-item-active' : 'menu-item'}
          onClick={() => {
            setSubMenu('parkingSpaces');
            setActiveIndex(0);
          }}>
          Parking Spaces(6,7,8)
          {!listingCompleteStatus.parkingSpaces.status && (
            <span className="incomplete-icon">
              <GoStop />
            </span>
          )}
        </li>
        {subMenu === 'parkingSpaces' && (
          <ul className="add-listing-sub-menu">
            {menu[subMenu].subMenu.map((m, i) => (
              <li
                key={i}
                className={`${activeIndex === m.index ? 'menu-item-active' : 'menu-item'}`}
                onClick={() => setActiveIndex(m.index)}>
                {`${m.index} ${m.label}`}
                {!listingCompleteStatus.parkingSpaces[m.index] && (
                  <span className="incomplete-icon">
                    <GoStop />
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
        <li
          className={activeIndex === 9 ? 'menu-item-active' : 'menu-item'}
          onClick={() => {
            setActiveIndex(9);
            setSubMenu(null);
          }}>
          Availability (9)
          {!listingCompleteStatus.availability.status && (
            <span className="incomplete-icon">
              <GoStop />
            </span>
          )}
        </li>
        <li
          className={subMenu === 'bookingSettings' ? 'menu-item-active' : 'menu-item'}
          onClick={() => {
            setSubMenu('bookingSettings');
            setActiveIndex(0);
          }}>
          Booking Settings (10,11,12,13)
          {!listingCompleteStatus.bookingSettings.status && (
            <span className="incomplete-icon">
              <GoStop />
            </span>
          )}
        </li>
        {subMenu === 'bookingSettings' && (
          <ul className="add-listing-sub-menu">
            {menu[subMenu].subMenu.map((m, i) => (
              <li
                key={i}
                className={`${activeIndex === m.index ? 'menu-item-active' : 'menu-item'}`}
                onClick={() => setActiveIndex(m.index)}>
                {`${m.index} ${m.label}`}
                {!listingCompleteStatus.bookingSettings[m.index] && (
                  <span className="incomplete-icon">
                    <GoStop />
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
        <li
          className={activeIndex === 14 ? 'menu-item-active' : 'menu-item'}
          onClick={() => {
            setActiveIndex(14);
            setSubMenu(null);
          }}>
          Pricing (14)
          {!listingCompleteStatus.pricing.status && (
            <span className="incomplete-icon">
              <GoStop />
            </span>
          )}
        </li>
      </ul>
    </div>
  );
};
export default AddListingMenu;
