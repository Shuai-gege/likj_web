<template>
  <div class="agentType">
    <!-- 头部公共搜索框 -->
    <tabbar title="选择代理等级"></tabbar>
    <div class="con">
      <div class="title">可推荐代理列表</div>
      <van-radio-group v-model="radio1">
        <van-cell-group v-for="(item,i) in recommend_list" :key="i">
          <van-cell :title="item.agent_name" clickable @click="select(1,i+'1',item.agent_level_id)">
            <van-radio slot="right-icon" :name="i+'1'" checked-color="rgb(247, 81, 81)" />
          </van-cell>
          <van-cell class="solo" :value="item.upgrade_condition" />
        </van-cell-group>
      </van-radio-group>
      <div class="title">可发展代理列表</div>
      <van-radio-group v-model="radio2">
        <van-cell-group v-for="(item,i) in develop_list" :key="i">
          <van-cell :title="item.agent_name" clickable @click="select(2,i+'1',item.agent_level_id)">
            <van-radio slot="right-icon" :name="i+'1'" checked-color="rgb(247, 81, 81)" />
          </van-cell>
          <van-cell class="solo" :value="item.upgrade_condition" />
        </van-cell-group>
      </van-radio-group>
      <van-button size="large" color="rgb(238, 97, 97)" class="button" @click="toinvite">确定</van-button>
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
export default {
  data() {
    return {
      radio1: 0,
      radio2: 0,
      level_id: null, //代理ID
      recommend_list: [],
      develop_list: []
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
      this.axios.post("/api/agent/developAgent").then(data => {
        this.recommend_list = data.recommend_list;
        this.develop_list = data.develop_list;
      });
    },
    // 点击单选框
    select(type, i, id) {
      this.level_id = id;
      if (type == 1) {
        this.radio1 = i;
        this.radio2 = 0;
      } else {
        this.radio1 = 0;
        this.radio2 = i;
      }
    },
    toinvite() {
      if (!this.level_id) {
        this.$toast("请选择代理等级");
      } else {
        this.$router.push({
          path: "/inviteagent",
          query: {
            level_id: this.level_id
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.agentType {
  .con {
    margin-top: 44px;
    .title {
      padding: 15px 12px;
      // background-image: linear-gradient(160deg, #16222a 20%, #3a6073 80%);
      background-color: #f5f5f5;
      color: #333;
      font-weight: 700;
      font-size: 16px;
    }
    span {
      font-size: 16px;
    }
    .solo {
      margin-top: -6px;
      padding: 0px 15px 15px;
      font-weight: normal;
      span {
        color: rgb(252, 144, 21);
        font-size: 14px;
      }
    }
    .button {
      margin: 50px auto;
      width: 90%;
      display: block;
    }
  }
}
</style>

