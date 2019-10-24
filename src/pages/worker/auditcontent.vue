<template>
  <div class="auditcontent">
    <div class="content">
      <div class="top">
        <van-cell title="当前状态" is-link :value="audit" />
      </div>
      <div class="touxiang flex">
        <div class="flex_l">
          <img :src="infodata.avatar" alt />
          <div style="margin-left:10px;">
            <p style="color:black">{{infodata.nickname}}</p>
            <p style="font-size:12px;">代理级别：{{infodata.level_name}}</p>
          </div>
        </div>
        <!-- <div>
          <p>未上传微信二维码</p>
        </div>-->
      </div>
      <p style="padding:5px 15px;">基本信息</p>
      <van-cell-group>
        <van-cell title="成为代理的条件" :label="infodata.level_condition" />
        <van-cell title="真实姓名" :value="infodata.truename" />
        <van-cell title="手机号码" :value="infodata.tel" />
        <van-cell title="身份证号" :value="infodata.idcard" />
        <!-- <van-cell title="地区" value="上海市 浦东新区" />
        <van-cell title="详细地址" value="康桥玥棠" />-->
        <div class="flex" style="padding:10px 30px;">
          <div>
            <van-image width="4rem" height="2.5rem" fit="cover" :src="infodata.front_card_image" />
            <p style="font-size:12px;text-align:center;">身份证正面</p>
          </div>
          <div>
            <van-image width="4rem" height="2.5rem" fit="cover" :src="infodata.back_card_image" />
            <p style="font-size:12px;text-align:center;">身份证正面</p>
          </div>
        </div>
      </van-cell-group>
      <p style="padding:5px 15px;">支付凭证</p>
      <div class="flex" style="padding:10px 30px;background:white">
        <div>
          <van-image
            v-for="(item,index) in pay"
            width="2.5rem"
            height="2.5rem"
            fit="cover"
            :src="item"
            :key="index"
          />
        </div>
      </div>
      <p style="padding:5px 15px;">其他信息</p>
      <van-cell-group>
        <van-cell title="代理级别" value="普通会员" />
      </van-cell-group>
      <p style="padding:5px 15px;">团队信息</p>
      <div style="margin-bottom:90px;">
        <div class="Logo flex">
          <p style="color:black">团队Logo</p>
          <img :src="infodata.up_agent_team_avatar" alt />
        </div>
        <van-cell-group>
          <van-cell title="团队名称" :value="infodata.up_agent_team_name" />
        </van-cell-group>
      </div>
    </div>
    <div class="flex btn">
      <div style="width:150px;margin-right:30px;" @click="shenhe(2)">
        <van-button type="primary" size="large" color="#E44B46">拒绝</van-button>
      </div>
      <div style="width:150px;" @click="shenhe(1)">
        <van-button type="primary" size="large">通过</van-button>
      </div>
    </div>
    <!-- 同意弹窗 -->
    <van-action-sheet v-model="show" title="确认通知后，充值金额将从您的货款中扣除">
      <!-- 单元格 -->
      <van-cell-group>
        <van-cell title="初始乐币" value="1000" />
        <van-cell title="我的账户余额" value="476" />
      </van-cell-group>
      <!-- 输入框 -->
      <!-- <van-cell-group>
        <van-field
          v-model="message"
          rows="2"
          autosize
          label="留言"
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
      </van-cell-group>-->
      <van-button type="primary" size="large" style="height:50px;border-radius:10px;">确认</van-button>
    </van-action-sheet>
  </div>
</template>
<script>
import navbar from "@/components/navbar";
export default {
  data() {
    return {
      id: "",
      infodata: {},
      audit: "", //审核状态
      pay: "", //分割支付凭证图片
      show: false, //弹出框
      message: "" //输入框
    };
  },
  components: {
    navbar
  },
  mounted() {
    this.id = this.$route.query.id;
    // alert(location.href);
    // alert(location.protocol + "//" + location.hostname);
    if (this.$route.query.sign_id) {
      localStorage.setItem("sign_id", this.$route.query.sign_id);
      localStorage.setItem(
        "baseURL",
        location.protocol + "//" + location.hostname
      );
    }
    if (
      !localStorage.getItem("token" + localStorage.getItem("sign_id")) &&
      !this.$route.query.token
    ) {
      // alert(33333333);
      // alert(
      //   localStorage.getItem("baseURL") +
      //     "/api/user/wxlogin?sign_id=" +
      //     localStorage.getItem("sign_id")
      // );
      location.href =
        localStorage.getItem("baseURL") +
        "/api/user/wxlogin?sign_id=" +
        localStorage.getItem("sign_id");
    } else if (
      !localStorage.getItem("token" + localStorage.getItem("sign_id")) &&
      this.$route.query.token
    ) {
      // alert(11111111111);
      // alert(this.$route.query.token);
      localStorage.setItem(
        "token" + localStorage.getItem("sign_id"),
        this.$route.query.token
      );
      this.init();
    } else if (
      localStorage.getItem("token" + localStorage.getItem("sign_id"))
    ) {
      // alert(666);
      this.init();
    }
  },
  methods: {
    init() {
      this.axios
        .post("/api/agent/inviteAgentInfo", { id: this.id })
        .then(data => {
          console.log(data);
          this.infodata = data;
          if (data.man_check_status == 1) {
            this.audit = "待审核";
          } else if (data.man_check_status == 2) {
            this.audit = "审核通过";
          } else if (data.man_check_status == 3) {
            this.audit = "审核失败";
          }
          this.pay = data.pay_proof_images.split(",");
          // this.pay = data.pay_proof_images;
        });
    },
    shenhe(type) {
      this.$toast("您拒绝了他的申请");
      this.show = true;
      this.axios
        .post("/api/agent/inviteCheck", { id: this.id, status: type })
        .then(data => {
          if (type == 1) {
            this.$toast("审核通过");
          } else {
            this.$toast("审核失败");
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.auditcontent {
  background: #f5f5f5;
  font-size: 15px;
  .van-action-sheet__header {
    color: #b7b7b7;
    font-size: 14px;
    background: #ededed;
  }
  .van-action-sheet {
    height: 300px;
    .van-button {
      display: block;
      margin: 100px auto 0;
      width: 85%;
    }
  }
  .content {
    .top {
      margin-bottom: 20px;
    }
    .touxiang {
      background: white;
      padding: 15px;
    }
    .Logo {
      background: white;
      padding: 15px;
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: 8px;
    }
  }
  .btn {
    width: 100%;
    padding: 10px 0 10px 25px;
    position: fixed;
    z-index: 2;
    bottom: 0;
    background: white;
    .van-button--primary {
      height: 30px;
      width: 120px;
      line-height: 30px;
      font-size: 14px;
    }
  }
  .van-image {
    margin: 0 5px;
  }
}
</style>