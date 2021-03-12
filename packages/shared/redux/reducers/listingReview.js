const { LOAD_LISTING_REVIEWS,CREATE_LISTING_REVIEW, UPDATE_LISTING_REVIEW, DELETE_LISTING_REVIEW } = require("../actions/types");

const initialState = {
    reviews:[],
    loading: false,
  };

  export default function listing(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {  
      case LOAD_LISTING_REVIEWS: {
        return {
          reviews: payload,
          loading: false,
        };
      }
      case CREATE_LISTING_REVIEW: {
        return {
          ...state,
          reviews: [...state.reviews, payload],
        };
      }
      case UPDATE_LISTING_REVIEW: {
        return {
          ...state,
          reviews: [
            ...state.reviews.map((item) =>
              item._id == payload._id ? payload : item
            ),
          ],
        };
      }
      case DELETE_LISTING_REVIEW: {
        return {
          ...state,
          reviews: [...state.reviews.filter((item) => item._id !== payload)],
        };
      }
      default:
        return state;
    }
  }
  