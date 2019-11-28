<!--  -->
<template>
  <div class="shoukuan">
    <navbar title="我的收款账户"></navbar>
    <van-tabs v-model="active" class="maxbox">
      <van-tab title="微信">
        <div class="box">
          <van-cell-group>
            <van-field
              v-model="wxaccount"
              required
              clearable
              label="账号"
              right-icon="question-o"
              placeholder="请输入账号/卡号"
              @click-right-icon="$toast('为保证您的财产安全，只能绑定本人实名认证的银行卡或支付宝。')"
            />
            <van-field
              v-model="wxusername"
              required
              clearable
              label="收款人"
              right-icon="question-o"
              placeholder="请输入姓名"
              @click-right-icon="$toast('为保证您的财产安全，只能绑定本人实名认证的银行卡或支付宝。')"
            />
          </van-cell-group>
        </div>
        <div class="upload">
          <p>上传收款二维码</p>
          <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" v-if="!erweima" />
          <van-image
            v-else
            width="2.5rem"
            height="2.5rem"
            fit="cover"
            :src="erweima"
            @click="xiugai"
          />
        </div>
        <div class="upload" v-show="show">
          <p>修改收款二维码</p>
          <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" />
        </div>
        <!-- 按钮 -->
        <div class="btn">
          <van-button type="primary" size="large" color="#fc4c4c" @click="queding">确定</van-button>
        </div>
      </van-tab>
      <van-tab title="支付宝">
        <div class="box">
          <van-cell-group>
            <van-field
              v-model="zfbaccount"
              required
              clearable
              label="账号"
              right-icon="question-o"
              placeholder="请输入账号/卡号"
              @click-right-icon="$toast('为保证您的财产安全，只能绑定本人实名认证的银行卡或支付宝。')"
            />
            <van-field
              v-model="zfbusername"
              required
              clearable
              label="收款人"
              right-icon="question-o"
              placeholder="请输入姓名"
              @click-right-icon="$toast('为保证您的财产安全，只能绑定本人实名认证的银行卡或支付宝。')"
            />
          </van-cell-group>
        </div>
        <div class="upload">
          <p>上传收款二维码</p>
          <van-uploader
            v-model="fileList1"
            :max-count="1"
            :after-read="afterRead1"
            v-if="!erweima1"
          />
          <van-image
            v-else
            width="2.5rem"
            height="2.5rem"
            fit="cover"
            :src="erweima1"
            @click="xiugai1"
          />
        </div>
        <div class="upload" v-show="show1">
          <p>修改收款二维码</p>
          <van-uploader v-model="fileList1" :max-count="1" :after-read="afterRead1" />
        </div>
        <!-- 按钮 -->
        <div class="btn">
          <van-button type="primary" size="large" color="#fc4c4c" @click="queding">确定</van-button>
        </div>
      </van-tab>
      <van-tab title="银行卡">
        <div class="box">
          <van-cell-group>
            <van-field
              v-model="yhaccount"
              required
              clearable
              label="账号"
              right-icon="question-o"
              placeholder="请输入账号/卡号"
              @click-right-icon="$toast('为保证您的财产安全，只能绑定本人实名认证的银行卡或支付宝。')"
            />
            <van-field
              v-model="yhusername"
              required
              clearable
              label="收款人"
              right-icon="question-o"
              placeholder="请输入姓名"
              @click-right-icon="$toast('为保证您的财产安全，只能绑定本人实名认证的银行卡或支付宝。')"
            />
            <van-field
              v-model="bankname"
              required
              clearable
              label="银行名称"
              right-icon="question-o"
              placeholder="请输入银行名称"
              @click-right-icon="$toast('为保证您的财产安全，请输入银行卡号对应的银行名称。')"
            />
          </van-cell-group>
        </div>

        <!-- 按钮 -->
        <div class="btn">
          <van-button type="primary" size="large" color="#fc4c4c" @click="queding">确定</van-button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import navbar from "@/components/navbar";
import { upload } from "../../common/js/common";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      active: "",
      wxaccount: "", //wx收款账号
      wxusername: "", //wx收款人
      zfbaccount: "", //zfb收款账号
      zfbusername: "", //zfb收款人
      yhaccount: "", //yh收款账号
      yhusername: "", //yh收款人
      bankname: "", //银行名称
      fileList: [], //wx二维码
      fileList1: [], //zfb二维码
      erweima: "", //wx二维码地址
      erweima1: "", //zfb二维码地址
      show: false,
      show1: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  components: {
    navbar
  },
  watch: {},
  //方法集合
  methods: {
    // 点击确定按钮
    queding() {
      let querys = {};
      if (this.active == 0) {
        if (!this.wxaccount.trim()) {
          this.$toast("请输入账号");
        } else if (!this.wxusername.trim()) {
          this.$toast("请输入收款人姓名");
        } else {
          querys = {
            type: 1,
            wx_account_status: 1,
            wx_account: this.wxaccount,
            wx_account_name: this.wxusername,
            wx_qrcode: this.erweima
          };
          this.submit(querys);
        }
      } else if (this.active == 1) {
        if (!this.zfbaccount.trim()) {
          this.$toast("请输入账号");
        } else if (!this.zfbusername.trim()) {
          this.$toast("请输入收款人姓名");
        } else {
          querys = {
            type: 1,
            zfb_account_status: 1,
            zfb_account: this.zfbaccount,
            zfb_account_name: this.zfbusername,
            zfb_qrcode: this.erweima1
          };
          this.submit(querys);
        }
      } else {
        if (!this.yhaccount.trim()) {
          this.$toast("请输入账号");
        } else if (!this.yhusername.trim()) {
          this.$toast("请输入收款人姓名");
        } else if (!this.bankname.trim()) {
          this.$toast("请输入银行名称");
        } else {
          querys = {
            type: 1,
            bank_account_status: 1,
            bank_account: this.yhaccount,
            bank_holder: this.yhusername,
            bank_name: this.bankname
          };
          this.submit(querys);
        }
      }
    },
    submit(querys) {
      this.axios
        .post("/api/property_administer/personalAccount", querys)
        .then(data => {
          this.$toast("设置成功");
          this.init();
        });
    },
    init() {
      this.axios
        .post("/api/property_administer/personalAccount", { type: 2 })
        .then(data => {
          if (data.wx_account_status) {
            this.wxaccount = data.wx_account;
            this.wxusername = data.wx_account_name;
            this.erweima = data.wx_qrcode;
          }
          if (data.zfb_account_status) {
            this.zfbaccount = data.zfb_account;
            this.zfbusername = data.zfb_account_name;
            this.erweima1 = data.zfb_qrcode;
          }
          if (data.bank_account_status) {
            this.yhaccount = data.bank_account;
            this.yhusername = data.bank_holder;
            this.bankname = data.bank_name;
          }
        });
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      upload(file.content, file.file.name).then(data => {
        console.log(data);
        this.erweima = data.url;
      });
    },
    afterRead1(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      upload(file.content, file.file.name).then(data => {
        console.log(data);
        this.erweima1 = data.url;
      });
    },
    // 修改收款码
    xiugai() {
      this.show = true;
    },
    xiugai1() {
      this.show1 = true;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.shoukuan {
  .maxbox {
    margin-top: 44px;
  }
  .box {
    margin-bottom: 20px;
  }
  .btn {
    padding: 10px;
    margin-top: 150px;
  }
  .upload {
    padding: 5px 20px;
    p {
      padding-bottom: 10px;
    }
  }
}
</style>