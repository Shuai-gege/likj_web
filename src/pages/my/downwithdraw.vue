<template>
  <div class="recordinfo">
    <!-- 头部公共搜索框 -->
    <tabbar title="提现明细详情" v-if="!$route.query.sign_id"></tabbar>
    <div class="con">
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
        <van-cell title="提现金额" :value="query.money" />
        <van-cell title="提现类型" :value="query.currency_type==1?'余额':'奖金'" />

        <van-cell title="提现方式" v-if="query.pay_type==1" value="银行卡" />
        <van-cell title="提现方式" v-if="query.pay_type==2" value="微信" />
        <van-cell title="提现方式" v-if="query.pay_type==3" value="支付宝" />

        <van-cell title="审核状态" v-if="query.status==1" value="待审核" />
        <van-cell title="审核状态" v-if="query.status==2" value="已打款" />
        <van-cell title="审核状态" v-if="query.status==3" value="已退回" />

        <van-cell title="提现到" :value="query.bank_name" />
        <van-cell title="收款人账号" :value="query.account_number" />
        <van-cell title="创建时间" :value="query.createtime" />
        <van-cell title="审核时间" :value="query.updatetime" v-if="query.status!=1" />
      </van-cell-group>
      <div class="image">
        <p>{{query.status==3?'拒绝理由':'支付凭证'}}</p>
        <van-uploader v-model="fileList" multiple :max-count="3" v-if="query.status==1" />
        <div class="img" v-if="query.status==2">
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
        <div class="liyou" v-if="query.status==3">{{query.failure_cause}}</div>
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
import { upload } from "../../common/js/common";
import Vue from "vue";
import { ImagePreview } from "vant";

Vue.use(ImagePreview);
export default {
  data() {
    return {
      id: "", //用户id
      query: {}, //初始数据
      fileList: [], //支付凭证
      show: false, //拒绝理由
      message: "", //理由
      payImg: [] //支付凭证
    };
  },
  components: {
    tabbar
  },

  mounted() {
    this.id = this.$route.query.id; //用户id
    if (this.$route.query.sign_id) {
      // alert(111);
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
      // this.init();
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
        .post("/api/property_administer/cashInfo", {
          id: this.id
        })
        .then(data => {
          this.query = data;
          if (data.payment_voucher) {
            this.payment_voucher = data.payment_voucher.split(",");
          }
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
    // 同意2 拒绝3
    shenhe(status) {
      if (status == 3) {
        this.show = true;
      } else {
        if (this.fileList.length == 0) {
          this.$toast("请上传支付凭证");
        } else {
          console.log(this.fileList);
          // 上传图片
          this.fileList.forEach(item => {
            upload(item.content, item.file.name)
              .then(data => {
                this.payImg.push(data.url);
              })
              .then(() => {
                if (this.payImg.length == this.fileList.length) {
                  this.axios
                    .post("/api/property_administer/checkCash", {
                      id: this.query.cash_id,
                      status: 2,
                      payment_voucher: this.payImg.join(",")
                    })
                    .then(data => {
                      this.$toast("已同意");
                      this.init();
                    });
                  // this.axios
                  //   .post("/api/property_administer/sbRecharge", {
                  //     amount: this.money,
                  //     recharge_way: this.num,
                  //     recharge_type: this.num1,
                  //     payment_voucher: this.payImg.join(",")
                  //   })
                  //   .then(data => {
                  //     this.$toast("充值成功");
                  //     setTimeout(() => {
                  //       this.$router.push("/mypurse");
                  //     }, 1000);
                  //   });
                }
              });
          });
        }
      }
    },
    // 拒绝
    refuse() {
      this.show = false;
      if (!this.message.trim()) {
        this.$toast("请填写拒绝理由");
      } else {
        this.axios
          .post("/api/property_administer/checkCash", {
            id: this.query.cash_id,
            status: 3,
            failure_cause: this.message
          })
          .then(data => {
            this.$toast("已拒绝");
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.recordinfo {
  padding-top: 44px;
  .con {
    margin-top: -1px;
    .image {
      padding: 20px;
      p {
        margin-bottom: 15px;
        font-size: 14px;
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
