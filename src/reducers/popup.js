import { POPUP_OPENED } from '../actions/popup';

export default function popupLastOpened(state = null, action) {
  switch (action.type) {
    case POPUP_OPENED:
      return action.time;
    default:
      return state;
  }
}
