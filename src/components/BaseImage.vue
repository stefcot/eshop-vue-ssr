<template>
  <div class="base-image">
    <transition name="zoom">
      <img
        v-show="loaded"
        :key="src"
        class="img"
        :src="src"
        @load="loaded = true"
      />
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      loaded: false
    };
  },

  watch: {
    src() {
      this.loaded = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.base-image {
  @include flex-box();

  @include box-center();

  background: $md-grey-100;
  border-radius: 3px;

  .img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 3px;
  }
}
</style>
