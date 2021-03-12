const { LOAD_USER_BUSINESS_PROFILE,CREATE_BUSINESS_PROFILE, UPDATE_BUSINESS_PROFILE, DELETE_BUSINESS_PROFILE } = require("./types");

export const loadUserBusinessProfile = (data) => async (dispatch) => {
    dispatch({
      type: LOAD_USER_BUSINESS_PROFILE,
      payload: data,
    });
  };

  export const createBusinessProfileLocal = (data) => async (dispatch) => {
    dispatch({
      type: CREATE_BUSINESS_PROFILE,
      payload: data,
    });
  };

  export const updateBusinessProfileLocal = (data) => async (dispatch) => {
    dispatch({
      type: UPDATE_BUSINESS_PROFILE,
      payload: data,
    });
  };

  export const deleteBusinessProfileLocal = (data) => async (dispatch) => {
    dispatch({
      type: DELETE_BUSINESS_PROFILE,
      payload: data,
    });
  };