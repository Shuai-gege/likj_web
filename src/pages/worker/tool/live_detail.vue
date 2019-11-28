<template>
  <div class="coursedetail">
    <!-- 头部公共搜索框 -->
    <tabbar title="课程详情"></tabbar>
    <div class="con">
      <div class="banner" @click="tovideo(initdata.course_url)">
        <img :src="initdata.course_img" alt />
        <div class="text" v-if="state==1">
          即将开播 敬请期待
          <br />
          {{initdata.start}}
        </div>
        <div class="text" v-if="state==2">
          正在热播 点击观看
          <br />
          {{initdata.start}} ~ {{initdata.end}}
        </div>
        <div class="text" v-if="state==3" @click="tovideo1(initdata.videofile)">
          直播已结束
          <br />
          <i v-if="initdata.videofile">点击查看录播</i>
        </div>
      </div>

      <!-- 作者 -->

      <div class="title">
        <h4>{{initdata.course_title}}</h4>
        <div class="author flex_l">
          <img :src="initdata.course_avatar" alt />
          <div class="name">
            <p>{{initdata.course_author}}</p>
            <span>{{initdata.start}} ~ {{initdata.end}}</span>
          </div>
        </div>
      </div>

      <!-- 内容简介 -->
      <div class="about">
        <div class="title flex_l">
          <img
            style="width:25px;height:25px;margin-right:10px;"
            src="../../../image/彩色/kechengjianjie.png"
            alt
          />
          课程简介
        </div>
        <p>{{initdata.course_con}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import tabbar from "../../../components/navbar";
import { getTime } from "../../../common/js/common";
export default {
  data() {
    return {
      id: "", //直播列表的id
      state: "", //开播状态  1 未开始  2 开播中  3 已结束
      initdata: {}
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.id = this.$route.query.id;
    this.init();
  },
  methods: {
    init() {
      this.axios
        .post("/api/course/liveInfo", {
          id: this.id
        })
        .then(data => {
          // 判断直播状态
          if (data.course_stime) {
            let now = parseInt(new Date().getTime() / 1000);
            if (now < data.course_stime) {
              this.state = 1;
            } else if (now > data.course_etime) {
              this.state = 3;
            } else {
              this.state = 2;
            }
          }
          // 处理开始和结束时间格式
          if (data.course_stime) {
            this.$set(data, "start", getTime(data.course_stime));
            this.$set(data, "end", getTime(data.course_etime));
          }
          this.initdata = data;
        });
    },
    tovideo(url) {
      if (this.state == 2) {
        location.href = url;
      }
    },
    tovideo1(url) {
      if (this.state == 3 && url) {
        location.href = url;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.coursedetail {
  padding-top: 44px;
  font-size: 14px;
  color: #333;
  min-height: 100vh;
  background: #f5f5f5;
  .con {
    margin-top: -1px;
    .banner {
      width: 100%;
      height: 200px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .text {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.7);
        color: #fff;
        text-align: center;
        font-size: 20px;
        line-height: 40px;
        padding-top: 50px;
      }
    }
    .title {
      background-color: #fff;
      padding: 6px 12px 10px;
      .author {
        margin-top: 15px;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .name {
          p {
            font-size: 15px;
            color: rgb(250, 116, 7);
            margin-bottom: 5px;
          }
          span {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }

    .about {
      background-color: #fff;
      margin-top: 10px;
      padding: 10px;
      .title {
        font-weight: 700;
      }
      p {
        text-indent: 30px;
      }
    }
  }
}
</style>
