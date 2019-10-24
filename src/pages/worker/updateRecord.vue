<template>
  <div class="record">
    <!-- 头部公共搜索框 -->
    <tabbar title="升级记录"></tabbar>
    <div class="con">
      <van-cell-group v-for="(item,i) in list" :key="i">
        <van-cell :title="item.agent_name" v-if="item.status==0" value="待审核" class="solo" />
        <van-cell :title="item.agent_name" v-if="item.status==1" value="已通过" class="solo" />
        <van-cell :title="item.agent_name" v-if="item.status==2" value="未通过" class="solo" />
        <van-cell
          style="margin-top:-10px;color:#999;"
          :title="'申请时间：'+item.createtime"
          :value="item.status==1?'到期时间：'+item.endtime:''"
        />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
export default {
  data() {
    return {
      list: []
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.axios.post("/api/upgrade/upgradeLog").then(data => {
        this.list = data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.record {
  .con {
    margin-top: 44px;

    .solo {
      .van-cell__title {
        color: #333;
        font-size: 16px;
      }
      .van-cell__value {
        color: rgb(238, 71, 71);
      }
    }
  }
}
</style>
