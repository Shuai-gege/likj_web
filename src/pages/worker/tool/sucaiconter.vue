<template>
  <div class="sucaiconter">
    <!-- 头部公共搜索框 -->
    <tabbar title="素材中心"></tabbar>
    <div class="con">
      <van-tabs v-model="active" :sticky="true">
        <van-tab title="全部">
          <div class="item">
            <div class="content flex_l">
              <div class="left">
                <img src="../../../image/bgt2.png" alt />
              </div>
              <div class="right">
                <div class="top">
                  <p class="username">季帅帅</p>
                  <p class="time">2019.11.04</p>
                </div>
                <div class="bottom">
                  <div class="text">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sunt itaque veritatis perferendis hic inventore obcaecati harum voluptatum, unde excepturi ea, non esse laudantium veniam? Nobis cum quisquam velit corrupti!</p>
                  </div>
                  <div class="imgs">
                    <van-image
                      width="2rem"
                      height="2rem"
                      fit="cover"
                      src="https://img.yzcdn.cn/vant/cat.jpeg"
                      @click="getImg1()"
                    />
                    <van-image
                      width="2rem"
                      height="2rem"
                      fit="cover"
                      src="https://img.yzcdn.cn/vant/cat.jpeg"
                      @click="getImg1()"
                    />
                    <van-image
                      width="2rem"
                      height="2rem"
                      fit="cover"
                      src="https://img.yzcdn.cn/vant/cat.jpeg"
                      @click="getImg1()"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="like flex">
              <van-icon :name="like" @click="zan" size="20" color="#fc4c4c" />
              <p>
                阿斯达四大
                <van-button
                  type="primary"
                  color="linear-gradient(to right, #4bb0ff, #6149f6)"
                  size="mini"
                >下载</van-button>
              </p>
            </div>
          </div>
        </van-tab>
        <van-tab title="图片">
          <div class="item">
            <div class="content flex_l">
              <div class="left">
                <img src="../../../image/bgt2.png" alt />
              </div>
              <div class="right">
                <div class="top">
                  <p class="username">季帅帅</p>
                  <p class="time">2019.11.04</p>
                </div>
                <div class="bottom">
                  <div class="imgs">
                    <van-image
                      width="2rem"
                      height="2rem"
                      fit="cover"
                      src="https://img.yzcdn.cn/vant/cat.jpeg"
                      @click="getImg1()"
                    />
                    <van-image
                      width="2rem"
                      height="2rem"
                      fit="cover"
                      src="https://img.yzcdn.cn/vant/cat.jpeg"
                      @click="getImg1()"
                    />
                    <van-image
                      width="2rem"
                      height="2rem"
                      fit="cover"
                      src="https://img.yzcdn.cn/vant/cat.jpeg"
                      @click="getImg1()"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="like flex">
              <van-icon :name="like" @click="zan" size="20" color="#fc4c4c" />
              <p>
                阿斯达四大
                <van-button
                  type="primary"
                  color="linear-gradient(to right, #4bb0ff, #6149f6)"
                  size="mini"
                >下载</van-button>
              </p>
            </div>
          </div>
        </van-tab>
        <van-tab title="纯文案">
          <div class="item">
            <div class="content flex_l">
              <div class="left">
                <img src="../../../image/bgt2.png" alt />
              </div>
              <div class="right">
                <div class="top">
                  <p class="username">季帅帅</p>
                  <p class="time">2019.11.04</p>
                </div>
                <div class="bottom">
                  <div class="text">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sunt itaque veritatis perferendis hic inventore obcaecati harum voluptatum, unde excepturi ea, non esse laudantium veniam? Nobis cum quisquam velit corrupti!</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="like flex">
              <van-icon :name="like" @click="zan" size="20" color="#fc4c4c" />
              <p>
                阿斯达四大
                <van-button
                  type="primary"
                  color="linear-gradient(to right, #4bb0ff, #6149f6)"
                  size="mini"
                >下载</van-button>
              </p>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="upload">
      <van-icon name="plus" size="30" color="#fff" @click="$router.push('/upsucai')" />
    </div>
  </div>
</template>
<script>
import tabbar from "../../../components/navbar";
import Vue from "vue";
import { ImagePreview } from "vant";
Vue.use(ImagePreview);
export default {
  data() {
    return {
      active: 0, //tab切换
      like: "star-o", //点赞
      show: false
    };
  },
  components: {
    tabbar
  },
  mounted() {},
  methods: {
    getImg1() {
      ImagePreview({
        images: ["https://img.yzcdn.cn/vant/cat.jpeg"],
        showIndex: true,
        loop: true,
        startPosition: 0
      });
    },
    zan() {
      if (this.like == "star-o") {
        this.like = "star";
      } else {
        this.like = "star-o";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.sucaiconter {
  padding-top: 44px;
  font-size: 14px;
  min-height: 100vh;
  background: #f5f5f5;
  .con {
    .item {
      margin-bottom: 10px;
      background: #fff;
      .content {
        padding: 10px;
        align-items: flex-start;
        border-bottom: 1px solid #f5f5f5;
        .left {
          margin-right: 15px;
          img {
            width: 50px;
            height: 50px;
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
          .bottom {
            margin-top: 10px;
            .text {
              color: #666;
            }
            .imgs {
              margin-top: 10px;
            }
          }
        }
      }
      .like {
        padding: 0 10px;
        height: 40px;
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
