<template>
  <div class="ccie">
    <!-- <navbar title="授权证书"></navbar> -->
    <div class="content">
      <div class="box">
        <p>授权代理认证查询</p>
        <van-cell-group>
          <van-field v-model="value" placeholder="请输入代理名称" />
        </van-cell-group>
      </div>
      <div class="con" v-if="show">
        <div class="flex_l top">
          <img :src="initdata.wx_avatar" alt />
          <div class="name">
            <p>{{initdata.wx_nickname}}</p>
            <p>{{initdata.agent_name}}</p>
          </div>
        </div>
      </div>
      <img :src="img" alt v-if="img" class="shouquan" />
      <div
        v-else
        :class="{'image':true,'bg1':bg == 1,'bg2':bg==2,'bg3':bg==3,'bg4':bg==4,'bg5':bg==5}"
      >
        <p
          v-if="show"
          :class="{'user':true,'bg1':bg == 1,'bg2':bg==2,'bg3':bg==3,'bg4':bg==4,'bg5':bg==5}"
        >{{initdata.wx_nickname}}</p>
        <p
          v-if="show"
          :class="{'daili':true,'bg1':bg == 1,'bg2':bg==2,'bg3':bg==3,'bg4':bg==4,'bg5':bg==5}"
        >{{initdata.agent_name}}</p>
        <p
          v-if="show"
          :class="{'num':true,'bg1':bg == 1,'bg2':bg==2,'bg3':bg==3,'bg4':bg==4,'bg5':bg==5}"
        >{{initdata.certificate_no}}</p>
        <p
          v-if="show"
          :class="{'deadline':true,'bg1':bg == 1,'bg2':bg==2,'bg3':bg==3,'bg4':bg==4,'bg5':bg==5}"
        >{{initdata.starttime}}至{{initdata.endtime}}</p>
        <p
          v-if="show"
          :class="{'name':true,'bg1':bg == 1,'bg2':bg==2,'bg3':bg==3,'bg4':bg==4,'bg5':bg==5}"
        >{{initdata.company_name}}</p>
        <!-- <p
          :class="{'date':true,'bg1':bg == 1,'bg2':bg==2,'bg3':bg==3,'bg4':bg==4,'bg5':bg==5}"
        >{{initdata.starttime}}</p>-->
      </div>
    </div>
    <div class="btn">
      <van-button
        type="primary"
        size="large"
        color="linear-gradient(to right bottom, #ffb305, rgb(123, 46, 46))"
        @click="init"
      >查询</van-button>
    </div>
  </div>
</template>
<script>
import navbar from "@/components/navbar";
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      bg: "", //背景图
      initdata: {},
      img: "",
      value: "", //搜索框
      show: false //隐藏显示
    };
  },
  components: {
    navbar
  },
  mounted() {},
  methods: {
    init() {
      // 请输入代理名称;
      if (this.value == "") {
        this.$toast("请输入要查询的代理名称");
      } else {
        this.axios
          .post("/api/agent/queryAgent", { search: this.value })
          .then(data => {
            this.initdata = data;
            this.bg = data.empower_template;
            // setTimeout(() => {
            //   this.toImg();
            // }, 1);
            this.show = true;
          });
      }
    }
    // toImg() {
    //   let that = this;
    //   html2canvas(document.querySelector(".image"))
    //     .then(canvas => {
    //       let imgUrl = canvas.toDataURL("image/png");
    //       console.log(imgUrl);
    //       that.img = imgUrl; //base64格式
    //     })
    //     .catch(error => {});
    // }
  }
};
</script>
<style lang="less" scoped>
.ccie {
  .bg4 {
    color: #e7d353;
  }
  .bg5 {
    color: #000;
  }
  .content {
    .con {
      padding: 10px;
      margin-top: -1px;
      .top {
        margin-top: 154px;
      }
      img:nth-child(1) {
        width: 80px;
        height: 80px;
        border-radius: 10px;
        margin-right: 15px;
      }
      .name {
        font-size: 15px;
        color: #666;
        p:nth-child(1) {
          margin-bottom: 15px;
        }
        p:nth-child(2) {
          font-size: 13px;
        }
      }
    }
    color: #a59e98;
    height: 100vh;
    .shouquan {
      width: 94%;
      height: 45%;
      margin: 0 auto;
      border-radius: 15px;
      margin-bottom: 30%;
    }
    .box {
      position: fixed;
      width: 100%;
      z-index: 100;
      background: url("../../image/bgt2.png");
      padding: 30px 15px;
      p {
        text-align: center;
        padding-bottom: 20px;
        font-size: 20px;
        color: #ffb305;
      }
    }
    .image {
      position: relative;
      width: 100%;
      margin: 0 auto;
      height: 100%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-bottom: 20%;
      &.bg1 {
        background-image: url("../../image/1.png");
      }
      &.bg2 {
        background-image: url("../../image/2.png");
      }
      &.bg3 {
        background-image: url("../../image/3.jpg");
      }
      &.bg4 {
        background-image: url("../../image/4.png");
      }
      &.bg5 {
        background-image: url("../../image/5.png");
      }
      .user {
        position: absolute;
        font-size: 16px;
        font-weight: 700;
        &.bg1 {
          top: 37.5%;
          left: 42%;
        }
        &.bg2 {
          color: black;
          top: 38%;
          left: 42%;
        }
        &.bg3 {
          color: #fff;
          top: 38%;
          left: 42%;
          font-size: 15px;
        }
        &.bg4 {
          top: 40%;
          left: 47%;
          font-weight: 400;
        }
        &.bg5 {
          top: 43%;
          left: 47%;
        }
      }

      .daili {
        font-weight: 700;
        position: absolute;
        font-size: 16px;
        &.bg1 {
          top: 41.9%;
          left: 42%;
        }
        &.bg2 {
          color: black;
          top: 44.5%;
          left: 42%;
        }
        &.bg3 {
          color: #fff;
          font-size: 15px;
          top: 42.5%;
          left: 42%;
        }
        &.bg4 {
          font-weight: 400;
          top: 47%;
          left: 47%;
        }
        &.bg5 {
          top: 47.5%;
          left: 47%;
        }
      }

      .num {
        position: absolute;
        font-size: 12px;
        &.bg1 {
          top: 63%;
          left: 40%;
        }
        &.bg2 {
          top: 62%;
          left: 34.5%;
        }
        &.bg3 {
          color: rgb(199, 199, 199);
          font-size: 14px;
          top: 69.8%;
          left: 36%;
        }
        &.bg4 {
          top: 67%;
          left: 32%;
        }
        &.bg5 {
          top: 60.3%;
          left: 36%;
        }
      }

      .deadline {
        position: absolute;
        font-size: 12px;
        &.bg1 {
          top: 66.8%;
          left: 40%;
        }
        &.bg2 {
          top: 58.9%;
          left: 34%;
        }
        &.bg3 {
          color: rgb(199, 199, 199);
          font-size: 14px;
          top: 65.5%;
          left: 36%;
        }
        &.bg4 {
          top: 64.3%;
          left: 32%;
        }
        &.bg5 {
          top: 57%;
          left: 36%;
        }
      }

      .name {
        position: absolute;
        font-size: 15px;
        left: 50%;
        transform: translateX(-50%);

        &.bg1 {
          bottom: 60px;
        }
        &.bg2 {
          bottom: 80px;
        }
        &.bg3 {
          bottom: 80px;
          color: rgb(199, 199, 199);
        }
        &.bg4 {
          bottom: 85px;
        }
        &.bg5 {
          bottom: 80px;
        }
      }

      .date {
        position: absolute;
        font-size: 13px;
        left: 50%;
        transform: translateX(-50%);
        &.bg1 {
          bottom: 60px;
        }
        &.bg2 {
          bottom: 60px;
        }
        &.bg3 {
          bottom: 60px;
          color: rgb(199, 199, 199);
        }
        &.bg4 {
          bottom: 65px;
        }
        &.bg5 {
          bottom: 60px;
        }
      }
    }
  }
  .btn {
    position: fixed;
    bottom: 15px;
    width: 100%;
    .van-button--large {
      width: 90%;
      margin-left: 5%;
      border-radius: 10px;
    }
  }
}
</style>