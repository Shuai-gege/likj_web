<template>
  <div id="app">
    <router-view />
    <footbar v-if="$route.meta.ifShow_Footbar" />
  </div>
</template>

<script>
import footbar from "@/components/footbar";
import "@/common/css/common.css";

import axios from "@/common/js/axios";
export default {
  name: "App",
  components: {
    footbar
  },
  mounted() {
    axios.post("/api/user/index").then(data => {
      document.title = data.app_name;
    });
  }
};
</script>

<style>
</style>
