<template>
  <div class="mydata">
    <navbar title="个人资料"></navbar>
    <div class="topbox">
      <van-cell title="头像" class="touxiang">
        <van-image cover width="2rem" height="2rem" radius="10" :src="mylist.wx_avatar" />
      </van-cell>

      <van-cell-group>
        <!-- <van-cell title="用户名" :value="mylist.wx_nickname" /> -->
        <van-cell title="昵称" :value="mylist.wx_nickname" />
        <van-cell title="代理级别" :value="mylist.agent_name" />
      </van-cell-group>
    </div>
    <!-- 实名认证 -->
    <!-- <div class="shiming">
      <van-cell title="实名认证" is-link to="/Certification">未认证</van-cell>
    </div>-->
  </div>
</template>
<script>
import navbar from "@/components/navbar";
export default {
  data() {
    return {
      mylist: {}
    };
  },
  components: {
    navbar
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    }
  },
  mounted() {
    this.axios.post("/api/user/index").then(data => {
      this.mylist = data;
    });
  }
};
</script>
<style lang="less" scoped>
.mydata {
  background: #f5f5f5;
  margin-bottom: 50px;
  .topbox {
    margin-top: 50px;
    .touxiang {
      display: flex;
      align-items: center;
    }
  }
  .shiming {
    margin: 10px 0;
  }
  .btn {
    margin-top: 20px;
  }
}
</style>