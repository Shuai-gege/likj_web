<!--  -->
<template>
  <div class="shoukuan">
    <navbar title="收款账户设置"></navbar>
    <div class="box">
      <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" />
      <van-field v-model="type" required label="收款类型" disabled @click="xuanze" />
      <van-cell-group>
        <van-field
          v-model="account"
          required
          clearable
          label="账号"
          right-icon="question-o"
          placeholder="请输入账号/卡号"
          @click-right-icon="$toast('为保证您的财产安全，只能绑定本人实名认证的银行卡或支付宝。')"
        />
        <van-field
          v-model="username"
          required
          clearable
          label="收款人"
          right-icon="question-o"
          placeholder="请输入姓名"
          @click-right-icon="$toast('为保证您的财产安全，只能绑定本人实名认证的银行卡或支付宝。')"
        />
        <van-field
          v-if="type=='银行卡'"
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
    <div class="upload" v-if="type!='银行卡'">
      <p>上传收款二维码</p>
      <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" />
    </div>
    <!-- 短信验证 -->
    <!-- <van-cell-group>
      <van-field v-model="username1" required clearable label="手机号" placeholder="请输入用户名" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <van-button slot="button" size="small" type="primary" color="#FC4C4C">发送验证码</van-button>
      </van-field>
    </van-cell-group>-->
    <!-- 按钮 -->
    <div class="btn">
      <van-button type="primary" size="large" color="#fc4c4c" @click="queding">确定</van-button>
    </div>
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
      show: false,
      actions: [{ name: "银行卡" }, { name: "支付宝" }, { name: "微信" }],
      type: "请选择收款类型", //收款类型
      account: "", //收款账号
      username: "", //收款人
      bankname: "", //银行名称
      // username1: "", //手机号
      // sms: "", //验证码
      fileList: [], //二维码
      erweima: "" //二维码地址
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
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      this.type = item.name;
    },
    xuanze() {
      this.show = true;
    },
    // 点击确定按钮
    queding() {
      if (this.type == "请选择收款类型") {
        this.$toast("请输入收款类型");
      } else if (!this.account.trim()) {
        this.$toast("请输入收款账号");
      } else if (!this.username.trim()) {
        this.$toast("请输入收款人姓名");
      } else if (this.type == "银行卡" && !this.bankname.trim()) {
        this.$toast("请输入银行名称");
      } else {
        let querys = {};
        if (this.type == "微信") {
          querys = {
            type: 1,
            wx_account_status: 1,
            wx_account: this.account,
            wx_account_name: this.username,
            wx_qrcode: this.erweima
          };
        } else if (this.type == "支付宝") {
          querys = {
            type: 1,
            zfb_account_status: 1,
            zfb_account: this.account,
            zfb_account_name: this.username,
            zfb_qrcode: this.erweima
          };
        } else {
          querys = {
            type: 1,
            bank_account_status: 1,
            bank_account: this.account,
            bank_holder: this.username,
            bank_name: this.bankname
          };
        }
        this.axios
          .post("/api/property_administer/personalAccount", querys)
          .then(data => {
            this.$toast("设置成功");
            this.$router.go(-1);
          });
      }
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      upload(file.content, file.file.name).then(data => {
        console.log(data);
        this.erweima = data.url;
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
  .box {
    margin-top: 45px;
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