<template>
  <div class="catalog-item">
    <vPopup
      :popupHeader="product_data_item.name"
      @close="closePopup"
      @addToCart="addToCart"
      v-if="showPopupCatalog"
    >
      <img
        :src="require('../../static/images/' + product_data_item.image)"
        alt=""
      />
    </vPopup>
    <img
      :src="require('../../static/images/' + product_data_item.image)"
      alt=""
    />
    <p>{{ product_data_item.name }}</p>
    <p>{{ product_data_item.price }}</p>
    <div class="catalog-item__case">
      <button class="btn" @click="showPopup">show</button>
      <button class="btn" @click="addToCart">add</button>
    </div>
  </div>
</template>

<script>
import vPopup from "../popup/popup.vue";
export default {
  name: "vCatalogItem",
  components: { vPopup },
  props: {
    product_data_item: {
      type: [Array, Object],
      default: null,
    },
  },
  data() {
    return {
      showPopupCatalog: false,
    };
  },
  methods: {
    showPopup() {
      this.showPopupCatalog = true;
    },
    addToCart() {
      this.$emit("addToCart", this.product_data_item);
    },
    closePopup() {
      this.showPopupCatalog = false;
    },
  },
  mounted() {
    this.$set(this.product_data_item, "quantity", 1);
  },
};
</script>

<style lang="scss">
.catalog-item {
  display: flex;
  flex-basis: 25%;
  flex-direction: column;
  justify-content: center;
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
