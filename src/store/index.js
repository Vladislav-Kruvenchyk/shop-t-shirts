import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    searchValue: "",
  },
  mutations: {
    SET_TO_PRODUCTS_FROM_API(state, products) {
      return (state.products = products);
    },
    SEARCH_VALUE_VUEX(state, value) {
      return (state.searchValue = value);
    },
    ADD_TO_CART_VUEX(state, product) {
      if (this.state.cart.length) {
        let ifProductNotCart = false;

        state.cart.map((item) => {
          if (item.article === product.article) {
            ifProductNotCart = true;
            item.quantity++;
          }
        });
        if (!ifProductNotCart) {
          return state.cart.push(product);
        }
      } else return state.cart.push(product);
    },
    INCREMENT_VUEX(state, index) {
      return state.cart[index].quantity++;
    },
    DECREMENT_VUEX(state, index) {
      if (state.cart[index].quantity > 1) {
        return state.cart[index].quantity--;
      }
    },
    DELETE_FROM_CART_VUEX(state, index) {
      return state.cart.splice(index, 1);
    },
  },
  actions: {
    GET_PRODUTCTS_FROM_API({ commit }) {
      return axios("http://localhost:3000/products", {
        method: "GET",
      }).then((products) => {
        commit("SET_TO_PRODUCTS_FROM_API", products.data);
      });
    },
    SEARCH_VALUE_INPUT({ commit }, value) {
      commit("SEARCH_VALUE_VUEX", value);
    },
    ADD_TO_CART({ commit }, product) {
      commit("ADD_TO_CART_VUEX", product);
    },
    DELETE_FROM_CART({ commit }, index) {
      commit("DELETE_FROM_CART_VUEX", index);
    },
    INCREMENT({ commit }, index) {
      commit("INCREMENT_VUEX", index);
    },
    DECREMENT({ commit }, index) {
      commit("DECREMENT_VUEX", index);
    },
  },
  getters: {
    PRODUCTS(state) {
      return state.products;
    },
    CART(state) {
      return state.cart;
    },
    SEARCH_VALUE(state) {
      return state.searchValue;
    },
  },
});
