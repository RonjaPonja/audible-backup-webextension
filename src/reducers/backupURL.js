import { SET_BACKUP_URL } from '../actions/backupURL';

export default function backupURL(state = '', action) {
  switch (action.type) {
    case SET_BACKUP_URL:
      return action.backupURL;
    default:
      return state;
  }
}
