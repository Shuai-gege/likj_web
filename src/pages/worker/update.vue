<template>
  <div class="update">
    <!-- 头部公共搜索框 -->
    <tabbar title="我要升级" navbar_right_name="记录" navbar_right_link="/updateRecord"></tabbar>
    <div class="con">
      <div class="item flex" v-for="(item,i) in list" :key="i">
        <div class="left">
          <p>{{item.agent_name}}</p>
          <span class="money">{{item.level_conditions}}</span>
        </div>
        <van-button
          type="danger"
          :disabled="item.weigh<=item.user_weigh"
          @click="update(item.agent_level_id,item.agent_name)"
        >申请升级</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
export default {
  data() {
    return {
      flag: false,
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
      this.axios.post("/api/upgrade/getAgentLevel").then(data => {
        this.list = data;
      });
    },
    update(id, name) {
      this.$router.push({
        path: "/updateDetail",
        query: {
          id,
          name
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.update {
  padding-top: 44px;
  background-color: #f5f5f5;
  min-height: 100vh;
  font-size: 16px;
  color: #333;
  .con {
    margin-top: -1px;
    padding: 10px 12px;
    .item {
      background-color: #fff;
      border-radius: 5px;
      padding: 20px 10px;
      margin-bottom: 10px;
      .left {
        flex: 1;
      }
      p {
        margin-bottom: 5px;
      }
      .money {
        font-size: 14px;
        color: rgb(247, 135, 8);
      }
      button {
        width: 90px;
        margin-left: 10px;
      }
    }
  }
}
</style>
