import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { FaShareAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { getDistance } from 'geolib';
import { FaWalking } from 'react-icons/fa';
import moment from 'moment';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'react-share';

import placeholderImg from '../assets/images/placeholder-img.jpg';

const ListingCardItem = ({
  _id,
  location,
  locationDetails,
  pricingDetails,
  userData,
  reviews,
  findParking,
  spaceDetails,
  bookingCount,
  ratingAverage,
  ratingQuantity
}) => {
  const { start, end } = findParking;

  const {
    address,
    streetViewImages,
    parkingEntranceImages,
    parkingSpaceImages,
    features
  } = locationDetails;
  const { pricingRates } = pricingDetails;
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const calcDistanceTime = () => {
      let d = getDistance(
        {
          latitude: findParking.coordinates[1],
          longitude: findParking.coordinates[0]
        },
        {
          latitude: location.coordinates[1],
          longitude: location.coordinates[0]
        }
      ).toFixed(2);
      setDistance((d / 1609).toFixed(2));
      let t = d / 1000 / 5;
      let time = '';
      if (t >= 1) {
        time = t.toFixed(1) + ' hours';
      } else if (t < 1) {
        let m = t * 60;
        if (m >= 1) {
          time = m.toFixed(1) + ' mins';
        } else {
          time = (m * 60).toFixed(1) + ' secs';
        }
      }
      setTime(time);
      // console.log("time travel :",(t*60).toFixed(0));
    };

    calcDistanceTime();
  }, []);
  return (
    <div className="listing-item row">
      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 listing-img">
        {streetViewImages.length > 0 ? (
          <img src={streetViewImages[0]} />
        ) : parkingEntranceImages.length > 0 ? (
          <img src={parkingEntranceImages[0]} />
        ) : parkingSpaceImages.length > 0 ? (
          <img src={parkingSpaceImages[0]} />
        ) : (
          <img src={placeholderImg} />
        )}
      </div>
      <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 listing-content">
        <div className="top row">
          <div className="col-6 listing-card-price">
            <h4>
              ${' '}
              {(
                moment.duration(moment(end).diff(moment(start))).asHours() *
                pricingRates.perHourRate
              ).toFixed(2)}
            </h4>
            {distance && <span className="distance">/ {distance} miles</span>}
          </div>
          <div className="col-6 d-flex justify-content-end">
            <span className="mainmenu d-inline">
              <li className="drop d-inline">
                <span className="menu-btn d-inline cursor-pointer">
                  <FaShareAlt />
                </span>
                <ul style={{ width: 'auto' }} className="dropdown dinline" type="none">
                  <li>
                    <WhatsappShareButton
                      url={`Parking at ${address} ${window.location.href}/${_id}`}>
                      <WhatsappIcon size={36} round={true} />
                    </WhatsappShareButton>
                  </li>
                  <li>
                    <FacebookShareButton
                      // url={`Parking at ${address} ${window.location.href}/${_id}`}
                      // url={`${window.location.href}/${_id}`}
                      url={`https://d31ww6a0jzwr1h.cloudfront.net/parkings/${_id}`}
                      quote={`Parking at ${address}`}
                      hashtag="#parkyourself">
                      <FacebookIcon size={36} round={true} />
                    </FacebookShareButton>
                  </li>
                  <li>
                    <TwitterShareButton
                      url={`Parking at ${address} ${window.location.href}/${_id}`}>
                      <TwitterIcon size={36} round={true} />
                    </TwitterShareButton>
                  </li>
                </ul>
              </li>
            </span>
            <span className="tag d-inline">
              <FaWalking size={18} /> {time}
            </span>
          </div>
        </div>

        <div className="booking-count">Car park on {address}</div>

        {features.length > 0 && (
          <div className="features">
            {features.map((item) => (
              <div key={item} className="feature-item">
                {item}
              </div>
            ))}
          </div>
        )}
        {!(bookingCount.length > 0
          ? spaceDetails.qtyOfSpaces - bookingCount[0].total > 0
          : true) && (
          <p>
            <b>Sorry this parking is full at this time slot. please try some other time slot</b>
          </p>
        )}

        <div className="listing-btn-row">
          {(bookingCount.length > 0
            ? spaceDetails.qtyOfSpaces - bookingCount[0].total > 0
            : true) && (
            <Link href={`/book-now/${_id}`}>
              <Button variant="primary">Book Now</Button>
            </Link>
          )}

          <Link href={`/parkings/${_id}`}>
            <Button variant="outline-primary">More Details</Button>
          </Link>
          <Link href={`/reviews/${_id}`}>
            <Button variant="outline-primary" className="review-btn">
              <StarRatings
                rating={ratingAverage}
                starRatedColor="yellow"
                numberOfStars={5}
                name="rating"
              />
              {ratingQuantity}
            </Button>
          </Link>
          <Link href={`/inbox?newChat=true&parking=${_id}`}>
            <Button variant="outline-dark">Chat with Owner</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth, findParking }) => ({
  userData: auth.data.attributes,
  findParking
});

export default connect(mapStateToProps)(ListingCardItem);
