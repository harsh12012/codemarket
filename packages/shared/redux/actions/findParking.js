const { SET_SEARCH_DATA, CLEAR_SEARCH_DATA, UPDATE_SEARCH_DATA } = require('./types');

export const setSearchData = (data) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_DATA,
    payload: data
  });
};

export function clearSearchData() {
  return {
    type: CLEAR_SEARCH_DATA
  };
}
export function updateFindParkingData(payload) {
  return {
    type: UPDATE_SEARCH_DATA,
    payload
  };
}
