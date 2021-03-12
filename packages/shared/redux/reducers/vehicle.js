const { LOAD_USER_VEHICLES,ADD_VEHICLE, UPDATE_VEHICLE, DELETE_VEHICLE } = require("../actions/types");

const initialState = {
    vehicles:[],
    loading: false,
  };

  export default function vehicle(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {  
      case LOAD_USER_VEHICLES: {
        return {
          vehicles: payload,
          loading: false,
        };
      }
      case ADD_VEHICLE: {
        return {
          ...state,
          vehicles: [...state.vehicles, payload],
        };
      }
      case UPDATE_VEHICLE: {
        return {
          ...state,
          vehicles: [
            ...state.vehicles.map((item) =>
              item._id == payload._id ? payload : item
            ),
          ],
        };
      }
      case DELETE_VEHICLE: {
        return {
          ...state,
          vehicles: [...state.vehicles.filter((item) => item._id !== payload)],
        };
      }
      default:
        return state;
    }
  }
  