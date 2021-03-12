const { LOAD_USER_BUSINESS_PROFILE,CREATE_BUSINESS_PROFILE, UPDATE_BUSINESS_PROFILE, DELETE_BUSINESS_PROFILE } = require("../actions/types");

const initialState = {
    data:null,
    loading: false,
  };

  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {  
      case LOAD_USER_BUSINESS_PROFILE: {
        return {
          data: payload,
          loading: false,
        };
      }
      case CREATE_BUSINESS_PROFILE: {
        return {
          ...state,
          data: payload,
        };
      }
      case UPDATE_BUSINESS_PROFILE: {
        return {
          ...state,
          data: payload,
        };
      }
      case DELETE_BUSINESS_PROFILE: {
        return {
          ...state,
          data:null,
        };
      }
      default:
        return state;
    }
  }
  