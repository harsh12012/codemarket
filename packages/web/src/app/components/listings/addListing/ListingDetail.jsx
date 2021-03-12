import React from 'react';
import { Row, Col } from 'react-bootstrap';

import MoreDetails from '../../../../pages/MoreDetails';
import ListingDetailMenu from './ListingDetailMenu';

export default function ListingDetail({ id }) {
  return (
    <div className="add-listing-div">
      <div className="add-listing-title-wrapper">
        <h1 className="add-listing-title">Listing Details</h1>
        <div className="add-listing-hint">Listing Details</div>
      </div>
      <Row className="listings-wrapper">
        <Col sm={3} className="listings-menu-wrapper">
          <ListingDetailMenu />
        </Col>
        <Col sm={8}>
          <MoreDetails id={id} />
        </Col>
      </Row>
    </div>
  );
}
