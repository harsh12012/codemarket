import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import ListingList from './ListingList';

export default function ListingTab({ username = null, title = null, hideTitle = false }) {
  return (
    <div>
      {!hideTitle && <h1 className="heading">{title || 'My Listings'}</h1>}
      <Tabs defaultActiveKey="active">
        <Tab eventKey="active" title="Active">
          <ListingList username={username} active={true} />
        </Tab>
        <Tab eventKey="inactive" title="Inactive">
          <ListingList username={username} active={false} />
        </Tab>
      </Tabs>
    </div>
  );
}
