<template>
  <div class="shoukuan">
    <!-- 头部公共搜索框 -->
    <tabbar title="公司收款账户"></tabbar>
    <div class="con"></div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
export default {
  data() {
    return {
      type: "" //代理级别
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.type = this.$route.query.type;
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.shoukuan {
  padding-top: 44px;
  .con {
  }
}
</style>
