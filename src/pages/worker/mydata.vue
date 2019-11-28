<template>
  <div class="mydata">
    <navbar title="个人资料"></navbar>
    <div class="topbox">
      <van-cell title="头像" class="touxiang">
        <van-image
          v-if="!flag"
          cover
          width="2rem"
          height="2rem"
          radius="10"
          :src="mylist.wx_avatar"
        />
        <van-uploader v-else v-model="fileList" :after-read="afterRead" :max-count="1" />
      </van-cell>

      <van-cell-group>
        <!-- <van-cell title="用户名" :value="mylist.wx_nickname" /> -->
        <van-cell title="昵称" :value="mylist.wx_nickname" v-if="!flag" />
        <van-field v-model="name" v-else type="text" label="昵称" />
        <van-cell v-if="mylist.agent_name" title="代理级别" :value="mylist.agent_name" />
        <van-cell v-if="mylist.level_name" title="会员等级" :value="mylist.level_name" />
        <van-cell title="手机号" :value="mylist.mobile" />
      </van-cell-group>
      <div class="btn" v-if="!flag" @click="edit">编辑</div>
      <div class="btn" v-else @click="submit">确定</div>
    </div>
    <!-- 实名认证 -->
    <!-- <div class="shiming">
      <van-cell title="实名认证" is-link to="/Certification">未认证</van-cell>
    </div>-->
  </div>
</template>
<script>
import navbar from "@/components/navbar";
import { upload } from "../../common/js/common";
export default {
  data() {
    return {
      flag: false, //true为编辑状态
      mylist: {},
      fileList: [],
      img: "", //上传后的图片
      name: "",
      tel: "" //手机号
    };
  },
  components: {
    navbar
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      upload(file.content, file.file.name).then(data => {
        console.log(data);
        this.img = data.url;
      });
    },
    edit() {
      this.flag = true;
    },
    submit() {
      this.axios
        .post("/api/user/profile", {
          avatar: this.img,
          nickname: this.name
        })
        .then(data => {
          this.$toast("修改成功");
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        });
    },
    init() {
      this.axios.post("/api/user/index").then(data => {
        this.mylist = data;
        this.name = data.wx_nickname;
      });
    }
  },

  mounted() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.mydata {
  padding-top: 44px;
  .topbox {
    /deep/.van-uploader__preview {
      margin: 7px;
    }
    /deep/.van-uploader__upload {
      width: 75px;
      height: 75px;
      margin: 0;

      /deep/van-image van-uploader__preview-image {
        z-index: 999;
      }
    }
    .touxiang {
      display: flex;
      align-items: center;
    }
  }
  .shiming {
    margin: 10px 0;
  }
  /deep/.van-field__control {
    text-align: right;
  }
  .btn {
    margin: 200px auto 0;
    width: 90%;
    height: 45px;
    line-height: 45px;
    background-color: #fc4c4c;
    color: #fff;
    border-radius: 10px;
    text-align: center;
    font-size: 15px;
  }
}
</style>