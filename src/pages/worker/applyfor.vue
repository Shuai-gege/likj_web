<template>
  <div class="shenqing">
    <div class="head1 flex_l">
      <img :src="initdata.invite_user_avatar" alt />
      <div>
        <p>{{initdata.invite_user_name}}（{{initdata.invite_user_agent_name}}）</p>
        <span>邀请你成为“{{initdata.level_name}}”</span>
      </div>
    </div>
    <div class="title">我的上级</div>
    <div class="head1 flex_l">
      <img :src="initdata.up_agent_wx_avatar" alt />
      <div>
        <p>{{initdata.up_agent_wx_nickname}}（{{initdata.up_agent_agent_name}}）</p>
      </div>
    </div>
    <div class="title" v-if="initdata.up_agent_team_name">上级团队</div>
    <div class="head1 flex_l" v-if="initdata.up_agent_team_name">
      <img :src="initdata.up_agent_team_avatar" alt />
      <div>
        <p>{{initdata.up_agent_team_name}}</p>
      </div>
    </div>
    <div class="title flex">
      <span>授权要求</span>
      <span class="flex_r" @click="shoukuan(initdata.up_agent_id)">
        查看{{initdata.up_agent_id?'上级':'公司'}}收款账号
        <van-icon name="arrow" />
      </span>
    </div>
    <div class="head1">首次充值{{initdata.money}}元</div>
    <!-- 名字 -->
    <div class="title">基本信息</div>
    <van-cell-group>
      <van-field
        v-model="username"
        clearable
        label="真实姓名"
        placeholder="请输入姓名"
        v-if="data_set.truename == 1"
      />
      <van-field
        v-model="tel"
        clearable
        label="手机号码"
        placeholder="请输入手机号"
        v-if="data_set.mobile == 1"
      />
    </van-cell-group>
    <!-- 身份证 -->
    <div class="title" v-if="data_set.id_number == 1 || data_set.id_number_pic == 1">身份信息</div>
    <van-cell-group>
      <van-field
        v-model="IDcard"
        clearable
        label="身份证号"
        placeholder="请输入身份证号"
        v-if="data_set.id_number == 1"
      />

      <div class="title" v-if="data_set.id_number_pic== 1">上传身份证正反面</div>
      <div class="shenfen flex" style="padding:5px 8px 15px 15px" v-if="initdata.truename">
        <van-image
          width="4.5rem"
          height="2.7rem"
          fit="cover"
          :src="initdata.front_card_image"
          @click="getImg1()"
          style="margin-right:10px"
          v-if="data_set.id_number_pic == 1"
        />
        <van-image
          width="4.5rem"
          height="2.7rem"
          fit="cover"
          :src="initdata.back_card_image"
          @click="getImg2()"
          style="margin-right:10px"
          v-if="data_set.id_number_pic == 1"
        />
      </div>
      <div class="upload flex" v-if="data_set.id_number_pic== 1 && !initdata.truename">
        <div class="item flex">
          <van-uploader v-model="zheng" :after-read="afterRead2" :max-count="1" />
          <img :src="zheng" alt />
          <span>国徽面</span>
        </div>
        <div class="item flex">
          <van-uploader v-model="fan" :after-read="afterRead1" :max-count="1" />
          <img :src="fan" alt />
          <span>头像面</span>
        </div>
      </div>
    </van-cell-group>
    <!-- 支付凭证 -->
    <div class="title flex" v-if="data_set.payment_voucher == 1">
      <span>支付凭证</span>
      <span class="flex_r" @click="shoukuan(initdata.up_agent_id)">
        查看{{initdata.up_agent_id?'上级':'公司'}}收款账号
        <van-icon name="arrow" />
      </span>
    </div>
    <van-cell-group>
      <div class="pay" style="padding:15px;" v-if="initdata.truename">
        <van-image
          width="2.7rem"
          height="2.7rem"
          fit="cover"
          :src="item"
          v-for="(item,i) in payImg"
          :key="i"
          @click="getImg3(i)"
          style="margin-right:10px"
        />
      </div>
      <div class="upload1 flex" v-if="data_set.payment_voucher == 1 && !initdata.truename">
        <div class="item flex">
          <div class="uppay flex">
            <van-uploader v-model="pay1" :max-count="1" :after-read="afterRead3" />
            <van-uploader v-model="pay2" :max-count="1" :after-read="afterRead4" />
            <van-uploader v-model="pay3" :max-count="1" :after-read="afterRead5" />
          </div>
          <span>支付凭证（最多三张）</span>
        </div>
      </div>
    </van-cell-group>
    <van-button v-if="!initdata.truename" type="primary" size="large" @click="submit">申请授权</van-button>
  </div>
</template>
<script>
import areaList from "../../common/js/newArea";
import { upload } from "../../common/js/common";
import Vue from "vue";
import { ImagePreview } from "vant";
Vue.use(ImagePreview);
export default {
  data() {
    return {
      id: "",
      username: "",
      tel: "",
      IDcard: "",
      initdata: {},
      zheng: [], //身份证
      fan: [], //身份证
      pay1: [], //支付凭证
      pay2: [], //支付凭证
      pay3: [], //支付凭证
      payImg: [], //支付凭证
      data_set: "" //判断有没有
    };
  },

  mounted() {
    if (this.$route.query.token) {
      localStorage.clear();
    }
    this.id = this.$route.query.id;
    // alert(location.href);
    if (this.$route.query.sign_id) {
      // alert(111);
      localStorage.setItem("sign_id", this.$route.query.sign_id);
    }
    // localStorage.setItem(
    //   "baseURL",
    //   location.protocol + "//" + location.hostname
    // );
    if (
      !localStorage.getItem("token" + localStorage.getItem("sign_id")) &&
      !this.$route.query.token
    ) {
      // alert(33333333);
      // alert(localStorage.getItem("baseURL"));
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
          this.initdata = data;
          this.data_set = data.data_set;
          // 判断姓名
          if (data.truename) {
            this.username = data.truename;
          }
          //判断手机号
          if (data.tel) {
            this.tel = data.tel;
          }
          // 判断身份证
          if (data.idcard) {
            this.IDcard = data.idcard;
          }
          // 支付凭证
          if (data.pay_proof_images) {
            this.payImg = data.pay_proof_images.split(",");
          }
        });
    },
    afterRead1() {
      upload(this.fan[0].content, this.fan[0].file.name).then(data => {
        this.back_card_image = data.url;
      });
    },
    afterRead2() {
      upload(this.zheng[0].content, this.zheng[0].file.name).then(data => {
        this.front_card_image = data.url;
      });
    },
    afterRead3() {
      upload(this.pay1[0].content, this.pay1[0].file.name).then(data => {
        this.img1 = data.url;
        console.log(this.img1);
      });
    },
    afterRead4() {
      upload(this.pay2[0].content, this.pay2[0].file.name).then(data => {
        this.img2 = data.url;
      });
    },
    afterRead5() {
      upload(this.pay3[0].content, this.pay3[0].file.name).then(data => {
        this.img3 = data.url;
      });
    },
    submit() {
      if (!this.username.trim() && this.data_set.truename == 1) {
        this.$toast("请输入姓名");
      } else if (
        !/^1[3456789]\d{9}$/.test(this.tel) &&
        this.data_set.mobile == 1
      ) {
        this.$toast("请输入正确的手机号");
      } else if (!this.IDcard.trim() && this.data_set.id_number == 1) {
        this.$toast("请输入身份证号");
      } else if (this.zheng.length == 0 && this.data_set.id_number_pic == 1) {
        this.$toast("请上传身份证正面");
      } else if (this.fan.length == 0 && this.data_set.id_number_pic == 1) {
        this.$toast("请上传身份证反面");
      } else if (
        this.data_set.payment_voucher == 1 &&
        !this.img1 &&
        !this.img2 &&
        !this.img3
      ) {
        console.log(2222);

        this.$toast("请上传支付凭证");
      } else {
        console.log(11111111111111111111);
        // 上传图片
        console.log(this.front_card_image);
        console.log(this.back_card_image);
        let arr = [this.img1, this.img2, this.img3];
        this.payImg = arr.filter(item => {
          return item;
        });
        this.axios
          .post("/api/agent/sbinviteAgent", {
            id: this.id,
            name: this.username,
            tel: this.tel,
            idcard: this.IDcard,
            front_card_image: this.front_card_image,
            back_card_image: this.back_card_image,
            pay_proof_images: this.payImg.join(","),
            user_type: "1"
          })
          .then(data => {
            this.$toast("申请成功，请耐心等待审核通过");
            setTimeout(() => {
              this.init();
            }, 1000);
          });
      }
    },
    // 查看收款账户
    shoukuan(id) {
      if (id) {
        this.$router.push({
          path: "/myshoukuanxinxi",
          query: {
            type1: 2,
            id: id
          }
        });
      } else {
        this.$router.push({
          path: "/shoukuan"
        });
      }
    },
    getImg1() {
      ImagePreview({
        images: [this.initdata.front_card_image],
        showIndex: true,
        loop: true,
        startPosition: 0
      });
    },
    getImg2() {
      ImagePreview({
        images: [this.initdata.back_card_image],
        showIndex: true,
        loop: true,
        startPosition: 0
      });
    },
    getImg3(i) {
      ImagePreview({
        images: this.payImg,
        showIndex: true,
        loop: true,
        startPosition: i
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
  .upload,
  .upload1 {
    padding: 10px 15px;
    .item {
      flex-direction: column;
      span {
        color: #999;
        font-size: 12px;
      }
    }
  }
  .upload {
    /deep/.van-uploader__upload {
      width: 160px;
      height: 100px;
    }
    /deep/.van-uploader__preview-image {
      width: 160px;
      height: 100px;
    }
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
    width: 85%;
  }
}
</style>
