import browser from 'webextension-polyfill'
import { checkLoggedIn, setQuality, getBooks, shareBooks } from './utils/audible.js'

async function main() {
  browser.browserAction.setBadgeBackgroundColor({ color: '#666666' });
  browser.browserAction.setBadgeText({ text: '🔎' });

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const isLoggedIn = await checkLoggedIn();
      if (!isLoggedIn) {
        throw new Error('Not logged in, skipping.');
      }
      await setQuality();
      const books = await getBooks();
      await shareBooks(books);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.stack);
    }

    // My favourite ES2018 feature? sleep.
    await new Promise((resolve) => setTimeout(resolve, 1000 * 60 * 5));
  }
}

main()