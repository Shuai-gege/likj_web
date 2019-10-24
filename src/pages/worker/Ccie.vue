<template>
  <div class="ccie">
    <navbar title="授权证书"></navbar>
    <div class="content">
      <img :src="img" alt v-if="img" style="width:100%;height:100%;" />

      <div
        v-else
        :class="{'image':true,'bg1':bg == 1,'bg2':bg==2,'bg3':bg==3,'bg4':bg==4,'bg5':bg==5}"
      >
        <p
          :class="{'user':true,'bg1':bg == 1,'bg2':bg==2,'bg3':bg==3,'bg4':bg==4,'bg5':bg==5}"
        >{{initdata.wx_nickname}}</p>
        <p
          :class="{'daili':true,'bg1':bg == 1,'bg2':bg==2,'bg3':bg==3,'bg4':bg==4,'bg5':bg==5}"
        >{{initdata.agent_name}}</p>
        <p
          :class="{'num':true,'bg1':bg == 1,'bg2':bg==2,'bg3':bg==3,'bg4':bg==4,'bg5':bg==5}"
        >{{initdata.certificate_no}}</p>
        <p
          :class="{'deadline':true,'bg1':bg == 1,'bg2':bg==2,'bg3':bg==3,'bg4':bg==4,'bg5':bg==5}"
        >{{initdata.starttime}}至{{initdata.endtime}}</p>
        <p
          :class="{'name':true,'bg1':bg == 1,'bg2':bg==2,'bg3':bg==3,'bg4':bg==4,'bg5':bg==5}"
        >{{initdata.company_name}}</p>
        <!-- <p
          :class="{'date':true,'bg1':bg == 1,'bg2':bg==2,'bg3':bg==3,'bg4':bg==4,'bg5':bg==5}"
        >{{initdata.starttime}}</p>-->
      </div>
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
      img: ""
    };
  },
  components: {
    navbar
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.axios.post("/api/agent/myEmpowerCertificate").then(data => {
        this.initdata = data;
        this.bg = data.empower_template;
        setTimeout(() => {
          this.toImg();
        }, 1);
      });
    },
    toImg() {
      let that = this;
      html2canvas(document.querySelector(".image"))
        .then(canvas => {
          let imgUrl = canvas.toDataURL("image/png");
          console.log(imgUrl);
          that.img = imgUrl; //base64格式
        })
        .catch(error => {});
    }
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
    color: #a59e98;
    padding-top: 44px;
    height: 100vh;

    .image {
      width: 100%;
      margin: 0 auto;
      height: 100%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
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
          top: 41.5%;
          left: 42%;
        }
        &.bg2 {
          color: black;
          top: 42%;
          left: 42%;
        }
        &.bg3 {
          color: #fff;
          top: 42%;
          left: 42%;
          font-size: 15px;
        }
        &.bg4 {
          top: 43.5%;
          left: 47%;
          font-weight: 400;
        }
        &.bg5 {
          top: 46%;
          left: 47%;
        }
      }

      .daili {
        font-weight: 700;
        position: absolute;
        font-size: 16px;
        &.bg1 {
          top: 45.5%;
          left: 42%;
        }
        &.bg2 {
          color: black;
          top: 48%;
          left: 42%;
        }
        &.bg3 {
          color: #fff;
          font-size: 15px;
          top: 46%;
          left: 42%;
        }
        &.bg4 {
          font-weight: 400;
          top: 50.5%;
          left: 47%;
        }
        &.bg5 {
          top: 50.5%;
          left: 47%;
        }
      }

      .num {
        position: absolute;
        font-size: 12px;
        &.bg1 {
          top: 65.4%;
          left: 40%;
        }
        &.bg2 {
          top: 64.5%;
          left: 34%;
        }
        &.bg3 {
          color: rgb(199, 199, 199);
          font-size: 14px;
          top: 71%;
          left: 36%;
        }
        &.bg4 {
          top: 68.8%;
          left: 32%;
        }
        &.bg5 {
          top: 63%;
          left: 36%;
        }
      }

      .deadline {
        position: absolute;
        font-size: 12px;
        &.bg1 {
          top: 69%;
          left: 40%;
        }
        &.bg2 {
          top: 61.5%;
          left: 34.5%;
        }
        &.bg3 {
          color: rgb(199, 199, 199);
          font-size: 14px;

          top: 67.5%;
          left: 36%;
        }
        &.bg4 {
          top: 66.1%;
          left: 32%;
        }
        &.bg5 {
          top: 60%;
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
}
</style>