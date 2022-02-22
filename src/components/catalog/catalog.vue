<template>
  <div class="catalog">
    <router-link :to="{ name: 'vCart', params: { cart_data: CART } }">
      <span class="catalog__cart">cart: {{ CART.length }}</span>
    </router-link>
    <vSelect
      :selected="selected"
      :options="categories"
      @selectOption="sortBySelect"
    />
    <div class="catalog__list">
      <div class="section">
        <div class="range-slider">
          <input
            type="range"
            min="0"
            max="10000"
            step="10"
            v-model.number="minPrice"
            @change="setRange"
          />
          <input
            type="range"
            min="0"
            max="10000"
            step="10"
            v-model.number="maxPrice"
            @change="setRange"
          />
        </div>
      </div>
      <vCatalogItem
        v-for="product in filterByArr"
        :key="product.article"
        :product_data_item="product"
        @addToCart="addToCart"
      />
    </div>
  </div>
</template>

<script>
import vCatalogItem from "./catalog-item.vue";
import vSelect from "../select/select.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "vCatalog",
  components: {
    vCatalogItem,
    vSelect,
  },
  data() {
    return {
      categories: [
        { name: "Все", value: "все" },
        { name: "Мужские", value: "м" },
        { name: "Женские", value: "ж" },
        { name: "Маски", value: "маски" },
      ],
      sortArr: [],
      minPrice: 0,
      maxPrice: 10000,
      selected: "Все",
    };
  },
  computed: {
    ...mapGetters(["CART", "PRODUCTS", "SEARCH_VALUE"]),
    filterByArr() {
      if (this.sortArr.length) {
        return this.sortArr;
      } else return this.PRODUCTS;
    },
    rangeFilter() {
      if (this.minPrice > this.maxPrice) {
        this.minPrice = this.maxPrice;
        this.maxPrice = this.minPrice;
      }
      this.setRange();
    },
  },
  methods: {
    ...mapActions(["GET_PRODUTCTS_FROM_API", "ADD_TO_CART"]),
    addToCart(data) {
      this.ADD_TO_CART(data);
    },
    setRange() {
      this.sortArr = [...this.PRODUCTS];
      this.sortArr = this.sortArr.filter((item) => {
        if (item.price >= this.minPrice && item.price <= this.maxPrice)
          return this.sortArr.push(item);
      });
    },
    sortBySelect(category) {
      this.sortArr = [...this.PRODUCTS];
      this.sortArr = this.sortArr.filter((item) => {
        if (item.category === category.name) {
          return this.sortArr.push(item);
        }
      });
      this.selected = category.name;
    },
    searchByInputArticle(value) {
      this.sortArr = [...this.PRODUCTS];
      /// надо делать проверку иначе будет выбивать ошибку не возможно прочитать свойство, условие должно быть значением если надо сделат поиск по input
      if (value) {
        this.sortArr = this.sortArr.filter((item) => {
          return item.article.toLowerCase().includes(value.toLowerCase());
        });
      }
    },
  },
  watch: {
    SEARCH_VALUE() {
      this.searchByInputArticle(this.SEARCH_VALUE);
    },
  },
  mounted() {
    this.GET_PRODUTCTS_FROM_API().then((response) => {
      console.log("da");
    });
  },
};
</script>

<style lang="scss">
.catalog {
  &__cart {
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
    justify-content: space-around;
    align-items: center;
  }
  .section {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
  .range-slider {
    width: 200px;
    margin: auto 16px;
    text-align: center;
    position: relative;
  }

  .range-slider svg,
  .range-slider input[type="range"] {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  input[type="range"]::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    top: 2px;
    margin-top: -7px;
  }
  .range-values {
    margin: 40px;
  }
}
</style>
