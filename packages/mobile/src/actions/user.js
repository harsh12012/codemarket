const {TOGGLE_USER_TYPE, ADD_BOOKING, ADD_VEHICLE} = require('./types');

//change theme
export const toggleUserType = () => async (dispatch) => {
  console.log('changing user type');
  dispatch({
    type: TOGGLE_USER_TYPE,
  });
};

//add vehicle
export const addVehicle = (data) => async (dispatch) => {
  console.log('adding user vehicle :', data);
  dispatch({
    type: ADD_VEHICLE,
    payload: data,
  });
};

//add booking
export const addBooking = (data) => async (dispatch) => {
  console.log('adding user booking :', data);
  dispatch({
    type: ADD_BOOKING,
    payload: data,
  });
};
