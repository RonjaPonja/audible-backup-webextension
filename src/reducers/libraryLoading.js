import { RECEIVE_LIBRARY } from '../actions/library';

export default function loadingLibrary(state = true, action) {
  switch (action.type) {
    case RECEIVE_LIBRARY:
      return false;
    default:
      return state;
  }
}
