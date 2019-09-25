<template>
  <div id="app">
    <router-view />
    <footbar v-if="$route.meta.ifShow_Footbar" />
  </div>
</template>

<script>
import footbar from "@/components/footbar";
import "@/common/css/common.css";
export default {
  name: "App",
  components: {
    footbar
  }
};
</script>

<style>
</style>
