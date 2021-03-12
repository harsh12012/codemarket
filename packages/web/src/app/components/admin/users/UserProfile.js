import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import UserProfileCard from './UserProfileCard';
import ListingTab from '../../listings/myListing/ListingTab';
import BookingTab from '../../booking/BookingTab';

export default function UserProfile(props) {
  return (
    <div>
      <h1 className="heading">User Profile</h1>
      <UserProfileCard id={props.id} />
      <Tabs className="mt-3" defaultActiveKey="bookings" id="uncontrolled-tab-example" fill>
        <Tab eventKey="bookings" title="Bookings">
          <BookingTab hideTitle={true} username={props.id} screen="myBookings" />
        </Tab>
        <Tab eventKey="spaces" title="Listings">
          <ListingTab hideTitle={true} username={props.id} />
        </Tab>
        <Tab eventKey="rating" title="Ratings">
          <p>Rating</p>
        </Tab>
      </Tabs>
    </div>
  );
}
