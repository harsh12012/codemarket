import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useGetAllBookings } from '@parkyourself-frontend/shared/hooks/bookings';
import MyBookingItem from '../MyBookingItem';
import Loading from '../other/Loading';

const BookingList = ({
  status,
  driverId,
  ownerId,
  listingId,
  screen,
  dateFilter,
  filterEndDate,
  filterStartDate
}) => {
  const { allData, loading, filter, setFilter, loadMore } = useGetAllBookings({
    status,
    driverId,
    ownerId,
    listingId,
    screen,
    startDate: dateFilter ? filterStartDate : null,
    endDate: dateFilter ? filterEndDate : null
  });

  return (
    <div>
      <div className="mb-2 mt-2">
        <Form.Control
          type="text"
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          placeholder="Search"
        />
      </div>
      {allData.bookings.length > 0 ? (
        allData.bookings.map((item, index) => (
          <MyBookingItem key={index} {...item} tabStatus={status} />
        ))
      ) : loading ? (
        <Loading />
      ) : (
        <div className="loading">
          No <span className="text-capitalize">{status}</span> Bookings
        </div>
      )}
      {filter.limit * filter.page < allData.count &&
        (loading ? (
          <Loading />
        ) : (
          <div className="text-center mt-2">
            <Button variant="primary" size="sm" onClick={loadMore}>
              Load More
            </Button>
          </div>
        ))}
    </div>
  );
};

export default BookingList;
