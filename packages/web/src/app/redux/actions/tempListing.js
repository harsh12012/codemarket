export const ADD_TEMP_LISTING = 'ADD_TEMP_LISTING';
export const UPDATE_TEMP_LISTING = 'UPDATE_TEMP_LISTING';
export const DELETE_TEMP_LISTING = 'DELETE_TEMP_LISTING';
export const TEMP_LISTING_UPDATE_LOCATIONDETAILS =
  'TEMP_LISTING_UPDATE_LOCATIONDETAILS';
export const TEMP_LISTING_UPDATE_SPACEDETAILS =
  'TEMP_LISTING_UPDATE_SPACEDETAILS';
export const TEMP_LISTING_UPDATE_PRICINGDETAILS =
  'TEMP_LISTING_UPDATE_PRICINGDETAILS';
export const TEMP_LISTING_UPDATE_SPACEAVAILABLE =
  'TEMP_LISTING_UPDATE_SPACEAVAILABLE';

export function addTempListing(payload) {
  return {
    type: ADD_TEMP_LISTING,
    payload,
  };
}

export function updateTempListing(payload) {
  return {
    type: UPDATE_TEMP_LISTING,
    payload,
  };
}

export function tempListingLocationD(payload) {
  return {
    type: TEMP_LISTING_UPDATE_LOCATIONDETAILS,
    payload,
  };
}

export function tempListingSpaceD(payload) {
  return {
    type: TEMP_LISTING_UPDATE_SPACEDETAILS,
    payload,
  };
}

export function tempListingPricingD(payload) {
  return {
    type: TEMP_LISTING_UPDATE_PRICINGDETAILS,
    payload,
  };
}

export function tempListingSpaceA(payload) {
  return {
    type: TEMP_LISTING_UPDATE_SPACEAVAILABLE,
    payload,
  };
}

export function deleteTempListing() {
  return {
    type: DELETE_TEMP_LISTING,
  };
}
