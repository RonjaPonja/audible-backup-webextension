export const SET_LOGGED_IN = 'SET_LOGGED_IN';

export function setLoggedIn(loggedIn) {
  return {
    type: SET_LOGGED_IN,
    loggedIn,
  };
}
