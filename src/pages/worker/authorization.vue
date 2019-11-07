<template>
  <div class="auditcontent">
    <navbar title="审核授权" v-if="!$route.query.sign_id"></navbar>
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
        <van-cell title="成为代理的条件" :label="'首次充值'+infodata.money" />
        <van-cell title="真实姓名" :value="infodata.truename" />
        <van-cell title="手机号码" :value="infodata.tel" />
        <van-cell title="身份证号" :value="infodata.idcard" />
        <!-- <van-cell title="地区" value="上海市 浦东新区" />
        <van-cell title="详细地址" value="康桥玥棠" />-->
        <div class="flex" style="padding:10px 30px;">
          <div>
            <van-image
              width="4rem"
              height="2.5rem"
              fit="cover"
              :src="infodata.front_card_image"
              @click="getImg1()"
            />
            <p style="font-size:12px;text-align:center;">身份证正面</p>
          </div>
          <div>
            <van-image
              width="4rem"
              height="2.5rem"
              fit="cover"
              :src="infodata.back_card_image"
              @click="getImg2()"
            />
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
            @click="getImg3(index)"
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
    <div class="flex btn" v-if="infodata.man_check_status==1">
      <div style="width:150px;margin-right:30px;" @click="shenhe(2)">
        <van-button type="primary" size="large" color="#fc4c4c">拒绝</van-button>
      </div>
      <div style="width:150px;" @click="shenhe(1)">
        <van-button type="primary" size="large" color="#3DAC6A">通过</van-button>
      </div>
    </div>
    <!-- 同意弹窗 -->
    <van-action-sheet v-model="show1" title="确认通知后，充值金额将从您的余额中扣除">
      <!-- 单元格 -->
      <van-cell-group>
        <van-cell title="首次充值" :value="infodata.money" />
        <van-cell title="我的账户余额" :value="yue" />
      </van-cell-group>
      <van-button
        type="primary"
        size="large"
        style="border-radius:10px;"
        color="#fc4c4c"
        @click="agree"
      >确认</van-button>
    </van-action-sheet>
    <!-- 拒绝 -->
    <van-overlay :show="show2" style="z-index:99">
      <div class="box">
        <van-cell-group style="margin:10px;">
          <van-field
            v-model="message"
            rows="2"
            autosize
            label="拒绝理由"
            type="textarea"
            maxlength="75"
            placeholder="请输入拒绝理由"
            show-word-limit
          />
        </van-cell-group>
        <van-button
          type="danger"
          size="small"
          @click="refuse"
          style="margin:30px auto;display:block;"
          color="blue"
        >确定</van-button>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import navbar from "@/components/navbar";
import Vue from "vue";
import { ImagePreview } from "vant";
Vue.use(ImagePreview);
export default {
  data() {
    return {
      id: "",
      infodata: {},
      yue: "", //上级余额
      audit: "", //审核状态
      pay: "", //分割支付凭证图片
      show1: false, //同意弹窗
      show2: false, //拒绝弹窗
      message: "" //拒绝理由
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
        });
      // 获取用户余额
      this.axios.post("/api/user/index").then(data => {
        this.yue = data.money;
      });
    },
    shenhe(type) {
      if (type == 1) {
        this.show1 = true;
      } else {
        this.show2 = true;
      }
    },
    agree() {
      if (parseFloat(this.infodata.money) > parseFloat(this.yue)) {
        this.$toast("余额不足");
      } else {
        this.axios
          .post("/api/agent/inviteCheck", { id: this.id, status: 1 })
          .then(data => {
            this.$toast("审核通过");
            this.show1 = false;
            setTimeout(() => {
              this.init();
            }, 1000);
          });
      }
    },
    refuse() {
      if (!this.message.trim()) {
        this.$toast("请输入拒绝理由");
      } else {
        this.axios
          .post("/api/agent/inviteCheck", {
            id: this.id,
            status: 2,
            failure_cause: this.message
          })
          .then(data => {
            this.$toast("审核失败");
            this.show2 = false;
            setTimeout(() => {
              this.init();
            }, 1000);
          });
      }
    },
    getImg1() {
      ImagePreview({
        images: [this.infodata.front_card_image],
        showIndex: true,
        loop: true,
        startPosition: 0
      });
    },
    getImg2() {
      ImagePreview({
        images: [this.infodata.back_card_image],
        showIndex: true,
        loop: true,
        startPosition: 0
      });
    },
    getImg3(i) {
      ImagePreview({
        images: this.pay,
        showIndex: true,
        loop: true,
        startPosition: i
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
    color: #999;
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
      height: 40px;
      width: 120px;
      line-height: 30px;
      font-size: 14px;
    }
  }
  .van-image {
    margin: 0 5px;
  }
  .box {
    position: absolute;
    background-color: #fff;
    width: 80%;
    height: 45%;
    margin: 50% 10%;
    border-radius: 10px;
    font-size: 16px;
    color: #333;
  }
}
</style>