<template>
  <div class="detail">
    <navbar title="推荐奖金"></navbar>
    <div class="box">
      <van-tabs v-model="active" @click="onClick">
        <van-tab title="平推奖">
          <div class="null" v-if="list.length==0">暂无平推记录</div>
          <div class="flex minxi" v-for="(item,i) in list" :key="i">
            <div>
              <p style="font-size:13px;margin-bottom:10px;color:black;">{{item.msg}}</p>
              <p style="font-size:13px;color:#CDC9C9;">
                <span>{{item.createtime}}</span>
              </p>
            </div>
            <div style="font-size:14px;color:#fc4c4c">
              <p style="font-size:13px;" v-if="item.audit_status==1">待审核</p>
              <p style="font-size:13px;" v-if="item.audit_status==2">审核通过</p>
              <p style="font-size:13px;" v-if="item.audit_status==3">审核失败</p>
              <p>{{item.bonus_money}}</p>
            </div>
          </div>
        </van-tab>
        <van-tab title="跨级奖">
          <div class="null" v-if="list.length==0">暂无跨级推荐记录</div>
          <div class="flex minxi" v-for="(item,i) in list" :key="i">
            <div>
              <p style="font-size:13px;margin-bottom:10px;color:black;">{{item.msg}}</p>
              <p style="font-size:13px;color:#CDC9C9;">
                <span>{{item.createtime}}</span>
              </p>
            </div>
            <div style="font-size:14px;color:#fc4c4c">
              <p style="font-size:13px;" v-if="item.audit_status==1">待审核</p>
              <p style="font-size:13px;" v-if="item.audit_status==2">审核通过</p>
              <p style="font-size:13px;" v-if="item.audit_status==3">审核失败</p>
              <p>{{item.bonus_money}}</p>
            </div>
          </div>
        </van-tab>
        <van-tab title="发展奖">
          <div class="null" v-if="list.length==0">暂无发展奖</div>
          <div class="flex minxi" v-for="(item,i) in list" :key="i">
            <div>
              <p style="font-size:13px;margin-bottom:10px;color:black;">{{item.msg}}</p>
              <p style="font-size:13px;color:#CDC9C9;">
                <span>{{item.createtime}}</span>
              </p>
            </div>
            <div style="font-size:14px;color:#fc4c4c">
              <p style="font-size:13px;" v-if="item.audit_status==1">待审核</p>
              <p style="font-size:13px;" v-if="item.audit_status==2">审核通过</p>
              <p style="font-size:13px;" v-if="item.audit_status==3">审核失败</p>
              <p>{{item.bonus_money}}</p>
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
      active: 0, //类型1平推奖2跨级奖3发展奖
      page: 1,
      list: []
    };
  },
  components: {
    navbar
  },
  methods: {
    // 奖金
    init() {
      this.axios
        .post("/api/agent/agentDetail", {
          page: this.page,
          type: Number(this.active) + 1
        })
        .then(data => {
          this.list = data;
        });
    },
    onClick(name, title) {
      this.active = name;
      this.init();
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.detail {
  font-size: 14px;
  background: #fff;
  .yue {
    margin: 55px 0 15px 0;
    padding: 20px;
    background: #fff;
  }
  .box {
    margin-top: 44px;
    /deep/.van-tabs--card > .van-tabs__wrap {
      margin-top: 5px;
    }
    .minxi {
      padding: 10px 20px;
      background: #fff;
      margin-bottom: 1px;
    }
  }
}
</style>