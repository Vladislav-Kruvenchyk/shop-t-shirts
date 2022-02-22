<template>
  <div class="wrapper">
    <vHeader />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import vHeader from "./header/v-header.vue";
export default {
  name: "vWrapper",
  components: { vHeader },
};
</script>

<style></style>
