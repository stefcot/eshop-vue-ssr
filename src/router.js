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

export default router;
