<template>
  <button class="base-button" :disabled="disabled" @click="onClick">
    <i v-if="icon" class="material-icons icon" v-text="icon"></i>

    <span class="content">
      <slot />
    </span>

    <div v-if="badge !== null" class="button-badge">
      <span>{{ badge }}</span>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null
    },
    badge: {
      type: [String, Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onClick(e) {
      this.$emit("click", e);
    }
  }
};
</script>

<style lang="scss" scoped>
.base-button {
  height: 39px;
  border-radius: 3px;
  background: $color-primary;
  border: solid 1px $color-primary;
  color: $md-white;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  transition: background 0.3s;
  user-select: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  position: relative;

  .button-badge {
    pointer-events: none;
    position: absolute;
    top: -4px;
    right: -4px;
    background: darken($color-primary, 20%);
    color: $md-white;
    width: 22px;
    height: 22px;
    font-size: 14px;
    border-radius: 50%;
    font-weight: bold;

    @include h-box();

    @include box-center();

    letter-spacing: -2px;
    padding-right: 2px;
    box-sizing: border-box;
  }

  &:hover {
    background: lighten($color-primary, 10%);
    border-color: lighten($color-primary, 10%);
  }

  &:active {
    background: darken($color-primary, 10%);
    border-color: lighten($color-primary, 10%);
  }

  &.fab {
    position: fixed;
    z-index: 1;
    bottom: 24px;
    right: 18px;
    font-size: 24px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(black, 0.3);

    > i {
      top: 0;
    }
  }

  &.icon-button {
    width: 39px;
    padding: 8px;
    flex: auto 0 0;

    .icon {
      top: 0;
      font-size: 24px;
    }
  }

  &.secondary,
  &.selected {
    background: $md-white;
    color: $color-primary;
  }

  &.secondary {
    &:hover {
      background: lighten($color-primary, 85%);
    }
  }

  &.selected {
    box-shadow: 0 6px 20px rgba($color-primary, 0.4);

    &:hover {
      background: lighten($color-primary, 95%);
    }
  }

  .material-icons {
    font-family: 'Material Icons', Arial;
    font-weight: normal;
    font-style: normal;
    font-size: 24px;  /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;

    -moz-osx-font-smoothing: grayscale;

    font-feature-settings: 'liga';
  }

  &[disabled='disabled'] {
    background: $md-grey-400;
    cursor: not-allowed;
    color: $md-grey-200;
    border-color: $md-grey-500;
  }
}
</style>
