<template>
  <!-- 图片上传 -->
  <div class="upload">
    <div class="flex" style="padding-left:10px;">
      <van-uploader
        v-model="fileList1"
        :after-read="afterRead1"
        @delete="del1"
        multiple
        :max-count="1"
      />
      <van-uploader
        v-model="fileList2"
        :after-read="afterRead2"
        @delete="del2"
        multiple
        :max-count="1"
      />
      <van-uploader
        v-model="fileList3"
        :after-read="afterRead3"
        @delete="del3"
        multiple
        :max-count="1"
      />
      <van-uploader
        v-model="fileList4"
        :after-read="afterRead4"
        @delete="del4"
        multiple
        :max-count="1"
      />
    </div>
    <van-button type="primary" size="large" color="#fc4c4c" @click="submit">发布</van-button>
  </div>
</template>
<script>
import { upload } from "../../../common/js/common";
export default {
  data() {
    return {
      fileList1: [], //图片上传
      fileList2: [], //图片上传
      fileList3: [], //图片上传
      fileList4: [], //图片上传
      img1: "",
      img2: "",
      img3: "",
      img4: "",
      img: []
    };
  },
  methods: {
    afterRead1() {
      upload(this.fileList1[0].content, this.fileList1[0].file.name).then(
        data => {
          this.img1 = data.url;
          console.log(this.img1);
        }
      );
    },
    afterRead2() {
      upload(this.fileList2[0].content, this.fileList2[0].file.name).then(
        data => {
          this.img2 = data.url;
        }
      );
    },
    afterRead3() {
      upload(this.fileList3[0].content, this.fileList3[0].file.name).then(
        data => {
          this.img3 = data.url;
        }
      );
    },
    afterRead4() {
      upload(this.fileList4[0].content, this.fileList4[0].file.name).then(
        data => {
          this.img4 = data.url;
        }
      );
    },
    del1() {
      this.img1 = "";
    },
    del2() {
      this.img2 = "";
    },
    del3() {
      this.img3 = "";
    },
    del4() {
      this.img4 = "";
    },
    submit() {
      if (!this.img1 && !this.img2 && !this.img3 && !this.img4) {
        this.$toast("请上传素材");
      } else {
        let arr = [this.img1, this.img2, this.img3, this.img4];
        this.img = arr.filter(item => {
          return item;
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>