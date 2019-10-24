<template>
  <div class="teamcenter">
    <navbar title="团队中心"></navbar>
    <div class="person flex_l">
      <img :src="info.avatar" alt />
      <div class="txt">
        <p style="color:#333;">
          {{info.team_name}}
          <span>（{{info.synopsis}}）</span>
        </p>
        <p>口号：{{info.slogan}}</p>
      </div>
    </div>
    <!-- 收款账户 -->
    <div class="account">
      <van-cell title="公司收款账户" is-link icon="balance-pay" to="/shoukuan" />
    </div>
    <!-- 我的上级。团队 -->
    <div class="my">
      <van-cell v-if="id" title="我的上级" is-link icon="manager-o" @click="mytop" />
      <van-cell title="我的下级" is-link icon="user-o" @click="$router.push('/myteam')" />
      <van-cell title="下级充值记录" is-link icon="after-sale" @click="$router.push('/topuplist')" />
      <van-cell
        title="下级提现记录"
        is-link
        icon="cash-back-record"
        @click="$router.push('/xiajitixianlist')"
      />
    </div>
    <!-- 团队活动 -->
    <div class="hot">
      <van-cell title="团队活动" is-link icon="smile-comment-o" @click="$router.push('/WLK')" />
      <van-cell
        v-if="!id"
        title="创建团队活动"
        is-link
        icon="smile-comment-o"
        @click="$router.push('/addWLK')"
      />
    </div>
  </div>
</template>
<script>
import navbar from "@/components/navbar";
export default {
  data() {
    return {
      id: "", //上级代理id
      info: {}
    };
  },
  components: {
    navbar
  },
  mounted() {
    this.id = Number(localStorage.getItem("agent_id"));
    this.axios.post("/api/agent_team/myAgentTeam").then(data => {
      this.info = data;
    });
  },
  methods: {
    mytop() {
      this.$router.push("/mysuperior");
    }
  }
};
</script>
<style lang="less" scoped>
::-webkit-scrollbar {
  display: none;
}
.teamcenter {
  background: #f5f5f5;
  .person {
    margin-top: 60px;
    background: #fff;
    img {
      width: 80px;
      height: 80px;
      margin: 10px;
      border-radius: 10px;
    }
    .txt {
      font-size: 14px;
    }
  }
  .account {
    margin: 15px 0;
    .van-icon-balance-pay:before {
      color: #f1506d;
      font-size: 20px;
      margin-right: 5px;
    }
  }
  .my {
    margin: 15px 0;
    .van-icon-manager-o:before {
      color: #ce8a56;
      font-size: 22px;
      margin-right: 5px;
    }
    .van-icon-user-o:before {
      color: #ce8a56;
      font-size: 22px;
      margin-right: 5px;
    }
    .van-icon-friends-o:before {
      color: #ce8a56;
      font-size: 22px;
      margin-right: 5px;
    }
  }
  .van-icon-smile-comment-o:before {
    color: #f0c751;
    font-size: 22px;
    margin-right: 5px;
  }
  .van-icon-after-sale:before {
    color: #fc4c4c;
    font-size: 22px;
    margin-right: 5px;
  }
  .van-icon-cash-back-record:before {
    color: #fc4c4c;
    font-size: 22px;
    margin-right: 5px;
  }
}
</style>