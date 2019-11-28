<template>
  <div class="area_agent">
    <!-- 头部公共搜索框 -->
    <!-- <tabbar title="区域代理"></tabbar> -->
    <div class="back" @click="$router.go(-1)">
      <img src="../../../image/返回.png" alt />
    </div>
    <div class="con">
      <div class="item" v-for="(item,i) in list" :key="i" @click="to_up(item.id)">
        <div class="name">{{item.title}}</div>
        <div class="info erhang">{{item.yj_info}}</div>
        <div class="money">入驻金额：{{item.open_money}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import tabbar from "../../../components/navbar";
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
      this.axios.post("/api/agent_area/agentArea").then(data => {
        this.list = data;
      });
    },
    to_up(id) {
      this.$router.push({
        path: "/up_area_agent",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.area_agent {
  background: url("../../../image/area_bg.png") center center;
  background-size: 100% 100%;
  height: 100vh;
  width: 100%;
  color: #333;
  font-size: 14px;
  position: relative;
  .back {
    position: absolute;
    left: 8px;
    top: 8px;
    width: 35px;
    height: 35px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .con {
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 20px;
    .item {
      width: 70%;
      background-color: rgb(250, 211, 140);
      margin: 10px auto 0;
      border-radius: 6px;
      padding: 5px 10px;
      text-align: center;
      .name {
        color: #fc4c4c;
        font-weight: 700;
        font-size: 22px;
      }
      .info {
        margin: 5px 0;
      }
      .money {
        color: rgb(253, 154, 6);
        font-weight: 700;
      }
    }
  }
}
</style>
