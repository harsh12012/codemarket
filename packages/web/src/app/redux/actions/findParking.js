const { SET_SEARCH_DATA, CLEAR_SEARCH_DATA } = require('./types');

export const setSearchData = (data) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_DATA,
    payload: data,
  });
};

export const clearSearchData = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SEARCH_DATA,
  });
};
