<template>
  <div class="notice">
    <!-- 头部公共搜索框 -->
    <tabbar title="公告详情"></tabbar>
    <div
      style="padding: 12px;
    margin-top: 44px;
    color: #333;
    font-size: 14px;
    text-indent: 2em;"
      class="con"
      v-html="html"
    ></div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
export default {
  data() {
    return {
      html: ""
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.html = this.$route.query.detail;
  }
};
</script>