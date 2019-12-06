<template>
  <div class="school">
    <!-- 头部公共搜索框 -->
    <!-- <tabbar title="商学院"></tabbar> -->
    <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
      <div class="con" v-if="banner.length>0||zhiding.id||list.length>0">
        <van-swipe :autoplay="3000" v-if="banner.length>0">
          <van-swipe-item
            v-for="(item,i) in banner"
            :key="i"
            @click="touwen(item.picture_course_id)"
          >
            <img :src="item.banner" />
          </van-swipe-item>
        </van-swipe>
        <div class="tab flex" v-if="banner.length>0||zhiding.id||list.length>0">
          <div :class="{'item':true,'active':type==1}" @click="changeTab(1)">
            <span>团队课程</span>
          </div>
          <div :class="{'item':true,'active':type==2}" @click="changeTab(2)">
            <span>高手进阶</span>
          </div>
          <div :class="{'item':true,'active':type==3}" @click="changeTab(3)">
            <span>平台规则</span>
          </div>
        </div>
        <div class="top" @click="toDetail(zhiding.id)" v-if="zhiding.id">
          <div class="title">
            <span class="solo">置顶</span>
            {{zhiding.course_title}}
          </div>
          <div class="video">
            <img :src="zhiding.course_img" alt />
          </div>
          <div class="time flex">
            <p class="flex_l">
              <img :src="zhiding.course_avatar" alt />
              <span>{{zhiding.course_author}}</span>
            </p>
            <p class="flex_l">
              <van-icon name="clock-o" />
              <span>{{zhiding.start}} 至 {{zhiding.end}}</span>
            </p>
          </div>
        </div>
        <div class="list" v-if="list.length>0">
          <div class="item flex_l" v-for="(item,i) in list" :key="i" @click="toDetail(item.id)">
            <img :src="item.course_img" alt />
            <div class="pro">
              <div class="title erhang">
                <!-- <span class="solo">置顶</span> -->
                {{type==3?item.pcourse_title:item.course_title}}
              </div>
              <div class="time flex">
                <p class="flex_l">
                  <van-icon name="clock-o" />
                  <span v-if="type==3">{{item.createtime}}</span>
                  <span v-else>{{item.start}} 至 {{item.end}}</span>
                </p>
                <!-- <p class="flex_l">
                <van-icon name="eye-o" />
                <span>888</span>
                </p>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="null" v-else>暂未开放</div>
    </mescroll-vue>
  </div>
</template>
<script>
import tabbar from "../../../components/navbar";
import { getTime } from "../../../common/js/common";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  data() {
    return {
      type: 2, //tab切换
      banner: [],
      zhiding: {},
      list: [],
      mescroll: null, // mescroll实例对象
      // mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
      }
    };
  },
  components: {
    tabbar,
    MescrollVue // 注册mescroll组件
  },
  mounted() {
    // this.init();
  },
  methods: {
    init() {
      this.axios
        .post("/api/course/course_list", {
          type: this.type,
          page: 1
        })
        .then(data => {
          this.banner = data.banner;
          if (data.zhiding.course_stime) {
            this.$set(
              data.zhiding,
              "start",
              getTime(data.zhiding.course_stime)
            );
            this.$set(data.zhiding, "end", getTime(data.zhiding.course_etime));
          }
          this.zhiding = data.zhiding;
          // 处理开始和结束时间格式
          data.courselist.forEach(item => {
            if (item.course_stime) {
              this.$set(item, "start", getTime(item.course_stime));
              this.$set(item, "end", getTime(item.course_etime));
            }
          });
          this.list = data.courselist;
        });
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      console.log(page);
      this.axios
        .post("/api/course/course_list", {
          type: this.type,
          page: page.num
        })
        .then(data => {
          this.banner = data.banner;
          if (data.zhiding.course_stime) {
            this.$set(
              data.zhiding,
              "start",
              getTime(data.zhiding.course_stime)
            );
            this.$set(data.zhiding, "end", getTime(data.zhiding.course_etime));
          }
          this.zhiding = data.zhiding;
          // 处理开始和结束时间格式
          data.courselist.forEach(item => {
            if (item.course_stime) {
              this.$set(item, "start", getTime(item.course_stime));
              this.$set(item, "end", getTime(item.course_etime));
            }
          });
          // 请求的列表数据
          let arr = data.courselist;
          // 如果是第一页需手动置空列表
          if (page.num === 1) {
            this.list = [];
          }
          // 把请求到的数据添加到列表
          this.list = this.list.concat(arr);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length, true);
          });
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    },
    changeTab(type) {
      console.log(type);
      this.type = type;
      this.mescroll.resetUpScroll();
    },
    // 直播详情
    toDetail(id) {
      let path;
      if (this.type == 3) {
        path = "/touwen_detail";
      } else {
        path = "/live_detail";
      }
      this.$router.push({
        path: path,
        query: {
          id: id
        }
      });
    },
    // 图文详情
    touwen(id) {
      this.$router.push({
        path: "/touwen_detail",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.school {
  font-size: 14px;
  color: #333;
  font-weight: 700;
  background-color: #f5f6f7;
  min-height: 100vh;
  .mescroll {
    position: fixed;
    top: 0;
    bottom: 55px;
    height: auto;
  }
  p {
    font-weight: normal;
  }
  .title {
    .solo {
      font-size: 12px;
      border: 1px solid #fc4c4c;
      padding: 0px 5px;
      border-radius: 5px;
      color: #fc4c4c;
      margin-right: 6px;
      font-weight: normal;
    }
  }
  .time {
    color: #999;
    font-size: 12px;
    i {
      font-size: 13px;
      display: inline-block;
      margin-right: 3px;
      margin-top: 1px;
    }
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
  .con {
    margin-top: -1px;
    .van-swipe {
      height: 150px;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .tab {
      height: 55px;
      padding: 10px 12px;
      .item {
        width: 31%;
        background-color: #1f0c74;
        color: #fff;
        text-align: center;
        text-align: center;
        border-radius: 5px;
        height: 100%;
        line-height: 35px;
        &.active span {
          background-color: rgba(0, 0, 0, 0.7);
          color: #f3c80b;
        }
        &:nth-child(1) {
          background: url("../../../image/sc1.png") no-repeat;
          background-size: cover;
        }
        &:nth-child(2) {
          background: url("../../../image/sc2.png") no-repeat;
          background-size: cover;
        }
        &:nth-child(3) {
          background: url("../../../image/sc3.png") no-repeat;
          background-size: cover;
        }
        span {
          display: block;
          background-color: rgba(0, 0, 0, 0.5);
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
    }
    .top {
      margin: 0 12px;
      padding: 10px 5px;
      background-color: #fff;
      border-radius: 5px;

      .video {
        margin: 7px 0 5px;
        video,
        img {
          width: 100%;
          border-radius: 5px;
          height: 150px;
        }
      }
    }
    .list {
      margin: 0 12px;
      padding-bottom: 10px;
      .item {
        padding: 10px;
        background-color: #fff;
        border-radius: 5px;
        margin-top: 10px;
        img {
          width: 120px;
          height: 75px;
          border-radius: 5px;
          margin-right: 10px;
        }
        .pro {
          flex: 1;
          .title {
            height: 40px;
          }
          .time {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
