import { combineReducers } from 'redux';
import backupURL from './backupURL';
import loggedIn from './loggedIn';
import library from './library';
import libraryLoading from './libraryLoading';
import requested from './requested';
import popupLastOpened from './popup';

export default combineReducers({
  backupURL,
  loggedIn,
  library,
  libraryLoading,
  requested,
  popupLastOpened,
});
