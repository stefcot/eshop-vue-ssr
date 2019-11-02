import 'babel-polyfill';
import { sync } from 'vuex-router-sync';
import Vue from 'vue';
import App from './components/App';
import { createRouter } from './router';
import { createStore } from './store';
import { createI18n } from './utils/i18n';
import * as filters from './filters';
import './plugins';
import './components';

// When running on the client, we are in a fresh context each time the page is loaded. That's
// why we used singletons instance of the root instance, the router, and the store until now.
// However, now we need to have a fresh context on the server as well--the problem is,
// Node.js is stateful. The solution is creating a fresh new root instance, router, and store for
// each request handled by the server.

// Global filters
for (const key in filters) {
  Vue.filter(key, filters[key]);
}

// Let's also rename the src/main.js file to src/app.js. This will be our
// universal file that creates the router, the store, and the Vue root instance. Change
// the main function into an exported createApp function, which takes a context
// argument and returns the app, the router, and the store:

// BEFORE MIGRATION TO UNIVERSAL APP

// sync(store, router);
//
// async function main() {
//   const locale = getAutoLang();
//   const i18n = await createI18n(locale);
//   await store.dispatch('init');
//
//   // eslint-disable-next-line no-new
//   new Vue({
//     el: '#app',
//     router,
//     store,
//     i18n, // inject internationalization into the app,
//     ...App
//   });
// }
//
// main();

// AFTER MIGRATION TO UNIVERSAL APP
export async function createApp(context) {
  const router = createRouter();
  const store = createStore();

  sync(store, router);

  // On the server, we won't select the initial locale the same way as in the client since we won't
  // have access to window.navigator. That's why we are passing the locale in the context argument:
  const i18n = await createI18n(context.locale);
  await store.dispatch('init');

  // We also removed the el option from the root instance definition since it doesn't make sense
  // on the server.
  const app = new Vue({
    router,
    store,
    i18n, // inject internationalization into the app,
    ...App
  });

  return {
    app,
    router,
    store
  };
}
