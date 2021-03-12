import {combineReducers} from 'redux';

import auth from './auth';
import redirect from './redirect';
import user from './user';
import listing from './listing';
import findParking from './findParking';
import vehicle from './vehicle';
import businessProfile from './businessProfile';
import spaceOwnerProfile from './spaceOwnerProfile';
import listingReview from './listingReview';
import tempListing from './tempListing';

export default combineReducers({
  auth,
  redirect,
  user,
  listing,
  findParking,
  vehicle,
  businessProfile,
  spaceOwnerProfile,
  listingReview,
  tempListing,
});
