<template>
  <div class="store-item-infos" :class="cssClass">
    <div class="title">{{ item.title }}</div>
    <div v-if="discount" class="discount">
      <span class="original-price">{{ item.originalPrice | money }}</span>
      <span class="percentage">-{{ discount | percentage }}</span>
    </div>
    <div class="price">{{ item.price | money }}</div>
    <div class="rating">
      <i class="material-icons">start</i> {{ item.rating }}
    </div>
  </div>
</template>

<script>
import DiscountMixin from "../mixins/discount";

export default {
  mixins: [DiscountMixin()],

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    cssClass() {
      return {
        discount: this.discount
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.store-item-infos {

  @include v-box();

  .title {
    font-size: 20px;
  }

  .discount {

    .original-price {
      text-decoration: line-through;
      color: rgba($md-black, 0.7);
    }

    .percentage {
      background: linear-gradient(
        to right,
        $color-accent1 0%,
        $color-primary 50%,
        $color-accent2 100%
      );
      color: $md-white;
      border-radius: 3px;
      padding: 0 2px;
      font-weight: bold;
    }
  }

  .price {
    flex: 1;
    font-size: 32px;
    font-weight: lighter;
  }

  .rating {
    color: rgba($md-black, 0.3);
  }

  &.discount {

    .price {
      color: $color-primary;
    }
  }
}

.store-item-infos-parent {

  &.discount {

    &:hover {

      .store-item-infos {

        .discount {

          .percentage {
            background: none;
          }
        }

        .price {
          color: $md-white;
        }
      }
    }
  }
}
</style>
