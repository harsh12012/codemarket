import { SET_REDIRECT_PATH } from "../actions/redirect";

const redirect = (state = "/", action) => {
  switch (action.type) {
    case SET_REDIRECT_PATH: {
      return action.path;
    }
    default: {
      return state;
    }
  }
};
export default redirect;
