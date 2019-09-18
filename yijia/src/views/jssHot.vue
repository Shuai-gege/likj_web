<template>
  <div class="box">
    <!-- 搜索框 -->
    <form action="/" class="SouSuo">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        background="#90d7ec"
        shape="round"
      />
    </form>
    <p>我是热卖商品</p>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="stylus" scoped></style>