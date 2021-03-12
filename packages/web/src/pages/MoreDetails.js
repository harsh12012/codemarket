import React from 'react';
import { connect } from 'react-redux';
import { FaMotorcycle, FaCarSide, FaCar, FaShuttleVan } from 'react-icons/fa';
import { AiFillCar } from 'react-icons/ai';
import { Button, Table } from 'react-bootstrap';
import { convertToUnit, timeTo12HrFormat } from '@parkyourself-frontend/shared/utils/time';
import moment from 'moment';
import Link from 'next/link';
import StarRatings from 'react-star-ratings';

import { useGetOneListing } from '@parkyourself-frontend/shared/hooks/listings';
import MapContainer2 from '../app/components/listings/MapContainer';

const MoreDetails = ({ id, listings, isSpaceOwner }) => {
  const { loading, error, data } = useGetOneListing(id);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error || !data || data.getListing == null) {
    return <div className="loading">No Results Found!</div>;
  }

  const {
    _id,
    locationDetails,
    spaceDetails,
    spaceAvailable,
    pricingDetails,
    ratingAverage,
    ratingQuantity
  } = data.getListing;
  const {
    address,
    city,
    state,
    country,
    postalCode,
    propertyName,
    marker,
    streetViewImages,
    parkingEntranceImages,
    parkingSpaceImages,
    features,
    propertyType
  } = locationDetails;
  const {
    qtyOfSpaces,
    motorcycleSpaces,
    compactSpaces,
    midsizedSpaces,
    largeSpaces,
    oversizedSpaces,
    sameSizeSpaces,
    largestSize,
    motorcycle,
    compact,
    midsized,
    large,
    oversized,
    parkingSpaceType,
    heightRestriction,
    height1,
    height2,
    aboutSpace,
    accessInstructions,
    spaceLabels
  } = spaceDetails;
  const {
    scheduleType,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    customTimeRange,
    noticeTime,
    advanceBookingTime,
    minTime,
    maxTime,
    instantBooking
  } = spaceAvailable;
  const { pricingRates, pricingType } = pricingDetails;
  return (
    // <div className="dg__account">
    <div>
      <section id="location">
        {address && city && state && postalCode && country && (
          <h1 className="heading">{address}</h1>
        )}
        {propertyName && <p className="lead">{propertyName}</p>}
        <StarRatings
          rating={ratingAverage}
          starRatedColor="yellow"
          numberOfStars={5}
          name="rating"
          isAggregateRating={true}
        />
        <span style={{ marginLeft: '10px', fontSize: '18px' }}>{ratingQuantity}</span>
        <br />
        {marker && (
          <div className="detail-item">
            <h4>Location on the Map</h4>
            {/* <MapContainer coordinates={marker.coordinates} /> */}
            <MapContainer2 coordinates={marker.coordinates} />
            <p className="lead">{address}</p>
          </div>
        )}
      </section>
      {/* location section end */}
      <section id="property">
        {streetViewImages.length > 0 && (
          <div className="detail-item">
            <h4>Street View Images</h4>
            <div>
              <img className="parking-detail-img" src={streetViewImages[0]} />
            </div>
          </div>
        )}
        {parkingEntranceImages.length > 0 && (
          <div className="detail-item">
            <h4>Parking Entrance Images</h4>
            <div>
              <img className="parking-detail-img" src={parkingEntranceImages[0]} />
            </div>
          </div>
        )}
        {parkingSpaceImages.length > 0 && (
          <div className="detail-item">
            <h4>Parking Space Images</h4>
            <div>
              <img className="parking-detail-img" src={parkingSpaceImages[0]} />
            </div>
          </div>
        )}
        {features.length > 0 && (
          <div className="features">
            {features.map((item) => (
              <div key={item} className="feature-item">
                {item}
              </div>
            ))}
          </div>
        )}
      </section>
      {/* Property section end */}
      <section id="parking-space">
        {((sameSizeSpaces && largestSize) ||
          motorcycle ||
          compact ||
          midsized ||
          large ||
          oversized) && (
          <div className="detail-item">
            <h4>Vehicle Sizes Accepted</h4>

            <div className="vehicles">
              {sameSizeSpaces ? (
                largestSize == 'Motorcycle' ? (
                  <div className="vehicle">
                    <FaMotorcycle className="vehicle-icon" />
                    <p>Motorcycle</p>
                  </div>
                ) : largestSize == 'Compact' ? (
                  <>
                    <div className="vehicle">
                      <FaMotorcycle className="vehicle-icon" />
                      <p>Motorcycle</p>
                    </div>
                    <div className="vehicle">
                      <FaCarSide className="vehicle-icon" />
                      <p>Compact</p>
                    </div>
                  </>
                ) : largestSize == 'Mid Sized' ? (
                  <>
                    <div className="vehicle">
                      <FaMotorcycle className="vehicle-icon" />
                      <p>Motorcycle</p>
                    </div>
                    <div className="vehicle">
                      <FaCarSide className="vehicle-icon" />
                      <p>Compact</p>
                    </div>
                    <div className="vehicle">
                      <FaCar className="vehicle-icon" />
                      <p>Mid Sized</p>
                    </div>
                  </>
                ) : largestSize == 'Large' ? (
                  <>
                    <div className="vehicle">
                      <FaMotorcycle className="vehicle-icon" />
                      <p>Motorcycle</p>
                    </div>
                    <div className="vehicle">
                      <FaCarSide className="vehicle-icon" />
                      <p>Compact</p>
                    </div>
                    <div className="vehicle">
                      <FaCar className="vehicle-icon" />
                      <p>Mid Sized</p>
                    </div>
                    <div className="vehicle">
                      <AiFillCar className="vehicle-icon" />
                      <p>Large</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="vehicle">
                      <FaMotorcycle className="vehicle-icon" />
                      <p>Motorcycle</p>
                    </div>
                    <div className="vehicle">
                      <FaCarSide className="vehicle-icon" />
                      <p>Compact</p>
                    </div>
                    <div className="vehicle">
                      <FaCar className="vehicle-icon" />
                      <p>Mid Sized</p>
                    </div>
                    <div className="vehicle">
                      <AiFillCar className="vehicle-icon" />
                      <p>Large</p>
                    </div>
                    <div className="vehicle">
                      <FaShuttleVan className="vehicle-icon" />
                      <p>Oversized</p>
                    </div>
                  </>
                )
              ) : (
                <>
                  {motorcycle && (
                    <div className="vehicle">
                      <FaMotorcycle className="vehicle-icon" />
                      <p>Motorcycle</p>
                    </div>
                  )}
                  {compact && (
                    <div className="vehicle">
                      <FaCarSide className="vehicle-icon" />
                      <p>Compact</p>
                    </div>
                  )}
                  {midsized && (
                    <div className="vehicle">
                      <FaCar className="vehicle-icon" />
                      <p>Mid Sized</p>
                    </div>
                  )}
                  {large && (
                    <div className="vehicle">
                      <AiFillCar className="vehicle-icon" />
                      <p>Large</p>
                    </div>
                  )}
                  {oversized && (
                    <div className="vehicle">
                      <FaShuttleVan className="vehicle-icon" />
                      <p>Oversized</p>
                    </div>
                  )}
                </>
              )}
            </div>
            {propertyType && parkingSpaceType && (
              <p className="lead">
                This parking space is a {propertyType} and {parkingSpaceType} parking type.
              </p>
            )}
            {heightRestriction && (
              <p className="lead">
                This parking has a {height1.value} {height1.unit} {height2.value} {height2.unit}{' '}
                vehicle height limit
              </p>
            )}
          </div>
        )}
        {qtyOfSpaces && (largestSize || motorcycle || compact || midsized || large || oversized) && (
          <div className="detail-item">
            <h4>Space Details</h4>
            {sameSizeSpaces ? (
              <p className="lead">
                This parking has total {qtyOfSpaces} quantity of{' '}
                {qtyOfSpaces > 1 ? 'spaces  of same size' : 'space'}.
              </p>
            ) : (
              <p className="lead">
                This parking has total {qtyOfSpaces} quantity of spaces for{' '}
                {motorcycle && `${motorcycleSpaces} motorcycle, `}
                {compact && `${compactSpaces} compact, `}
                {midsized && `${midsizedSpaces} mid sized, `}
                {large && `${largeSpaces} large, `}
                {oversized && `${oversizedSpaces} over sized`}.
              </p>
            )}
            {spaceLabels.length > 0 && (
              <div className="schedule-table">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Label</th>
                      <th>Vehicle Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spaceLabels.map((item) => (
                      <tr key={item.label}>
                        <td>{item.label}</td>
                        <td>{item.largestSize}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        )}
      </section>
      {/* parking-space section end */}
      <section id="availability">
        {scheduleType && (
          <div className="detail-item">
            <h4>Hours</h4>
            {scheduleType == '24hours' && <p className="lead">This facility is open 24/7.</p>}
            {scheduleType == 'fixed' && (
              <div className="schedule-table">
                <p className="lead">This facility is open on :</p>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monday.isActive && (
                      <tr>
                        <td>Monday</td>
                        <td>{timeTo12HrFormat(monday.startHour, monday.startMinute)}</td>
                        <td>{timeTo12HrFormat(monday.endHour, monday.endMinute)}</td>
                      </tr>
                    )}
                    {tuesday.isActive && (
                      <tr>
                        <td>Tuesday</td>
                        <td>{timeTo12HrFormat(tuesday.startHour, tuesday.startMinute)}</td>
                        <td>{timeTo12HrFormat(tuesday.endHour, tuesday.endMinute)}</td>
                      </tr>
                    )}
                    {wednesday.isActive && (
                      <tr>
                        <td>Wednesday</td>
                        <td>{timeTo12HrFormat(wednesday.startHour, wednesday.startMinute)}</td>
                        <td>{timeTo12HrFormat(wednesday.endHour, wednesday.endMinute)}</td>
                      </tr>
                    )}
                    {thursday.isActive && (
                      <tr>
                        <td>Thursday</td>
                        <td>{timeTo12HrFormat(thursday.startHour, thursday.startMinute)}</td>
                        <td>{timeTo12HrFormat(thursday.endHour, thursday.endMinute)}</td>
                      </tr>
                    )}
                    {friday.isActive && (
                      <tr>
                        <td>Friday</td>
                        <td>{timeTo12HrFormat(friday.startHour, friday.startMinute)}</td>
                        <td>{timeTo12HrFormat(friday.endHour, friday.endMinute)}</td>
                      </tr>
                    )}
                    {saturday.isActive && (
                      <tr>
                        <td>Saturday</td>
                        <td>{timeTo12HrFormat(saturday.startHour, saturday.startMinute)}</td>
                        <td>{timeTo12HrFormat(saturday.endHour, saturday.endMinute)}</td>
                      </tr>
                    )}
                    {sunday.isActive && (
                      <tr>
                        <td>Sunday</td>
                        <td>{timeTo12HrFormat(sunday.startHour, sunday.startMinute)}</td>
                        <td>{timeTo12HrFormat(sunday.endHour, sunday.endMinute)}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            )}
            {scheduleType == 'custom' && (
              <>
                <p className="lead">This facility is open from</p>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customTimeRange.map((item) => (
                      <tr>
                        <td>{moment(item.startDate).format('lll')}</td>
                        <td>{moment(item.endDate).format('lll')}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </div>
        )}
      </section>
      {/* availability section end */}
      <section id="booking-setting">
        {noticeTime.value > 0 && (
          <div className="detail-item">
            <h4>How much notice time space owner needs before you arrive?</h4>
            <p className="lead">
              {convertToUnit(noticeTime.value, noticeTime.unit)} {noticeTime.unit}
            </p>
          </div>
        )}
        {advanceBookingTime.value > 0 && (
          <div className="detail-item">
            <h4>How far in advance you can book?</h4>
            <p className="lead">
              {convertToUnit(advanceBookingTime.value, advanceBookingTime.unit)}{' '}
              {advanceBookingTime.unit}
            </p>
          </div>
        )}
        {minTime.value > 0 && maxTime.value > 0 && (
          <div className="detail-item">
            <h4>How long you can stay?</h4>
            <p className="lead">
              Minimum : {convertToUnit(minTime.value, minTime.unit)} {minTime.unit}
            </p>
            <p className="lead">
              Maximum : {convertToUnit(maxTime.value, maxTime.unit)} {maxTime.unit}
            </p>
          </div>
        )}
        {aboutSpace && (
          <div className="detail-item">
            <h4>Things you should know</h4>
            <p className="lead">{aboutSpace}</p>
          </div>
        )}
        {accessInstructions && (
          <div className="detail-item">
            <h4>Getting Here</h4>
            <p className="lead">{accessInstructions}</p>
          </div>
        )}

        {!(instantBooking === '') && (
          <div className="detail-item">
            <h4>Booking Process</h4>
            <p className="lead">
              {instantBooking
                ? 'You can instantly book your space.'
                : "You will need owner's approval to confirm your booking."}
            </p>
          </div>
        )}
        {pricingRates.perHourRate >= 0 && (
          <div className="listing-footer">
            <div className="listing-rate">
              <h4>$ {pricingRates.perHourRate}.00 </h4>
              <p className="lead">per hour</p>
            </div>
            {isSpaceOwner ? (
              <Link href="/listings/my">
                <Button variant="primary">Close</Button>
              </Link>
            ) : (
              <>
                <Link href={`/book-now/${_id}`}>
                  <Button variant="primary">Book Now</Button>
                </Link>
              </>
            )}
          </div>
        )}
      </section>
      {/* booking-setting section end */}
      <section id="pricing">
        {pricingType &&
          (pricingRates.perHourRate >= 0 ||
            pricingRates.perDayRate >= 0 ||
            pricingRates.perWeekRate >= 0 ||
            pricingRates.perMonthRate >= 0) && (
            <div className="detail-item">
              <h4>Pricing Table</h4>

              <p className="lead">This parking has a {pricingType} billing type.</p>
              <div className="schedule-table">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Duration</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingRates.perHourRate >= 0 && (
                      <tr>
                        <td>1 Hour</td>
                        <td>$ {pricingRates.perHourRate}.00</td>
                      </tr>
                    )}
                    {pricingRates.perDayRate >= 0 && (
                      <tr>
                        <td>1 Day</td>
                        <td>$ {pricingRates.perDayRate}.00</td>
                      </tr>
                    )}
                    {pricingRates.perWeekRate >= 0 && (
                      <tr>
                        <td>1 Week</td>
                        <td>$ {pricingRates.perWeekRate}.00</td>
                      </tr>
                    )}

                    {pricingRates.perMonthRate >= 0 && (
                      <tr>
                        <td>1 Month</td>
                        <td>$ {pricingRates.perMonthRate}.00</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          )}
      </section>
      {/* pricing section end */}
    </div>
  );
};

const mapStateToProps = ({ listing, user }) => ({
  isSpaceOwner: user.isSpaceOwner,
  listings: user.listings
});

export default connect(mapStateToProps)(MoreDetails);
