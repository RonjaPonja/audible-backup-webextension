import browser from 'webextension-polyfill';
import * as Sentry from '@sentry/browser';
import { setIntervalAsync } from 'set-interval-async/dynamic';
import { createStore } from 'redux';
import { wrapStore } from 'webext-redux';
import reducer from './reducers';
import middleware from './middleware';

import { setLoggedIn } from './actions/loggedIn';
import { receiveLibrary } from './actions/library';
import { receiveRequested } from './actions/requested';
import { loadState, saveState } from './utils/localStorage';
import * as Audible from './utils/audible';

Sentry.init({ dsn: 'https://e2fb08d82a264a98a27934fd0a20a5f9@o380085.ingest.sentry.io/5205521' });

const persistedState = loadState();
const store = createStore(reducer, persistedState, middleware);
// Make store available in popup
wrapStore(store);

async function checkLoggedIn() {
  const loggedIn = await Audible.checkLoggedIn();
  store.dispatch(setLoggedIn(loggedIn));

  // Set plugin icon and clear badge text based on login state
  if (loggedIn) {
    browser.browserAction.setIcon({ path: 'icons/icon.png' });
  } else {
    browser.browserAction.setIcon({ path: 'icons/error.png' });
    browser.browserAction.setBadgeText({ text: '' });
  }

  return loggedIn;
}

async function updateLibrary() {
  const loggedIn = checkLoggedIn();
  const { backupURL } = store.getState();

  if (!backupURL || !loggedIn) {
    return;
  }

  // Ensure we get single files and the best AAX files we can get
  await Audible.setQuality();

  // Get Amazon Product IDs and download links for all books in our library
  const library = await Audible.getLibrary();
  store.dispatch(receiveLibrary(library));

  // Ask the backup server if it's interested in any of our books
  const requestedASINs = await Audible.crossReferenceASINs(
    backupURL, Object.keys(library),
  );
  store.dispatch(receiveRequested(requestedASINs));
}

async function shareBook() {
  const { backupURL, loggedIn, library, requested } = store.getState();
  if (!backupURL || !loggedIn) {
    return;
  }

  if (requested.length > 0) {
    browser.browserAction.setBadgeText(
      { text: requested.length.toString() },
    );
    // Down and Reupload one book from audible to our backup server
    const ASIN = requested[0];
    await Audible.shareBook(backupURL, ASIN, library[ASIN].downloadUrl);

    // We just uploaded a book, our stores library is therefore stale.
    // Furthermore we definetely took longer then one second and can therefore
    // assume shareBook will be invoked again, right after we return. To ensure
    // an up do date library for the next run, we update the library here.
    await updateLibrary();
  } else {
    browser.browserAction.setBadgeText({ text: '' });
  }
}

async function main() {
  browser.browserAction.setBadgeBackgroundColor({ color: '#666666' });
  browser.browserAction.setBadgeText({ text: '🔎' });

  let state = store.getState();
  store.subscribe(() => {
    const previousState = state;
    state = store.getState();

    // We ask users to login to Audible, so they will expect the UI to change
    // once they did. Therefore we recheck the login state when they open the
    // popup. This way they at least get a loading animation after logging in.
    // We could also update the whole library, but if they open and close the
    // popup a bunch, we would create lots of requests..
    if (state.popupLastOpened !== previousState.popupLastOpened) {
      checkLoggedIn();
    }

    // Call updateLibrary whenever the backup url changed. This is a bit hacky,
    // as we end up dispatching from a subscriber. The alternative would be to
    // call updateLibrary from the Settings component, which seems worse.
    if (state.backupURL !== previousState.backupURL) {
      // Pesist backup url to local storage
      saveState({ backupURL: store.getState().backupURL });
      updateLibrary();
    }
  });

  // Note that calls by setIntervalAsync luckily don't stack like setInterval
  // calls would. We can therefore set the shareBook interval to one second,
  // even though an upload can take hours.

  // We can call this pretty often, as this will usually return without any
  // requests after finding no requested books in the stores library. We don't
  // want to have multiple shareBooks running in parallel though, as they would
  // likely try to upload the same book and waste precious resources.
  setIntervalAsync(shareBook, 1000);

  // Note that updateLibrary might also be called from other places like
  // shareBook or when the backup url is changed. We don't want to hammer the
  // audible servers, but we also don't need a strict mutex either.
  setIntervalAsync(updateLibrary, 1000 * 60 * 5);
  updateLibrary();
}
main();
