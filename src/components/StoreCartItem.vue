<template>
  <div class="store-cart-item store-item-infos-parent">
    <BaseImage :src="item.storeItem.img" />
    <StoreItemInfos :item="item.storeItem" />
    <div class="actions">
      <div class="auto-hide">
        <BaseButton class="icon-button" icon="add" @click="addOne" />
      </div>
      <div class="count">
        <span class="prefix">x</span>
        <input v-model.number="countModel" type="number" class="value" />
      </div>
      <div class="auto-hide">
        <BaseButton class="icon-button" icon="remove" @click="removeOne" />
        <BaseButton class="icon-button" icon="delete" @click="removeAll" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import StoreItemInfos from './StoreItemInfos';

export default {
  components: {
    StoreItemInfos
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    countModel: {
      get() {
        return this.item.count;
      },
      set(value) {
        this.setCartItemCount({
          id: this.item.id,
          count: value
        });
      }
    }
  },

  methods: {
    ...mapActions('cart', [
      'addStoreItemToCart',
      'removeStoreItemFromCart',
      'removeCartItem',
      'setCartItemCount'
    ]),

    addOne() {
      this.addStoreItemToCart({
        id: this.item.id
      });
    },

    removeOne() {
      this.removeStoreItemFromCart({
        id: this.item.id
      });
    },

    removeAll() {
      this.removeCartItem({
        id: this.item.id
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.store-cart-item {
  @include h-box();

  @include box-center();

  padding: 12px;
  padding-left: 18px;
  border-radius: 3px;
  user-select: none;
  cursor: default;

  .base-image {
    width: 70px;
    height: 70px;
    margin-right: 12px;
  }

  .store-item-infos {
    flex: 1;

    .price {
      font-size: 24px;
    }

    .rating {
      display: none;
    }
  }

  .actions {
    @include h-box();

    @include box-center();

    .count {
      font-size: 24px;
      font-weight: lighter;
      padding: 0 6px;

      @include h-box();

      transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
      margin-right: 0;
    }

    .prefix {
      color: $md-grey-300;
      width: 0;
      padding-right: 16px;
      margin-left: -16px;
      transition: all 0.3s;
    }

    .value {
      color: $color-primary;
      display: inline-block;
      width: 28px;
      text-align: center;
      font-weight: lighter;
      padding: 0;
      background: none;
      border-bottom: solid 1px transparent;
      transition: all 0.3s;
    }

    .auto-hide {
      @include h-box();

      @include box-center();

      max-width: 0;
      opacity: 0;
      transform: scale(0.9);
      white-space: nowrap;
      transition: all 0.3s cubic-bezier(0, 0, 0.2, 1), opacity 0.1s;
    }

    > *,
    .auto-hide {
      > * {
        @include space-between-x(8px);
      }
    }
  }

  &:hover {
    background: rgba($color-primary, 0.1);

    .actions {
      .count {
        margin-right: 8px;

        .prefix {
          opacity: 0;
        }

        .value {
          border-bottom-color: $color-primary;
        }
      }

      .auto-hide {
        max-width: 100px;
        opacity: 1;
        transform: none;
      }
    }
  }
}
</style>
