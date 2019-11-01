<template>
  <div class="Certification">
    <navbar title="实名认证"></navbar>
    <div class="topbox">
      <van-cell-group>
        <van-field v-model="name" required label="您的姓名" placeholder="请输入用户名" />
        <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" />
        <van-field v-model="type" required value="选择证件类型" label="证件类型" disabled @click="zhengjian" />
        <van-field v-model="code" required clearable label="证件号码" placeholder="请输入证件号码" />
      </van-cell-group>
    </div>
    <!-- 图片上传 -->
    <div class="bombox flex_c">
      <div class="flex item">
        <van-uploader
          v-model="fileList"
          :max-count="1"
          style="margin:15px 10px;"
          :after-read="afterRead"
        />
        <p>请上传证件正面</p>
      </div>
      <div class="flex item">
        <van-uploader
          v-model="fileList1"
          :max-count="1"
          style="margin:15px 10px;"
          :after-read="afterRead"
        />
        <p>请上传证件背面</p>
      </div>
    </div>
    <p class="flex_c zhu">
      注：拍摄时确保证件
      <span style="color:#fc4c4c">边框完整、字体清晰。亮度均匀</span>
    </p>
    <!-- 提交按钮 -->
    <div style="background:#fff;padding-top:20px;">
      <van-button type="primary" round size="large" color="#fc4c4c" @click="submit">提交</van-button>
    </div>
  </div>
</template>
<script>
import navbar from "../../components/navbar";
import { dataURLtoFile } from "../../common/js/common";
export default {
  data() {
    return {
      show: false,
      actions: [
        { name: "居民身份证（大陆）" },
        { name: "军官证" },
        { name: "护照" },
        { name: "港澳台居民身份证" }
      ],
      type: "请选择证件类型",
      fileList: [],
      fileList1: [],
      name: "",
      code: ""
    };
  },
  components: {
    navbar
  },
  methods: {
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      this.type = item.name;
      //Toast(item.name);
    },
    zhengjian() {
      this.show = true;
    },
    submit() {
      console.log(this.name, this.type, this.code);
      if (!this.name) {
        this.$toast("请输入姓名");
      } else if (this.type == "请选择证件类型") {
        this.$toast("请选择证件类型");
      } else if (!this.code) {
        this.$toast("请输入证件号");
      }
    },
    afterRead(file) {
      console.log(file.content);
      console.log(dataURLtoFile(file.content));
    }
  }
};
</script>
<style lang="less" scoped>
.Certification {
  background: #f5f5f5;
  /deep/.van-uploader__upload {
    width: 160px;
    height: 100px;
  }
  /deep/.van-uploader__preview-image {
    width: 160px;
    height: 100px;
  }
  .topbox {
    margin-top: 45px;
  }
  .bombox {
    background-color: #fff;
    .item {
      flex-direction: column;
    }
  }
  .zhu {
    padding-top: 20px;
    line-height: 38px;
    margin-bottom: 10px;
    background: #fff;
  }
}
</style>