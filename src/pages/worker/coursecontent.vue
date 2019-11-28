<template>
  <div class="coursecontent">
    <!-- 头部公共搜索框 -->
    <tabbar title="商学院 "></tabbar>
    <div class="con">
      <van-dropdown-menu active-color="#fc4c4c">
        <van-dropdown-item :title="title1" v-model="value1" :options="option" @change="getval1" />
        <van-dropdown-item :title="title2" v-model="value2" :options="option" @change="getval2" />
      </van-dropdown-menu>
      <!-- 直播课 -->
      <div class="zhibo" v-if="type==1">
        <div class="item_lu flex_l" v-for="(item,i) in list" :key="i" @click="toDetail(item.id)">
          <img :src="item.course_img" alt />
          <div class="title">
            <p class="erhang">{{item.course_title}}</p>
            <div class="author">
              <div class="flex_l" v-if="state==3">
                <img src="../../image/彩色/zhibojieshu.png" alt />
                <span>已结束</span>
              </div>
              <div class="flex_l" v-if="state==2">
                <img src="../../image/彩色/zhibozhong.png" alt />
                <span style="color:#00CE98">直播中</span>
              </div>
              <div class="flex_l" v-if="state==1">
                <img src="../../image/彩色/weikaibo.png" alt />
                <span style="color:#FF7E00;">未开播</span>
              </div>
            </div>
            <div class="time">{{item.start}} ~ {{item.end}}</div>
          </div>
        </div>
      </div>

      <!-- 图文课 -->
      <div class="tuwen" v-if="type==2">
        <div class="item_txt" v-for="(item,i) in list" :key="i">
          <div class="user flex_l">
            <div class="left">
              <img :src="item.course_img" alt />
            </div>
            <div class="right">
              <div class="top">
                <p class="username">{{item.pcourse_author}}</p>
                <p class="time">{{item.createtime}}</p>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="title">{{item.pcourse_title}}</div>
            <div v-html="item.content"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="upload" v-if="!agent_id">
      <van-icon name="plus" size="30" color="#fff" @click="$router.push('/courseup')" />
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
import { getTime } from "../../common/js/common";
export default {
  data() {
    return {
      agent_id: "", //上级id
      title1: "团队课程",
      title2: "公开课程",
      value1: "",
      value2: "",
      option: [{ text: "直播视频", value: 1 }, { text: "图文视频", value: 2 }],
      type: 1, //直播 1  图文 2
      live_type: 2, //团队课 2  公开课 1
      state: "", //直播状态  1 未开始  2 直播中  3 已结束
      list: []
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.init();
    this.agent_id = parseInt(localStorage.getItem("agent_id"));
  },
  methods: {
    init() {
      this.axios
        .post("/api/course/course_list", {
          type: this.type,
          live_type: this.live_type,
          page: 1
        })
        .then(data => {
          this.list = data;
          data.forEach(item => {
            // 处理图文详情富文本
            if (item.pcourse_content) {
              this.$set(
                item,
                "content",
                item.pcourse_content
                  .replace(
                    /<img/g,
                    '<img width="50%" height="auto" style="display:inline-block;"'
                  )
                  .replace(/<video/g, '<video width="100%" height="auto"')
              );
            }
            // 判断直播状态
            if (item.course_stime) {
              let now = parseInt(new Date().getTime() / 1000);
              if (now < item.course_stime) {
                this.state = 1;
              } else if (now > item.course_etime) {
                this.state = 3;
              } else {
                this.state = 2;
              }
            }
            // 处理开始和结束时间格式
            if (item.course_stime) {
              this.$set(item, "start", getTime(item.course_stime));
              this.$set(item, "end", getTime(item.course_etime));
            }
          });
        });
    },
    getval1(value) {
      this.live_type = 2;
      document.querySelectorAll(
        ".van-dropdown-menu__title div"
      )[0].style.color = "red";
      document.querySelectorAll(
        ".van-dropdown-menu__title div"
      )[1].style.color = "#333";
      if (value == 2) {
        this.type = 2;
      } else {
        this.type = 1;
      }
      // this.title1 = this.option[this.value1 - 1].text;
      this.init();
    },
    getval2(value) {
      this.live_type = 1;
      document.querySelectorAll(
        ".van-dropdown-menu__title div"
      )[1].style.color = "red";
      document.querySelectorAll(
        ".van-dropdown-menu__title div"
      )[0].style.color = "#333";
      if (value == 2) {
        this.type = 2;
      } else {
        this.type = 1;
      }
      // this.title2 = this.option[this.value2 - 1].text;
      this.init();
    },
    toDetail(id) {
      this.$router.push({
        path: "/coursedetail",
        query: {
          id: id,
          type: this.live_type
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.coursecontent {
  padding-top: 44px;
  font-size: 14px;
  color: #333;
  background-color: #f5f6f7;
  min-height: 100vh;
  .con {
    margin-top: -1px;
    .flexbox {
      flex-wrap: wrap;
      padding: 0 5px;
    }
    .item {
      padding: 10px;
      width: 49%;
      border-radius: 5px;
      margin: 5px 0;
      background-color: #fff;
      .title {
        height: 40px;
        padding-top: 5px;
      }
      img {
        width: 100%;
        height: 100px;
        border-radius: 5px;
      }
      .time {
        font-size: 12px;
        color: #999;
      }
    }
    .item_lu {
      padding: 10px;
      background-color: #fff;
      border-bottom: 1px solid #f5f6f7;
      .title {
        flex: 1;
        .author {
          img {
            width: 17px;
            height: 17px;
          }
          margin: 6px 0 4px;
          font-size: 12px;
          color: #999;
        }
        .time {
          font-size: 12px;
          color: #3385ff;
        }
      }
      img {
        margin-right: 10px;
        width: 150px;
        height: 90px;
        border-radius: 5px;
      }
    }
    .item_txt {
      margin-bottom: 10px;
      background: #fff;
      video {
        width: 100%;
        height: 200px;
      }
      .user {
        padding: 10px;
        align-items: flex-start;
        border-bottom: 1px solid #f5f5f5;
        .left {
          margin-right: 10px;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
        .right {
          .top {
            .username {
              font-size: 16px;
              color: #82b5ff;
            }
            .time {
              color: #999;
              font-size: 12px;
            }
          }
        }
      }
      .bottom {
        padding: 12px;
        .title {
          color: #501209;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .text {
          color: #666;
        }
        .imgs {
          margin-top: 10px;
        }
      }
    }
  }
  .upload {
    background: #fc4c4c;
    width: 50px;
    height: 50px;
    text-align: center;
    border-radius: 50%;
    position: fixed;
    bottom: 20px;
    left: 50%;
    margin-left: -25px;
    .van-icon-plus:before {
      line-height: 50px;
    }
  }
}
</style>
