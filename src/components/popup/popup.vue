<template>
  <div class="popup" ref="popup">
    <div class="popup__wrapper">
      <div class="popup__header">
        <span>{{ popupHeader }}</span>
      </div>
      <div class="popup__content">
        <slot></slot>
      </div>
      <div class="popup__footer">
        <button class="btn" @click="close">close</button>
        <button class="btn" @click="addToCart">add</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "vPopup",
  props: {
    popupHeader: {
      type: String,
      default: "",
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    addToCart() {
      this.$emit("addToCart");
    },
  },
  mounted() {
    document.addEventListener("click", (item) => {
      if (item.target === this.$refs["popup"]) return this.close();
    });
  },
};
</script>

<style lang="scss">
.popup {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  &__wrapper {
    display: flex;
    width: 400px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__footer {
    display: flex;
  }
}
</style>
