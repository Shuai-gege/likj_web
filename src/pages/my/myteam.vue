<template>
  <div class="myteam">
    <navbar title="我的团队"></navbar>
    <div class="content">
      <van-tabs v-model="active" sticky :offset-top="44" @click="clicktab">
        <van-tab title="我的团队">
          <div class="null" v-if="list.length==0">暂无团队</div>
          <div class="direct flex_l" v-for="(item,i) in list" :key="i">
            <img :src="item.wx_avatar" alt />
            <div class="txt">
              <div style="color:#333;margin-bottom:10px;">
                {{item.wx_nickname}}
                <p>代理等级：{{item.agent_name}}</p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="直接代理">
          <div class="null" v-if="list.length==0">暂无直接代理</div>
          <div class="direct flex_l" v-for="(item,i) in list" :key="i">
            <img :src="item.wx_avatar" alt />
            <div class="txt">
              <div style="color:#333;margin-bottom:10px;">
                {{item.wx_nickname}}
                <p>代理等级：{{item.agent_name}}</p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="间接代理">
          <div class="null" v-if="list.length==0">暂无间接代理</div>
          <div class="direct flex_l" v-for="(item,i) in list" :key="i">
            <img :src="item.wx_avatar" alt />
            <div class="txt">
              <div style="color:#333;margin-bottom:10px;">
                {{item.wx_nickname}}
                <p>代理等级：{{item.agent_name}}</p>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import navbar from "@/components/navbar";
export default {
  data() {
    return {
      active: 0, //0全部代理，1直接代理，2间接代理
      page: "1", //代理分页
      list: []
    };
  },
  components: {
    navbar
  },
  mounted() {
    this.type = this.$route.query.type;
    this.init();
  },
  methods: {
    init() {
      this.axios
        .post("/api/agent_team/myLowerLevel", {
          type: this.active + 1,
          page: this.page
        })
        .then(data => {
          this.list = data;
        });
    },
    //点击tab切换
    clicktab(name) {
      console.log(name);
      this.init();
    }
  }
};
</script>
<style lang="less" scoped>
.myteam {
  .content {
    margin-top: 46px;
    .direct {
      background: #fff;
      margin-top: 10px;
      padding: 10px;
      img {
        width: 70px;
        height: 70px;
        border-radius: 10px;
      }
      .txt {
        padding: 10px;
        font-size: 14px;
      }
    }
  }
}
</style>