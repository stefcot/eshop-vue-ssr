import Vue from 'vue';
import VueRouter from 'vue-router';

import PageLocale from './components/PageLocale';
import PageHome from './components/PageHome';
import PageStoreItem from './components/PageStoreItem';
import PageCheckout from './components/PageCheckout';
import PageNotFound from './components/PageNotFound';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'home', component: PageHome },
  {
    path: '/item/:id',
    name: 'store-item',
    component: PageStoreItem,
    props: route => ({ id: parseInt(route.params.id) })
  },
  { path: '/checkout', name: 'checkout', component: PageCheckout },
  { path: '/locale', name: 'locale', component: PageLocale },
  { path: '*', component: PageNotFound }
];

// When running on the client, we are in a fresh context each time the page is loaded. That's
// why we used singletons instance of the root instance, the router, and the store until now.
// However, now we need to have a fresh context on the server as well--the problem is,
// Node.js is stateful. The solution is creating a fresh new root instance, router, and store for
// each request handled by the server.

// Let's start with the router. In the src/router.js file, wrap the router creation
// into a new exported createRouter function:

// WILL RETURN A FRESH INSTANCE OF ROUTER FOR EACH SERVER REQUEST MADE

export function createRouter() {
  const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      if (to.hash) {
        return { selector: to.hash };
      }
      return { x: 0, y: 0 };
    }
  });

  return router;
}
