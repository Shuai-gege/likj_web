<template>
  <div class="material">
    <tabbar title="素材中心" navbar_right_name="我的素材" navbar_right_link="/mysucai"></tabbar>
    <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
      <van-tabs v-model="active" @click="onClick" sticky :offset-top="44" :swipe-threshold="4">
        <van-tab v-for="(cat_item,index) in cat" :key="index" :title="cat_item.text">
          <div class="item" v-for="(item, i1) in list" :key="i1">
            <div class="content flex_l">
              <div class="left">
                <img :src="item.avatar" alt />
              </div>
              <div class="right">
                <div class="top flex">
                  <div>
                    <p class="username">{{ item.author }}</p>
                    <p class="time">2019.11.04</p>
                  </div>
                </div>
                <div class="bottom">
                  <div class="text">
                    <p v-html="item.content"></p>
                  </div>
                  <div class="imgs">
                    <van-image
                      width="2rem"
                      height="2rem"
                      fit="cover"
                      :src="items"
                      @click="getImg(index, item.images)"
                      v-for="(items, index) in item.images"
                      :key="index"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="like flex_r" v-if="item.enclosure">
              <span title="item.enclosure">附件</span>
              <a :href="item.enclosure">下载</a>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <div class="upload">
        <van-icon name="plus" size="30" color="#fff" @click="toup" />
      </div>
    </mescroll-vue>
  </div>
</template>
<script>
import Vue from "vue";
import { ImagePreview } from "vant";
import tabbar from "../../../components/navbar";
Vue.use(ImagePreview);
import { downFile } from "../../../common/js/common";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  data() {
    return {
      active: 0, //tab切换
      cat: [], //分类
      category_id: "", //分类id
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
    // 点击tab切换
    onClick() {
      console.log(this.active);
      this.category_id = this.cat[this.active].value;
      // this.init();
      this.mescroll.resetUpScroll();
    },
    init() {
      this.axios
        .post("/api/matter/matterList", {
          page: 1,
          category_id: this.category_id
        })
        .then(data => {
          this.cat = data.matter_category;
          this.list = data.matter_list;
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
        .post("/api/matter/matterList", {
          category_id: this.category_id,
          page: page.num
        })
        .then(data => {
          this.cat = data.matter_category;
          // 请求的列表数据
          let arr = data.matter_list;
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
    // download(src) {
    //   downFile(src);
    // },
    // 一键保存
    // save(images) {
    //   // let item =
    //   //   "https://lejiangkeji.oss-cn-beijing.aliyuncs.com/uploads/20191107/7c0eb6a72a05a25ea89b93cd734a66b9.png";
    //   images.forEach(item => {
    //     downFile(item);
    //   });
    // },
    // 去上传
    toup() {
      this.$router.push({
        path: "/upsucai",
        query: {
          cat: this.cat
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.material {
  font-size: 14px;
  min-height: 100vh;
  background: #f5f5f5;
  padding-top: 44px;
  .mescroll {
    position: fixed;
    top: 44px;
    bottom: 0;
    height: auto;
  }
  //背景色
  /deep/.van-tabs__nav {
    background-image: linear-gradient(
      to bottom,
      #fc4c4c,
      rgba(155, 14, 14, 0.979)
    );
    //tab字体
    /deep/.van-tab {
      color: #fff;
      font-size: 14px;
    }
    //选中的字体
    .van-tab--active {
      font-weight: 700;
      color: #fff;
      font-size: 15px;
    }
    .van-tabs__line {
      border: 9px solid transparent;
      border-bottom-color: #fff;
      width: 0 !important;
      background-color: transparent;
    }
  }

  .item {
    margin-bottom: 10px;
    background: #fff;
    .content {
      padding: 10px 0 10px 10px;
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
          flex: 1;
          .username {
            font-size: 16px;
            color: #82b5ff;
          }
          .time {
            color: #999;
            font-size: 12px;
          }
          .save {
            background-image: linear-gradient(to right, #68a2fa, #a887f5);
            width: 70px;
            height: 30px;
            border-radius: 15px 0 0 15px;
            color: #fff;
            text-align: center;
            line-height: 30px;
            font-size: 12px;
          }
        }
        .bottom {
          margin-top: 10px;
          margin-right: 10px;
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
      a {
        background-color: #fc4c4c;
        display: block;
        padding: 3px 8px;
        border-radius: 5px;
        color: #fff;
        margin-left: 8px;
      }
    }
  }
  // }
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
    z-index: 999;
    .van-icon-plus:before {
      line-height: 50px;
    }
  }
}
</style>
