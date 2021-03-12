import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import placeholderImg from '../../assets/images/placeholder-img.jpg';
import moment from 'moment';
import Link from 'next/link';

const AllParkingOrdersItem = ({
  cancelled,
  setCancelled,
  setUpcoming,
  upcoming,
  bookingData,
  _id,
  listingId,
  ownerId,
  ownerEmail,
  ownerName,
  driverId,
  driverName,
  driverEmail,
  address,
  images,
  start,
  end,
  payment,
  vehicle,
  status,
  spaceLabel,
  profileCategory,
  userData,
  updateListingLocal
}) => {
  return (
    <div className="listing-item row">
      <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12 listing-img">
        <img src={images.length > 0 ? images[0] : placeholderImg} />
      </div>
      <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-xs-12 listing-content">
        <div className="top row">
          <h4 className="col-10">{address}</h4>
          <div className="tag col-2">
            {moment
              .duration(moment(end).diff(moment(start)))
              .asHours()
              .toFixed(1)}{' '}
            Hours
          </div>
        </div>

        <div className="booking-count">
          {moment(new Date(start)).format('lll')} to {moment(new Date(end)).format('lll')}
        </div>
        <p>Booked by {driverName}</p>
        <div className="listing-btn-row">
          {/* <Link href={`/parkings/orders/${_id}`}> */}
          <Button>$150 Received</Button>
          {/* </Link> */}
          <Link href={`/parkings/orders/details/${_id}`}>
            <Button variant="outline-primary">More Detail</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllParkingOrdersItem;
