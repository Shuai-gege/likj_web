<template>
  <div class="sucaiconter">
    <!-- 头部公共搜索框 -->
    <tabbar title="我的素材"></tabbar>
    <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
      <div class="con">
        <div class="item" v-for="(item,i) in list" :key="i">
          <div class="content flex_l">
            <div class="left">
              <img :src="item.avatar" alt />
            </div>
            <div class="right">
              <div class="top flex">
                <div>
                  <p class="username">
                    {{item.author}}
                    <i style="font-size:13px;">({{item.category_name}}类)</i>
                  </p>
                  <p class="time">2019.11.04</p>
                </div>
                <div class="state" v-if="item.status==0">待审核</div>
                <div class="state" v-if="item.status==1">审核通过</div>
                <div class="state" v-if="item.status==2">审核失败</div>
              </div>
              <div class="bottom">
                <div class="text">
                  <p>{{item.content}}</p>
                </div>
                <div class="imgs">
                  <van-image
                    width="2rem"
                    height="2rem"
                    fit="cover"
                    :src="items"
                    @click="getImg(index,item.images)"
                    v-for="(items,index) in item.images"
                    :key="index"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="like flex_r" v-if="item.enclosure">
          <span title="item.enclosure">附件</span>
          <a :href="item.enclosure">下载</a>
          </div>-->
        </div>
      </div>
    </mescroll-vue>
    <!-- <div class="upload">
      <van-icon name="plus" size="30" color="#fff" @click="toup" />
    </div>-->
  </div>
</template>
<script>
import tabbar from "../../../components/navbar";
import Vue from "vue";
import { ImagePreview } from "vant";
Vue.use(ImagePreview);
import { downFile } from "../../../common/js/common";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  data() {
    return {
      list: [],
      mescroll: null, // mescroll实例对象
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
      this.axios.post("/api/matter/getMyMetter").then(data => {
        this.list = data; //审核状态:0=待审核,1=审核通过,2=审核未通过
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
        .post("/api/matter/getMyMetter", {
          page: page.num
        })
        .then(data => {
          // 请求的列表数据
          let arr = data;
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
    getImg(index, images) {
      ImagePreview({
        images: images,
        showIndex: true,
        loop: true,
        startPosition: index
      });
    },
    // 点击下载附件
    download(src) {
      downFile(src);
    },
    // 去上传
    toup() {
      this.$router.push({
        path: "/upsucai",
        query: {
          cat: this.option
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.sucaiconter {
  font-size: 14px;
  min-height: 100vh;
  background: #f5f5f5;
  .mescroll {
    position: fixed;
    top: 0px;
    bottom: 0;
    height: auto;
  }
  .con {
    padding-top: 44px;
    margin-top: -1px;
    .item {
      margin-bottom: 10px;
      background: #fff;
      .content {
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
          flex: 1;
          .top {
            .username {
              font-size: 16px;
              color: #82b5ff;
            }
            .time {
              color: #999;
              font-size: 12px;
            }
            .state {
              color: #fc4c4c;
            }
          }
          .bottom {
            margin-top: 10px;
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
              .van-image {
                margin-right: 6px;
              }
            }
          }
        }
      }
      .like {
        padding: 0 10px;
        height: 40px;
        button {
          margin-left: 10px;
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
