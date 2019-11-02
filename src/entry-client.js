// Create a new src/entry-client.js file that will be the entry point for the
// client bundle. It will get the user language, call the createApp function, and then
// mount the app into the page:

import { createApp } from './app';
import { getAutoLang } from './utils/i18n';

const locale = getAutoLang();

// createApp being a promise, we retrieve the app instance sored in the returned object
createApp({
  locale
}).then(({ app, store }) => {
  // SSR: RESTORING THE VUEX STATE ON THE CLIENT
  // The store state is serialized by the server on a __INITIAL_STATE__ variable in the HTML
  // page. We can use this to set the state even before the app is mounted, so the components
  // will have access to it.
  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
  }
  // Finally mounting app on the passed element
  app.$mount('#app');
});
