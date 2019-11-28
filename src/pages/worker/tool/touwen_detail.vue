<template>
  <div class="coursecontent">
    <!-- 头部公共搜索框 -->
    <tabbar title="图文详情"></tabbar>
    <div class="con">
      <div class="item_txt">
        <div class="user flex_l">
          <div class="left">
            <img :src="initdata.pcourse_avatar" alt />
          </div>
          <div class="right">
            <div class="top">
              <p class="username">{{initdata.pcourse_author}}</p>
              <p class="time">{{initdata.createtime}}</p>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="title">{{initdata.pcourse_title}}</div>
          <div v-html="initdata.content"></div>
        </div>
      </div>
    </div>
    <!-- <div class="upload" v-if="!agent_id">
      <van-icon name="plus" size="30" color="#fff" @click="$router.push('/courseup')" />
    </div>-->
  </div>
</template>
<script>
import tabbar from "../../../components/navbar";
import { getTime } from "../../../common/js/common";
export default {
  data() {
    return {
      id: "",
      agent_id: "", //上级id
      state: "", //直播状态  1 未开始  2 直播中  3 已结束
      list: [],
      initdata: {}
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.id = this.$route.query.id;
    this.init();
    // this.agent_id = parseInt(localStorage.getItem("agent_id"));
  },
  methods: {
    init() {
      this.axios
        .post("/api/course/pictureInfo", {
          id: this.id
        })
        .then(data => {
          // 处理图文详情富文本
          if (data.pcourse_content) {
            this.$set(
              data,
              "content",
              data.pcourse_content
                .replace(
                  /<img/g,
                  '<img width="50%" height="auto" style="display:inline-block;"'
                )
                .replace(/<video/g, '<video width="100%" height="auto"')
            );
          }
          this.initdata = data;
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
