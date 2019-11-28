<template>
  <div class="recordinfo">
    <!-- 头部公共搜索框 -->
    <tabbar title="充值明细详情" v-if="!$route.query.sign_id"></tabbar>
    <div :class="{con:true,hasid:$route.query.sign_id}">
      <div style="padding:15px" class="flex_l">
        <van-image
          width="2rem"
          height="2rem"
          fit="cover"
          :src="query.user.wx_avatar"
          radius="15"
          v-if="query.user"
          style="margin-right:10px;"
        />
        <div style="font-size:14px;">
          <span
            style="display:block;margin-bottom:10px;color:#333;"
            v-if="query.user"
          >{{query.user.wx_nickname}}</span>
          <span style="font-size:12px;">
            代理等级:
            <i style="color:#fc4c4c" v-if="query.user">{{query.user.agent_name}}</i>
          </span>
        </div>
      </div>
      <van-cell-group>
        <van-cell title="充值金额" :value="query.amount" />
        <van-cell title="充值类型" :value="type" />
        <van-cell title="充值方式" :value="way" />
        <van-cell title="审核状态" :value="audit" />
        <van-cell title="创建时间" :value="query.createtime" />
        <van-cell v-if="query.status!=1" title="审核时间" :value="query.updatetime" />
        <van-cell v-if="query.status==3" title="拒绝理由" :value="query.failure_cause" class="solo" />
      </van-cell-group>
      <div class="image">
        <p>支付凭证</p>
        <van-image
          width="2.7rem"
          height="2.7rem"
          fit="cover"
          :src="item"
          v-for="(item,i) in payment_voucher"
          :key="i"
          @click="getImg(i)"
          style="margin-right:10px"
        />
      </div>
      <div style="padding:40px 20px;" class="flex" v-if="query.status==1">
        <van-button type="danger" @click="shenhe(3)">拒绝</van-button>
        <van-button type="danger" color="#07C160" @click="shenhe(2)">同意</van-button>
      </div>
      <van-overlay :show="show">
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
          >确定</van-button>
        </div>
      </van-overlay>
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
import Vue from "vue";
import { ImagePreview } from "vant";
Vue.use(ImagePreview);
export default {
  data() {
    return {
      id: "", //充值记录id
      initlist: [], //请求数据
      type: "", //充值类型
      way: "", //充值方式
      audit: "", //审核
      status: "", // 2 同意  3 拒绝
      query: {}, //该条记录
      payment_voucher: [], //付款凭证
      show: false, //拒绝理由
      message: "" //理由
    };
  },
  components: {
    tabbar
  },
  mounted() {
    if (this.$route.query.token) {
      localStorage.clear();
    }
    this.id = this.$route.query.id;
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
      !this.$route.query.token &&
      !localStorage.getItem("token_tel")
    ) {
      // alert(33333333);
      // alert(localStorage.getItem("baseURL"));

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
      localStorage.getItem("token" + localStorage.getItem("sign_id")) ||
      localStorage.getItem("token_tel")
    ) {
      // alert(666);
      this.init();
    }
  },
  methods: {
    // 充值记录
    init() {
      this.axios
        .post("/api/property_administer/rechargeInfo", {
          id: this.id
        })
        .then(data => {
          this.query = data;
          console.log(this.query);

          //支付类型
          if (data.recharge_way == 1) {
            this.type = "余额";
          } else {
            this.type = "货款";
          }
          //支付方式
          if (data.recharge_type == 1) {
            this.way = "线下支付";
          } else if (data.recharge_type == 2) {
            this.way = "微信";
          } else {
            this.way = "支付宝";
          }
          //审核状态
          if (data.status == 1) {
            this.audit = "待审核";
          } else if (data.status == 2) {
            this.audit = "已审核";
          } else {
            this.audit = "审核失败";
          }
          // 付款凭证
          this.payment_voucher = data.payment_voucher.split(",");
          console.log(this.payment_voucher);
        });
    },
    getImg(index) {
      ImagePreview({
        images: this.payment_voucher,
        showIndex: true,
        loop: true,
        startPosition: index
      });
    },
    shenhe(status) {
      this.status = status;
      if (status == 3) {
        this.show = true;
      } else {
        this.axios
          .post("/api/property_administer/checkRecharge", {
            id: this.query.recharge_id,
            status: 2
          })
          .then(data => {
            this.$toast("已同意");
            setTimeout(() => {
              this.init();
            }, 1000);
          });
      }
    },
    refuse() {
      this.show = false;
      this.axios
        .post("/api/property_administer/checkRecharge", {
          id: this.query.recharge_id,
          status: 3,
          failure_cause: this.message
        })
        .then(data => {
          this.$toast("已拒绝");
          setTimeout(() => {
            this.init();
          }, 1000);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.recordinfo {
  .con {
    padding-top: 44px;
    &.hasid {
      padding-top: 0;
    }
    .image {
      padding: 20px;
      p {
        margin-bottom: 15px;
        font-size: 14px;
      }
    }
    .van-cell.solo {
      padding: 0.26667rem 0.2rem 0.26667rem 0.42667rem;
      .van-cell__title {
        flex: 0.3;
      }
      .van-cell__value {
        text-align: left;
      }
    }
    .van-button {
      width: 100px;
      font-size: 16px;
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
}
</style>
