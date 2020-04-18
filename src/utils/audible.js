/* global browser, chrome */
/* eslint-disable no-await-in-loop */
const AUDIBLE_DE = 'https://www.audible.de';
const AUDIBLE_LIBRARY_URL = `${AUDIBLE_DE}/lib?sortBy=PURCHASE_DATE.dsc&pageSize=20&page=1`;
const AUDIBLE_SETTINGS_URL = `${AUDIBLE_DE}/a/library/settings`;
const BACKUP_URL = '<your-url-goes-here>';


export async function checkLoggedIn() {
  // Check if we are logged in
  return await fetch(new Request(
    AUDIBLE_LIBRARY_URL, { redirect: 'manual' },
  ))
    .then((response) => response.type !== 'opaqueredirect')
    .catch((error) => null);
}

export async function setQuality() {
  // Check if we are logged in and get token
  const tokenElement = await fetch(AUDIBLE_LIBRARY_URL)
    .then((response) => response.text())
    .then((text) => new DOMParser().parseFromString(text, 'text/html'))
    .then((document) => document.querySelector('input[name="token"]'));

  // Set default quality to Enhanced
  const body = new FormData();
  body.append('preferredFormat', 'Enhanced');
  body.append('hmac', tokenElement && tokenElement.value);

  const settingsResponse = await fetch(AUDIBLE_SETTINGS_URL, {
    method: 'POST',
    body,
  });
  if (!settingsResponse.ok) {
    throw new Error('Failed to set Download Quality.');
  }
}

function parseBooks(libraryDocument) {
  // download links method 1
  const links = libraryDocument.querySelectorAll(
    '.adbl-lib-action-download a',
  );

  // asin for link method 1
  return [...links].reduce((books, { href }) => ({
    ...books,
    [href.match(/.*asin=([^&]+).*/)[1]]: href,
  }), {});
}

export async function getBooks(link = AUDIBLE_LIBRARY_URL) {
  const libraryDocument = await fetch(link)
    .then((response) => response.text())
    .then((text) => new DOMParser().parseFromString(text, 'text/html'));

  // Required to fix relative links used for recusions, otherwise the library
  // from DOMParser will use browser-extension://<random>/ as the base url...
  const baseElement = libraryDocument.createElement('base');
  baseElement.setAttribute('href', AUDIBLE_DE);
  libraryDocument.head.append(baseElement);

  // Is there another page?
  const nextButton = libraryDocument.querySelectorAll(
    '.pagingElements .nextButton a',
  )[0];
  // If this is the last page, break recursion by just returning this
  // pages books
  if (typeof nextButton === 'undefined' || nextButton.getAttribute('disabled') === 'true') {
    return parseBooks(libraryDocument);
  }
  // If this isn't the last page, go into recursion and return this
  // pages book combined with the books from deeper recursion levels
  const parsedBooks = parseBooks(libraryDocument);
  const recursiveBooks = await getBooks(nextButton.href);
  return {
    ...parsedBooks,
    ...recursiveBooks,
  };
}

export function crossReferenceASINs(ASINs) {
  // Check which audibooks the backup server wants
  const url = new URL(BACKUP_URL);
  const params = new URLSearchParams();
  ASINs.forEach((ASIN) => { params.append('asins', ASIN); });
  url.search = params.toString();

  return fetch(url)
    .then((response) => response.json());
}

export async function shareBook(ASIN, link) {
  // Down+ Uploading a book might take hours so we only upgrade one book at a
  // time and then re-scrape our library and re-check which books the backup
  // server doesn't have yet
  const blob = await fetch(link)
    .then((response) => response.blob());

  const body = new FormData();
  body.append('asin', ASIN);
  body.append('aax', blob);

  await fetch(BACKUP_URL, {
    method: 'POST',
    body,
  });
}


// // download links method 2
// asinInputs = xhr.response.getElementsByName('asin');
// [...asinInputs].reduce((links, asinInput) => {
//     return [...new Set([
//         ...links,
//         ...asinInput.parentElement.querySelectorAll('a')
//     ])]
// }, []);

// // asin for link method 2
// a.closest(".bc-col-responsive").querySelectorAll('[name="asin"]')[0].value;

// // beyond last page?
// imgs = [...document.querySelectorAll('img')]
// imgs.some((img) => { return img.src.includes('empty_lib') })
