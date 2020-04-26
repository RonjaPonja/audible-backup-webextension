import * as Sentry from '@sentry/browser';
import React from 'react';
import { render } from 'react-dom';
import { Store } from 'webext-redux';
import { Provider } from 'react-redux';

import App from './components/App';
import { popupOpened } from './actions/popup';

Sentry.init({ dsn: 'https://e2fb08d82a264a98a27934fd0a20a5f9@o380085.ingest.sentry.io/5205521' });

const proxyStore = new Store();

proxyStore.ready().then(() => {
  proxyStore.dispatch(popupOpened());

  render(
    <Provider store={proxyStore}>
      <App />
    </Provider>,
    document.getElementById('app'),
  );
});
