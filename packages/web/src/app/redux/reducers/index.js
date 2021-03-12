import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading";

import auth from "./auth";
import redirect from "./redirect";
import user from "./user";
import listing from "./listing";
import findParking from "./findParking";
import vehicle from "./vehicle";
import businessProfile from "./businessProfile";
import spaceOwnerProfile from "./spaceOwnerProfile";
import listingReview from "./listingReview";
import tempListing from "./tempListing";

export default combineReducers({
  auth,
  redirect,
  loadingBar: loadingBarReducer,
  user,
  listing,
  findParking,
  vehicle,
  businessProfile,
  spaceOwnerProfile,
  listingReview,
  tempListing,
});
