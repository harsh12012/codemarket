import { useGetOneUser } from '@parkyourself-frontend/shared/hooks/users';
import React from 'react';
import { Star } from 'react-feather';
import Loading from '../../other/Loading';

export default function UserProfileCard(props) {
  const { data, error, loading } = useGetOneUser(props.id);
  if (loading) {
    return <Loading />;
  } else if (data && data.getOneUserSub) {
    const { bookings, listings, name, picture } = data.getOneUserSub;
    return (
      <div>
        <div className="text-center my-4">
          <div className="w-25 m-auto">
            <img src={picture} className="w-50 rounded-circle" />
          </div>
          <br />
          <b>{name}</b>
        </div>
        <div className="d-flex justify-content-around">
          <div className="text-center">
            <b>{bookings}</b>
            <br />
            Bookings
          </div>
          <div className="text-center">
            <b>$750</b>
            <br />
            Money Spent
          </div>
          <div className="text-center">
            <b>{listings}</b>
            <br />
            Listings
          </div>
          <div className="text-center">
            <b>$9650</b>
            <br />
            Cashout
          </div>
          <div className="text-center">
            <p className="m-0 font-weight-bold">
              <Star size={18} className="mt-n1 mr-1 text-warning" />
              4.7 (17)
            </p>
            Ratings
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
