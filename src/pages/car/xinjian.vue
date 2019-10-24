<template>
  <div class="shoukuan">
    <!-- 头部公共搜索框 -->
    <tabbar title="公司收款账户"></tabbar>
    <div class="con">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="0"
        @load="onLoad"
        loading-text="你瞧瞧"
      >
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.type = this.$route.query.type;
  },
  methods: {
    onLoad() {
      console.log("aaa");
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= 50) {
          this.finished = true;
        }
      }, 500);
    }
  }
};
</script>

<style lang="less" scoped>
.shoukuan {
  padding-top: 44px;
  .con {
  }
}
</style>
