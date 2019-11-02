// Create a new src/entry-server.js file that will be the entry point for the server bundle.
// It will export a function that gets a context object from the HTTP server we will build
// later. It should return a Promise that resolves with the Vue app when it's ready.

// Similarly to the client entry, we also use the createApp function to create the root app
// instance, the router, and the store. entry-server.js should look like this:

import { createApp } from './app';

const isProd = process.env.NODE_ENV === 'production';

export default context => {
  // We return a Promise because we will send the application app when we
  // will have finished all the operations.

  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const { app, router, store } = await createApp(context);
    // We will pass an url attribute to the context so that we can set the current route like this:
    router.push(context.url);
    // We wait for component resolution
    // SSR: We can use the router.getMatchedComponents() method to get the list of
    // components that matched with the current route
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      // PRELOAD DATA
      // We can then call all the asyncData options of these components and wait for
      // them to finish. We pass both the store and the current route to them.
      // Use Promise.all(array) to wait for all the asyncData calls
      Promise.all(
        matchedComponents.map(Component => {
          const asyncData = isProd
            ? Component.asyncData
            : Component.methods.asyncData;

          if (asyncData) {
            return asyncData({
              store,
              route: router.currentRoute
            });
          }
        })
      ).then(() => {
        // when they have all completed, we send the Vuex store state back to the renderer
        context.state = store.state;
        // RESOLVE THE PROMISE
        // Sending back the app to the renderer
        resolve(app);
      });
    }, reject);
  });
};

// The app root instance will be send back to what we call the renderer (kind of like when we
// did Jest snapshots) using resolve(app). First, we need to take care of preloading the Vuex
// store.
