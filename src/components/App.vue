<template>
  <div id="app">
    <AppHeader />
    <router-view />
    <AppFooter />

    <transition name="right-pane" duration="800">
      <StoreCart v-if="showCart" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import StoreCart from './StoreCart';

export default {
  components: {
    AppHeader,
    AppFooter,
    StoreCart
  },

  computed: {
    ...mapGetters('ui', ['showCart'])
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}
@import '../styles/main';
</style>
