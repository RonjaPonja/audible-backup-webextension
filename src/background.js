import browser from 'webextension-polyfill'
import {
  checkLoggedIn,
  setQuality,
  getBooks,
  crossReferenceASINs,
  shareBook,
} from './utils/audible.js'

async function main() {
  browser.browserAction.setBadgeBackgroundColor({ color: '#666666' });
  browser.browserAction.setBadgeText({ text: '🔎' });

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      if (await checkLoggedIn()) {
        browser.browserAction.setIcon({ path: 'icons/icon.png' });
      } else {
        browser.browserAction.setIcon({ path: 'icons/error.png' });
        browser.browserAction.setBadgeText({ text: '' });
        throw new Error('Not logged in, skipping.');
      }

      await setQuality();
      const books = await getBooks();
      const requestedASINs = await crossReferenceASINs(Object.keys(books));
      if (requestedASINs.length > 0) {
        browser.browserAction.setBadgeText(
          { text: requestedASINs.length.toString() },
        );
        const ASIN = requestedASINs[0]
        await shareBook(ASIN, books[ASIN])
      } else {
        browser.browserAction.setBadgeText({ text: '' });
        // My favourite ES2018 feature? sleep.
        await new Promise((resolve) => setTimeout(resolve, 1000 * 60 * 5));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.stack);
    }
  }
}

main()
