import React from 'react';
import { useGetAllListings } from '@parkyourself-frontend/shared/hooks/listings';
import { Form, Button } from 'react-bootstrap';
import Loading from '../../other/Loading';
import MyListingItem from '../../MyListingItem';

export default function ListingList({ username = null, active }) {
  const { allData, loading, filter, setFilter, loadMore, error } = useGetAllListings({
    username,
    active
  });

  console.log(allData)

  return (
    <div>
      <div className="my-2">
        <Form.Control
          type="text"
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          placeholder="Search"
        />
      </div>
      <div>
        {loading && allData.count < 1 ? (
          <Loading />
        ) : (
          <div>
            {allData.listings.map((item) => (
              <MyListingItem key={item._id} {...item} listBy="address" />
            ))}
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
    </div>
  );
}
