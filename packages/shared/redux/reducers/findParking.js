const moment = require('moment');
const { SET_SEARCH_DATA, CLEAR_SEARCH_DATA, UPDATE_SEARCH_DATA } = require('../actions/types');

const roundedUp = Math.ceil(moment().minute() / 15) * 15;

let tempStartDate = moment().minute(roundedUp).second(0);
tempStartDate = new Date(tempStartDate);

// let tempStartDate = new Date(new Date(new Date()).setHours(new Date().getHours() + 1));
// tempStartDate = new Date(new Date(tempStartDate).setMinutes(30));
let tempEndDate = new Date(new Date(tempStartDate).setHours(tempStartDate.getHours() + 2));
// tempEndDate = new Date(new Date(tempEndDate).setMinutes(30));

const initialState = {
  search: '',
  coordinates: [-122.4324, 37.78825], // pune - [73.8567, 18.5204]
  parkings: [],
  start: tempStartDate,
  end: tempEndDate,
  duration: 'hourly',
  vehicleSelected: null
};

export default function findParking(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_SEARCH_DATA: {
      return {
        ...payload
      };
    }
    case UPDATE_SEARCH_DATA: {
      return {
        ...state,
        ...payload
      };
    }
    case CLEAR_SEARCH_DATA: {
      return {
        ...initialState
      };
    }
    default:
      return state;
  }
}
