<template>
  <div class="shenqing">
    <navbar title="升级详情"></navbar>
    <div style="margin-top:44px;">
      <div class="head1 flex_l">
        <img :src="initdata.user_avatar" alt />
        <div>
          <p>{{initdata.user_name}}（{{initdata.user_agent_name}}）</p>
          <span>申请升级为“{{name}}”</span>
        </div>
      </div>
      <div class="title">我的上级</div>
      <div class="head1 flex_l">
        <img :src="initdata.up_user_avatar" alt />
        <div>
          <p>
            {{initdata.up_user_name}}
            <i
              v-if="initdata.up_user_agent_name"
            >（{{initdata.up_user_agent_name}}）</i>
            <i v-else>（品牌方）</i>
          </p>
          <!-- <span>邀请你成为“{{initdata.level_name}}”</span> -->
        </div>
      </div>
      <div class="title">团队信息</div>
      <div class="head1 flex_l">
        <img :src="initdata.team_avatar" alt />
        <div>
          <p>{{initdata.team_name}}</p>
        </div>
      </div>
      <!-- 升级后的信息 -->
      <div v-if="initdata.new_up_user_agent_name == ''">
        <div class="title">
          升级为
          <i style="color:#fc4c4c">{{name}}</i> 后我的上级
        </div>
        <div class="head1 flex_l">
          <img :src="initdata.new_up_user_avatar	" alt />
          <div>
            <p>
              {{initdata.new_up_user_name}}
              <i
                v-if="initdata.new_up_user_agent_name"
              >（{{initdata.new_up_user_agent_name}}）</i>
              <i v-else>（品牌方）</i>
            </p>
            <!-- <span>邀请你成为“{{initdata.level_name}}”</span> -->
          </div>
        </div>
        <div class="title">
          升级为
          <i style="color:#fc4c4c">{{name}}</i> 后团队
        </div>
        <div class="head1 flex_l">
          <img :src="initdata.new_team_avatar" alt />
          <div>
            <p>{{initdata.new_team_name}}</p>
          </div>
        </div>
      </div>
    </div>
    <van-button type="primary" size="large" @click="submit">确认升级</van-button>
  </div>
</template>
<script>
import navbar from "../../components/navbar";
import areaList from "../../common/js/newArea";
import { upload } from "../../common/js/common";
export default {
  data() {
    return {
      id: "",
      tel: "",
      // areaList,
      IDcard: "",
      initdata: {},
      upgrade_level_id: "", //代理等级id
      name: "" //申请升级的等级
    };
  },
  components: {
    navbar
  },
  mounted() {
    this.upgrade_level_id = this.$route.query.id;
    this.name = this.$route.query.name;
    this.init();
  },
  methods: {
    init() {
      this.axios
        .post("/api/upgrade/upgradeInfo", {
          upgrade_level_id: this.upgrade_level_id
        })
        .then(data => {
          this.initdata = data;
        });
    },
    submit() {
      this.axios
        .post("/api/upgrade/applyUpgrade", {
          upgrade_level_id: this.upgrade_level_id
        })
        .then(data => {
          this.$router.push({
            path: "/updateRecord"
            // query: {
            //   id: id
            // }
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.shenqing {
  background: #f5f5f5;
  min-height: 100vh;
  color: #333;
  font-size: 14px;
  padding-bottom: 30px;
  .title {
    font-weight: normal;
    color: #666;
    font-size: 13px;
    margin: 8px 12px;
  }

  .head1 {
    background-color: #fff;
    padding: 10px;
    img {
      width: 70px;
      height: 70px;
      margin-right: 12px;
      border-radius: 5px;
    }
    span {
      display: block;
      margin-top: 10px;
      color: #999;
      font-size: 13px;
    }
  }
  .van-button {
    display: block;
    margin: 30px auto 0;
    width: 92%;
  }
}
</style>
