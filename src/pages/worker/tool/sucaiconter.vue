<template>
  <div class="sucaiconter">
    <!-- 头部公共搜索框 -->
    <tabbar title="素材中心" navbar_right_name="我的素材" navbar_right_link="/mysucai"></tabbar>
    <div class="con">
      <van-dropdown-menu active-color="#fc4c4c">
        <van-dropdown-item
          :title="title1"
          v-model="value1"
          :options="option"
          @change="getval1"
          @close="color"
        />
        <van-dropdown-item
          :title="title2"
          v-model="value2"
          :options="option"
          @change="getval2"
          @close="color"
        />
      </van-dropdown-menu>
      <div class="item" v-for="(item, i) in list" :key="i">
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
              <!-- <div class="save" @click="save(item.images)">一键保存</div> -->
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
    </div>
    <div class="upload">
      <van-icon name="plus" size="30" color="#fff" @click="toup" />
    </div>
  </div>
</template>
<script>
import tabbar from "../../../components/navbar";
import Vue from "vue";
import { ImagePreview } from "vant";
Vue.use(ImagePreview);
import { downFile } from "../../../common/js/common";
export default {
  data() {
    return {
      title1: "官方素材",
      title2: "团队素材",
      value1: "",
      value2: "",
      option: [],
      type: 1, //1 官方素材  2 团队素材
      category_id: "", //分类id
      list: []
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.axios
        .post("/api/matter/matterList", {
          page: 1,
          type: this.type,
          category_id: this.category_id
        })
        .then(data => {
          this.option = data.matter_category;
          this.list = data.matter_list;
        });
    },
    getval1(value) {
      this.type = 1;
      document.querySelectorAll(
        ".van-dropdown-menu__title div"
      )[0].style.color = "red";
      document.querySelectorAll(
        ".van-dropdown-menu__title div"
      )[1].style.color = "#333";

      this.category_id = value;
      this.init();
      this.option.forEach(item => {
        if (item.value == value) {
          this.title1 = item.text;
        }
      });
    },
    getval2(value) {
      this.type = 2;
      document.querySelectorAll(
        ".van-dropdown-menu__title div"
      )[1].style.color = "red";
      document.querySelectorAll(
        ".van-dropdown-menu__title div"
      )[0].style.color = "#333";
      this.category_id = value;
      this.init();
      this.option.forEach(item => {
        if (item.value == value) {
          this.title2 = item.text;
        }
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
    //下拉菜单关闭后
    color() {},
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
  .con {
    padding-top: 44px;
    margin-top: -1px;

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
