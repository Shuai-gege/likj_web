<template>
  <div class="show">
    <!-- 头部公共搜索框 -->
    <!-- <tabbar title="未授权"></tabbar> -->
    <div class="content" v-html="con" style="padding:12px;"></div>
  </div>
</template>
<script>
// import tabbar from "../../components/navbar";
export default {
  data() {
    return {
      con: ""
    };
  },
  mounted() {
    this.axios.post("/api/index/unauthorized").then(data => {
      console.log(data);
      this.con = data
        .replace(/width=*[0-9]*/g, 'width="100%"')
        .replace(/height=*[0-9]*/g, 'height="auto"');
      this.init();
    });
  },
  methods: {
    // 调取user/index，获取是否有手机号
    init() {
      this.axios
        .post("/api/user/index", {
          webtype: "shop"
        })
        .then(data => {
          // data.mobile;  //手机号
          // data.bind_account //是否允许绑定手机号 true false
          if (!data.mobile && data.bind_account) {
            this.$toast("请绑定手机号");
            setTimeout(() => {
              this.$router.push({
                path: "set_tel",
                query: {
                  type: 1,
                  iscan: data.bind_account ? 1 : 0
                }
              });
            }, 1000);
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.show {
  width: 100%;
  height: 100vh;
  padding-top: 45px;
  content {
    margin-top: -1px;
  }
}
</style>
