export const SET_REDIRECT_PATH = "SET_REDIRECT_PATH";

export function setRedirectPath(path) {
  return {
    type: SET_REDIRECT_PATH,
    path,
  };
}
