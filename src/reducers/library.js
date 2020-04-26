import { RECEIVE_LIBRARY } from '../actions/library';

export default function library(state = {}, action) {
  switch (action.type) {
    case RECEIVE_LIBRARY:
      // Note: I'm not expanding the existing state here, as we always crawl
      // the full library anyway.
      return action.library;
    default:
      return state;
  }
}
