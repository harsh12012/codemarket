const { LOAD_USER_SPACEOWNER_PROFILE,CREATE_SPACEOWNER_PROFILE, UPDATE_SPACEOWNER_PROFILE, DELETE_SPACEOWNER_PROFILE } = require("./types");

export const loadUserSpaceOwnerProfile = (data) => async (dispatch) => {
    dispatch({
      type: LOAD_USER_SPACEOWNER_PROFILE,
      payload: data,
    });
  };

  export const createSpaceOwnerProfileLocal = (data) => async (dispatch) => {
    dispatch({
      type: CREATE_SPACEOWNER_PROFILE,
      payload: data,
    });
  };

  export const updateSpaceOwnerProfileLocal = (data) => async (dispatch) => {
    dispatch({
      type: UPDATE_SPACEOWNER_PROFILE,
      payload: data,
    });
  };

  export const deleteSpaceOwnerProfileLocal = (data) => async (dispatch) => {
    dispatch({
      type: DELETE_SPACEOWNER_PROFILE,
      payload: data,
    });
  };