<template>
  <div class="offline">
    <!-- 头部公共搜索框 -->
    <tabbar title="线下支付"></tabbar>
    <div class="content">
      <div class="zhifu">
        <!-- <p style="margin-bottom:10px;font-size:14px;">请上传支付凭证</p>
        <van-uploader v-model="fileList" multiple :max-count="3" :after-read="afterRead" />-->
        应付：{{price}}元
      </div>
      <van-cell title="查看公司收款账户" is-link to="/shoukuan" />
      <div class="pay">
        <p style="margin-bottom:10px;font-size:14px;">请上传支付凭证</p>
        <van-uploader v-model="fileList" multiple :max-count="3" :after-read="afterRead" />
      </div>
      <div class="btn">
        <van-button type="primary" size="large" color="#fc4c4c" @click="sum">提交</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
import { upload } from "../../common/js/common";
export default {
  data() {
    return {
      fileList: [],
      price: ""
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.price = this.$route.query.price;
  },
  methods: {
    sum() {
      upload(this.fileList[0].content, this.fileList[0].file.name).then(
        data => {
          console.log(data);
        }
      );
    },
    afterRead() {
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
    }
  }
};
</script>

<style lang="less" scoped>
.offline {
  padding-top: 44px;
  .content {
    .zhifu {
      width: 100%;
      height: 150px;
      background: #f86829;
      color: #fff;
      font-size: 25px;
      text-align: center;
      line-height: 150px;
    }
    .pay {
      padding: 20px;
      background: #f5f6f7;
      /deep/.van-uploader__preview {
        margin-left: 20px;
      }
    }
    .btn {
      padding: 20px;
      margin-top: 100px;
    }
  }
}
</style>
