const {
  INITIALIZE_USER,
  TOGGLE_USER_TYPE,
  TOGGLE_PROFILE_TYPE,
  ADD_LISTING,
  LOAD_USER_LISTINGS,
  DELETE_LISTING,
  UPDATE_LISTING,
  TOGGLE_LOADING,
  LOAD_USER_BOOKINGS,
  ADD_BOOKING,
  UPDATE_BOOKING,
  DELETE_BOOKING,
  LOAD_USER_TYPE
} = require('../actions/types');

const initialState = {
  isSpaceOwner: false,
  profileType:'personal',//or business
  listings: [],
  bookings: [],
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case INITIALIZE_USER: {
      // if(typeof window !== undefined){
      // localStorage.setItem('isSpaceOwner',false);
      // }
      return initialState;
    }
    case LOAD_USER_TYPE : 
      return {
        ...state,
        isSpaceOwner: payload
      }
    case TOGGLE_USER_TYPE:
      if(typeof window !== undefined){
      localStorage.setItem('isSpaceOwner',!state.isSpaceOwner);
      }
      return {
        ...state,
        isSpaceOwner: !state.isSpaceOwner,
      };
    case TOGGLE_PROFILE_TYPE:
      return {
        ...state,
        profileType: state.profileType==="personal"?"business":"personal",
      };
    case TOGGLE_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case LOAD_USER_LISTINGS: {
      return {
        ...state,
        listings: payload,
        loading: false,
      };
    }
    case ADD_LISTING: {
      return {
        ...state,
        listings: [...state.listings, payload],
      };
    }
    case UPDATE_LISTING: {
      return {
        ...state,
        listings: [
          ...state.listings.map((item) =>
            item._id == payload._id ? payload : item
          ),
        ],
      };
    }
    case DELETE_LISTING: {
      return {
        ...state,
        listings: [...state.listings.filter((item) => item._id !== payload)],
      };
    }
    case LOAD_USER_BOOKINGS: {
      return {
        ...state,
        bookings: payload,
        loading: false,
      };
    }
    case ADD_BOOKING: {
      return {
        ...state,
        bookings: [...state.bookings, payload],
      };
    }
    case UPDATE_BOOKING: {
      return {
        ...state,
        bookings: [
          ...state.bookings.map((item) =>
            item._id == payload._id ? payload : item
          ),
        ],
      };
    }
    case DELETE_BOOKING: {
      return {
        ...state,
        bookings: [...state.bookings.filter((item) => item._id !== payload)],
      };
    }
    default:
      return state;
  }
}
