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
        <!-- <span>邀请你成为“{{initdata.level_name}}”</span> -->
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
    <div class="head1">{{initdata.level_condition}}</div>
    <div class="title">基本信息</div>
    <van-cell-group>
      <van-field v-model="username" clearable label="真实姓名" placeholder="请输入姓名" />
      <van-field v-model="tel" clearable label="手机号码" placeholder="请输入手机号" />
      <!-- <van-field v-model="area" clearable label="地区" placeholder="请选择地区" @click="showArea=true" />
      <van-field v-model="address" clearable label="详细地址" placeholder="街道门牌信息" />-->
    </van-cell-group>
    <div class="title">身份信息</div>
    <van-cell-group>
      <van-field v-model="IDcard" clearable label="身份证号" placeholder="请输入身份证号" />
      <div class="title">上传身份证正反面</div>
      <div class="upload flex">
        <div class="item flex">
          <van-uploader v-model="fan" :after-read="afterRead1" :max-count="1" />
          <img :src="fan" alt />
          <span>头像面</span>
        </div>
        <div class="item flex">
          <van-uploader v-model="zheng" :after-read="afterRead2" :max-count="1" />
          <img :src="zheng" alt />
          <span>国徽面</span>
        </div>
      </div>
    </van-cell-group>
    <div class="title flex">
      <span>支付凭证</span>
      <!-- <span class="flex_r" @click="$router.push('/shoukuan')">
        查看公司收款账号
        <van-icon name="arrow" />
      </span>-->
    </div>
    <van-cell-group>
      <div class="upload1 flex">
        <div class="item flex">
          <van-uploader v-model="fileList" multiple :max-count="3" :after-read="afterRead3" />
          <span>支付凭证（最多三张）</span>
        </div>
      </div>
    </van-cell-group>
    <van-button type="primary" size="large" @click="submit">申请授权</van-button>
    <!-- 地区弹窗 -->
    <!-- <van-action-sheet v-model="showArea">
      <van-area :area-list="areaList" @confirm="confirmArea" />
    </van-action-sheet>-->
  </div>
</template>
<script>
import areaList from "../../common/js/newArea";
import { upload } from "../../common/js/common";
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
      fileList: [] //支付凭证
    };
  },

  mounted() {
    this.id = this.$route.query.id;
    alert(location.href);
    if (this.$route.query.sign_id) {
      alert(111);
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
      alert(33333333);

      location.href =
        localStorage.getItem("baseURL") +
        "/api/user/wxlogin?sign_id=" +
        localStorage.getItem("sign_id");
    } else if (
      !localStorage.getItem("token" + localStorage.getItem("sign_id")) &&
      this.$route.query.token
    ) {
      alert(11111111111);
      alert(this.$route.query.token);
      localStorage.setItem(
        "token" + localStorage.getItem("sign_id"),
        this.$route.query.token
      );
      this.init();
    } else if (
      localStorage.getItem("token" + localStorage.getItem("sign_id"))
    ) {
      alert(666);
      this.init();
    }
  },
  methods: {
    init() {
      this.axios
        .post("/api/agent/inviteAgentInfo", { id: this.id })
        .then(data => {
          this.initdata = data;
          // 判断姓名
          this.username = data.truename;
          //判断手机号
          this.tel = data.tel;
          // 判断身份证
          this.IDcard = data.idcard;
          // 身份证照片
          if (!data.front_card_image) {
            this.zheng = [];
          } else {
            this.zheng = [{ url: data.front_card_image }];
          }
          if (!data.back_card_image) {
            this.fan = [];
          } else {
            this.fan = [{ url: data.back_card_image }];
          }
          // 支付凭证
          data.pay_proof_images.split(",").forEach(item => {
            this.fileList.push({ url: item });
          });
        });
    },
    // 选择地区点击确定
    // confirmArea(area) {
    //   console.log(11111);
    //   this.area = area[0].name + " " + area[1].name + " " + area[2].name;
    //   // this.showArea = false;
    // },
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
      console.log(this.fileList);
      let payimg = [];
      this.fileList.forEach(item => {
        upload(item.content, item.file.name).then(data => {
          payimg.push(data.url);
          if (payimg.length == this.fileList.length) {
            console.log(payimg);
            this.pay_proof_images = payimg;
          }
        });
      });
    },
    submit() {
      if (!this.username.trim()) {
        this.$toast("请输入姓名");
      } else if (!/^1[3456789]\d{9}$/.test(this.tel)) {
        this.$toast("请输入正确的手机号");
      } else if (!this.IDcard.trim()) {
        this.$toast("请输入身份证号");
      } else if (this.zheng.length == 0) {
        this.$toast("请上传身份证正面");
      } else if (this.fan.length == 0) {
        this.$toast("请上传身份证反面");
      } else if (this.fileList.length == 0) {
        this.$toast("请上传支付凭证");
      } else {
        this.axios
          .post("/api/agent/sbinviteAgent", {
            id: this.id,
            name: this.username,
            tel: this.tel,
            idcard: this.IDcard,
            front_card_image: this.front_card_image,
            back_card_image: this.back_card_image,
            pay_proof_images: this.pay_proof_images.join(",")
          })
          .then(data => {
            this.$toast("申请成功，请耐心等待审核通过");
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
