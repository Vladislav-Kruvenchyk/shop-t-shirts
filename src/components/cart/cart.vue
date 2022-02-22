<template>
  <div class="cart">
    <router-link to="catalog">
      <span class="cart__return">return</span>
    </router-link>
    <p v-if="this.cart_data == false">in catalog not products</p>
    <div class="cart__list">
      <vCartitem
        v-for="(item, i) in cart_data"
        :key="item.article"
        @increment="increment(i)"
        @decrement="decrement(i)"
        @deleteToCart="deleteToCart(i)"
        :cart_data_item="item"
      />
    </div>
    <div class="cart__total">
      <p>{{ totalPrice }}</p>
    </div>
  </div>
</template>

<script>
import vCartitem from "./cart-item.vue";
import { mapActions } from "vuex";
export default {
  name: "vCart",
  components: { vCartitem },
  props: {
    cart_data: {
      type: [Array, Object],
      default: null,
    },
  },
  computed: {
    totalPrice() {
      if (this.cart_data.length) {
        let result = [];
        for (let item of this.cart_data) {
          result.push(item.price * item.quantity);
        }
        result = result.reduce((item, el) => {
          return item + el;
        });
        return result;
      }
    },
  },
  methods: {
    ...mapActions(["DECREMENT", "INCREMENT", "DELETE_FROM_CART"]),
    deleteToCart(i) {
      this.DELETE_FROM_CART(i);
    },
    decrement(i) {
      this.DECREMENT(i);
    },
    increment(i) {
      this.INCREMENT(i);
    },
  },
};
</script>

<style lang="scss">
.cart {
  &__total {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #898;
  }

  &__return {
    position: absolute;
    top: 120px;
    right: 0;
    padding: 16px;
    margin: 16px;
    text-transform: uppercase;
    box-shadow: 0 0 8px 0 #787;
  }
  &__list {
    display: flex;
    margin-top: 15rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  span {
    cursor: pointer;
  }
}
</style>
