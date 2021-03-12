const { LOAD_USER_SPACEOWNER_PROFILE,CREATE_SPACEOWNER_PROFILE, UPDATE_SPACEOWNER_PROFILE, DELETE_SPACEOWNER_PROFILE } = require("../actions/types");

const initialState = {
    data:null,
    loading: false,
  };

  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {  
      case LOAD_USER_SPACEOWNER_PROFILE: {
        return {
          data: payload,
          loading: false,
        };
      }
      case CREATE_SPACEOWNER_PROFILE: {
        return {
          ...state,
          data: payload,
        };
      }
      case UPDATE_SPACEOWNER_PROFILE: {
        return {
          ...state,
          data: payload,
        };
      }
      case DELETE_SPACEOWNER_PROFILE: {
        return {
          ...state,
          data:null,
        };
      }
      default:
        return state;
    }
  }
  