<template>
  <div class="invite">
    <!-- 头部公共搜索框 -->
    <tabbar title="邀请代理" v-if="level_id"></tabbar>
    <tabbar title="邀请代理" v-else></tabbar>
    <div class="share">
      <img :src="img" alt v-if="img" style="width:375px;height:100%;" />
      <div class="con">
        <img class="userimg" :src="init.wx_avatar" alt />
        <div class="user">{{init.wx_name}}{{init.agent_name?'（'+init.agent_name+'）':''}}</div>
        <span v-if="level_id">
          邀请你成为{{init.app_name}}的
          <b style="color:#fc4c4c;">{{init.develop_name}}</b>
        </span>
        <span v-if="!level_id">邀请你加入{{init.app_name}}</span>
        <img :src="init.file_path" alt class="erweima" />
        <!-- <div class="time">{{init.effective_time}}</div> -->
        <!-- <div class="save">
          长按
          <br />分享
        </div>-->
      </div>
      <div class="foot">长按二维码，识别图中二维码，关注公众号后点击微信模板消息链接，录入资料，即可申请代理授权</div>
    </div>
    <!-- <img :src="img" v-if="img" alt style="width:100%;height:500px;border:1px solid red;" /> -->
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      level_id: "", //代理id
      init: {},
      img: "" //整个页面图
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.level_id = this.$route.query.level_id;
    let query;
    if (this.level_id) {
      query = {
        level_id: this.level_id,
        develop_class: 1
      };
    } else {
      query = {
        develop_class: 2
      };
    }
    this.axios.post("/api/agent/developQrcode", query).then(data => {
      this.init = data;
    });
  },
  methods: {
    toImg() {
      // html2canvas(document.getElementById("con"), {
      //   allowTaint: true, //允许污染
      //   taintTest: true, //在渲染前测试图片(没整明白有啥用)
      //   useCORS: true, //使用跨域(当allowTaint为true时这段代码没什么用)
      //   background: "#fff",
      //   onrendered: function(canvas) {
      //     imgBlob = canvas.toDataURL("image/jpeg", 1.0); //将图片转为base64, 0-1 表示清晰度
      //     imgBlob = imgBlob.toString().substring(imgBlob.indexOf(",") + 1); //截取base64以便上传
      //     this.img = imgBlob;
      //   }
      // });
    }
  }
};
</script>

<style lang="less" scoped>
.invite {
  padding-top: 44px;
  color: rgb(241, 65, 65);
  height: 100vh;
  color: #999;
  font-size: 13px;
  .share {
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, #7f7fd5, #86a8e7, #91eae4);
    // padding: 40px 0;
    padding-top: 1px;
  }
  .con {
    background-color: #fff;
    width: 80%;
    height: 70vh;
    margin: 40px auto;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    position: relative;
    .userimg {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      // margin: -60px auto 0;
      margin: 0 auto;
      border: 3px solid #fff;
    }
    .user {
      font-size: 15px;
      color: #333;
      margin: 20px 0 6px;
    }
    .erweima {
      width: 180px;
      height: 180px;
      position: absolute;
      left: 50%;
      bottom: 30%;
      margin-left: -90px;
      margin-bottom: -100px;
    }
    .time {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }
    .save {
      padding-top: 7px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      color: #fff;
      font-weight: 700;
      font-size: 15px;
      background: linear-gradient(to top, #f7797d, #fbd786);
      position: absolute;
      left: 50%;
      bottom: 20px;
      margin-left: -30px;
    }
  }
  .foot {
    color: #fff;
    margin: 0 30px 0;
    text-align: center;
  }
}
</style>
