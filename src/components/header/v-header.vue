<template>
  <div class="header">
    <img src="../../assets/logo.png" alt="" />
    <div class="heade__content">
      <input type="text" v-model.number="searchValue" />
      <button class="btn" @click="search(searchValue)">search</button>
      <button class="btn" @click="clear">clear</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "vHeader",
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    ...mapActions(["SEARCH_VALUE_INPUT"]),
    search(value) {
      this.SEARCH_VALUE_INPUT(value);
      if (this.$route.path != "/catalog") {
        this.$router.push("/catalog");
      }
    },
    clear() {
      this.searchValue = "";
      this.SEARCH_VALUE_INPUT();
      if (this.$route.path != "/catalog") {
        this.$router.push("/catalog");
      }
    },
  },
};
</script>

<style lang="scss">
.header {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #789;

  &__content {
    display: flex;
  }
  input {
    padding: 10px;
    border-radius: 10px;
    outline: none;
    border: none;
  }
  img {
    width: 100px;
    height: 100px;
  }
}
</style>
