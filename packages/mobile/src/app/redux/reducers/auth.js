import {
  SET_AUTHED_USER,
  UNSET_AUTHED_USER,
  INITIAL_AUTHED_USER,
} from '../actions/auth';

const authUser = (state = {authenticated: false, initial: false}, action) => {
  switch (action.type) {
    case SET_AUTHED_USER: {
      return {
        ...state,
        authenticated: true,
        data: action.user,
        initial: true,
      };
    }
    case UNSET_AUTHED_USER: {
      return {
        ...state,
        authenticated: false,
        initial: true,
        data: {attributes: {sub: null}},
      };
    }
    case INITIAL_AUTHED_USER: {
      return {...state, initial: true};
    }
    default: {
      return state;
    }
  }
};
export default authUser;
