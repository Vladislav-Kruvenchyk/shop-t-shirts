<template>
  <div class="select" @click="ifSelectOptionHidde = !ifSelectOptionHidde">
    <span>{{ selected }}</span>
    <div class="select__options" v-if="ifSelectOptionHidde">
      <p
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "vSelect",
  props: {
    selected: {
      type: String,
      default: "",
    },
    options: {
      type: [Array, Object],
      default: null,
    },
  },
  data() {
    return {
      ifSelectOptionHidde: false,
    };
  },
  methods: {
    selectOption(option) {
      this.$emit("selectOption", option);
    },
    hidden() {
      this.ifSelectOptionHidde = false;
    },
  },
};
</script>

<style lang="scss">
.select {
  position: absolute;
  top: 120px;
  left: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  padding: 10px;
  margin: 16px;
  border: 2px solid #788;
  cursor: pointer;
  &__options {
    position: absolute;
    left: -2px;
    top: 45px;
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid #788;
  }
  p {
    width: 100%;
    padding: 3px;
  }
  p:hover {
    background: #788;
  }
}
</style>
