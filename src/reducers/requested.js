import { RECEIVE_REQUESTED } from '../actions/requested';

export default function requested(state = [], action) {
  switch (action.type) {
    case RECEIVE_REQUESTED:
      return action.requested;
    default:
      return state;
  }
}
