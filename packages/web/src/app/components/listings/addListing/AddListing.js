import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateTempListing } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import { useGetAllFormOptions } from '@parkyourself-frontend/shared/hooks/listings';
import AddListingMenu from './AddListingMenu';
import AddListingForm from './AddListingForm';

const AddListing = ({ edit = false }) => {
  const { activeIndex, spaceDetails, ...listing } = useSelector(({ tempListing }) => tempListing);
  const dispatch = useDispatch();
  const setActiveIndex = (index) => dispatch(updateTempListing({ activeIndex: index }));
  useGetAllFormOptions(JSON.stringify({ formName: 'addListing' }));

  return (
    <div className="add-listing-div">
      <div className="add-listing-title-wrapper">
        <h1 className="add-listing-title">{edit ? 'Update' : 'Add'} Listing</h1>
        <div className="add-listing-hint">
          Add a listing. So that the guests can use your parking space
        </div>
      </div>
      <Row className="listings-wrapper">
        <Col sm={3} className="listings-menu-wrapper">
          <AddListingMenu
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            spaceDetails={spaceDetails}
            listing={{ ...listing, spaceDetails }}
          />
        </Col>
        <Col sm={8}>{activeIndex > 0 && <AddListingForm />}</Col>
      </Row>
    </div>
  );
};
export default AddListing;
