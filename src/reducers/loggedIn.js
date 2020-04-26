import { SET_LOGGED_IN } from '../actions/loggedIn';

export default function loggedIn(state = true, action) {
  switch (action.type) {
    case SET_LOGGED_IN:
      return action.loggedIn;
    default:
      return state;
  }
}
