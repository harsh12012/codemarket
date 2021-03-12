const { LOAD_USER_VEHICLES,ADD_VEHICLE, UPDATE_VEHICLE, DELETE_VEHICLE } = require("./types");

export const loadUserVehicles = (data) => async (dispatch) => {
    dispatch({
      type: LOAD_USER_VEHICLES,
      payload: data,
    });
  };

  export const addVehicleLocal = (data) => async (dispatch) => {
    dispatch({
      type: ADD_VEHICLE,
      payload: data,
    });
  };

  export const updateVehicleLocal = (data) => async (dispatch) => {
    dispatch({
      type: UPDATE_VEHICLE,
      payload: data,
    });
  };

  export const deleteVehicleLocal = (data) => async (dispatch) => {
    dispatch({
      type: DELETE_VEHICLE,
      payload: data,
    });
  };