<template>
  <div class="money">
    <navbar :if_left_arrow="true" title="购物车"></navbar>
  </div>
</template>

<script>
import navbar from "@/components/navbar";
export default {
  components: {
    navbar
  },
  data() {
    return {
      active: 0,
      icon: {
        normal: "",
        active: ""
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
</style>
