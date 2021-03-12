const {
  TOGGLE_USER_TYPE,
  LOAD_USER_LISTINGS,
  DELETE_LISTING,
  UPDATE_LISTING,
  PUBLISH_LISTING,
  INITIALIZE_USER,
  TOGGLE_LOADING,
  ADD_BOOKING,
  UPDATE_BOOKING,
  DELETE_BOOKING,
  LOAD_USER_BOOKINGS,
  TOGGLE_PROFILE_TYPE,
  LOAD_USER_TYPE,
  ADD_LISTING,
} = require('./types');

export const initializeUser = () => {
  return {
    type: INITIALIZE_USER,
  };
};

export const loadUserType = (data) => {
  return {
    type: LOAD_USER_TYPE,
    payload: data,
  };
};

export const toggleUserType = () => async (dispatch) => {
  dispatch({
    type: TOGGLE_USER_TYPE,
  });
};

export const toggleProfileType = () => async (dispatch) => {
  dispatch({
    type: TOGGLE_PROFILE_TYPE,
  });
};

export const toggleLoading = () => async (dispatch) => {
  dispatch({
    type: TOGGLE_LOADING,
  });
};

export const loadUserListings = (data) => async (dispatch) => {
  dispatch({
    type: LOAD_USER_LISTINGS,
    payload: data,
  });
};

export const addListingLocal = (data) => async (dispatch) => {
  dispatch({
    type: ADD_LISTING,
    payload: data,
  });
};

export const updateListingLocal = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_LISTING,
    payload: data,
  });
};

export const publishListingLocal = (data) => async (dispatch) => {
  dispatch({
    type: PUBLISH_LISTING,
    payload: data,
  });
};

export const deleteListingLocal = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_LISTING,
    payload: id,
  });
};

// booking
export const loadUserBookings = (data) => async (dispatch) => {
  dispatch({
    type: LOAD_USER_BOOKINGS,
    payload: data,
  });
};

export const addBookingLocal = (data) => async (dispatch) => {
  dispatch({
    type: ADD_BOOKING,
    payload: data,
  });
};

export const updateBookingLocal = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_BOOKING,
    payload: data,
  });
};

export const deleteBookingLocal = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_BOOKING,
    payload: id,
  });
};
