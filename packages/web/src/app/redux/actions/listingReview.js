const { LOAD_LISTING_REVIEWS,CREATE_LISTING_REVIEW, UPDATE_LISTING_REVIEW, DELETE_LISTING_REVIEW } = require("./types");

export const loadListingReviews = (data) => async (dispatch) => {
    dispatch({
      type: LOAD_USER_VEHICLES,
      payload: data,
    });
  };

  export const addVehicleLocal = (data) => async (dispatch) => {
    dispatch({
      type: CREATE_LISTING_REVIEW,
      payload: data,
    });
  };

  export const updateVehicleLocal = (data) => async (dispatch) => {
    dispatch({
      type: UPDATE_LISTING_REVIEW,
      payload: data,
    });
  };

  export const deleteVehicleLocal = (data) => async (dispatch) => {
    dispatch({
      type: DELETE_LISTING_REVIEW,
      payload: data,
    });
  };