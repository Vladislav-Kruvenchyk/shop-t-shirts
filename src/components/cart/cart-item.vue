<template>
  <div class="cart-item">
    <img :src="require('../../static/images/' + cart_data_item.image)" alt="" />
    <p>{{ cart_data_item.name }}</p>
    <p>{{ cart_data_item.price }}</p>
    <div>
      <span @click="increment">+</span>
      <p>{{ cart_data_item.quantity }}</p>
      <span @click="decrement">-</span>
    </div>
    <div class="catalog-item__case">
      <button class="btn" @click="deleteToCart">delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "vCartItem",
  props: {
    cart_data_item: {
      type: [Array, Object],
      default: null,
    },
  },
  methods: {
    deleteToCart() {
      this.$emit("deleteToCart");
    },
    increment() {
      this.$emit("increment");
    },
    decrement() {
      this.$emit("decrement");
    },
  },
};
</script>

<style lang="scss">
.cart-item {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  padding: 16px;
  margin: 16px;
  box-shadow: 0 0 8px 0 #787;
  &__case {
    display: flex;
  }
  img {
    width: 200px;
    height: 200px;
  }
}
</style>
