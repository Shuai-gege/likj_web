<template>
  <div class="applystore">
    <!-- 头部公共搜索框 -->
    <tabbar title="申请店铺"></tabbar>
    <div class="con">
      <!-- 店铺名字 -->
      <van-cell-group>
        <van-field v-model="name" required clearable label="店铺名称" placeholder="请输入店铺名称" />
      </van-cell-group>
      <!-- 店铺logo -->
      <div class="logo flex_l">
        <p>店铺logo：</p>
        <van-uploader v-model="fileList" multiple :max-count="1" :after-read="afterRead" />
      </div>
      <!-- 免责声明 -->
      <div class="mianze" style="margin:300px 0 20px;">
        <van-checkbox class="center" checked-color="#fc4c4c" v-model="checked" icon-size="12">
          是否同意
          <i @click="$router.push('/rule')">免责声明</i>
        </van-checkbox>
      </div>
      <!-- 按钮 -->
      <van-button type="danger" size="large" @click="submit">确定</van-button>
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
import { upload } from "../../common/js/common";
export default {
  data() {
    return {
      name: "", //店铺名称
      fileList: [], //上传logo
      logo: "",
      checked: false //复选框
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.type = this.$route.query.type;
  },
  methods: {
    afterRead() {
      upload(this.fileList[0].content, this.fileList[0].file.name).then(
        data => {
          this.logo = data.url;
        }
      );
    },
    submit() {
      if (!this.name.trim()) {
        this.$toast("请输入店铺名称");
      } else if (!this.fileList.length) {
        this.$toast("请上传店铺LOGO");
      } else if (!this.checked) {
        this.$toast("请同意免责声明");
      } else {
        if (this.logo) {
          this.axios
            .post("/api/agent/applyShop", {
              shop_name: this.name,
              shop_logo: this.logo
            })
            .then(data => {
              this.$toast("申请成功");
              setTimeout(() => {
                this.$router.go(-1);
              }, 1000);
            });
        } else {
          this.$toast("图片上传中");
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.applystore {
  padding-top: 44px;
  .con {
    margin-top: -1px;
    .logo {
      padding: 15px;
      p {
        padding-bottom: 75px;
        font-size: 14px;
      }
    }
    /deep/.van-checkbox__label {
      color: #333;
      i {
        color: #fc4c4c;
      }
    }
    .van-button--large {
      width: 92%;
      margin-left: 4%;
    }
  }
}
</style>
