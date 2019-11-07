<template>
  <div class="box">
    <!-- 头部 -->
    <tabbar title="商品详情"></tabbar>
    <!-- 中间部分 -->
    <van-row>
      <van-col span="24" v-if="initdata.lunbo">
        <van-swipe @change="onChange" :height="251">
          <van-swipe-item class="Show1" v-for="(item ,i) in initdata.lunbo" :key="i">
            <van-image width="100%" height="251" fit="cover" :src="item" />
          </van-swipe-item>
          <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{initdata.lunbo.length}}</div>
        </van-swipe>
      </van-col>
      <van-col span="22" offset="1">
        <div class="article">{{initdata.name}}</div>
      </van-col>
      <van-col span="22" offset="1">
        <div class="flex_l">
          <span class="price flex_l" style="font-size:20px;color:#f00">
            <img src="../../image/图标/jinbi.png" alt />
            {{goodsMsg.price}}
            <s
              style="color:#999;font-weight:400;font-size:12px;margin-left:10px"
            >￥{{sizes.price}}</s>
          </span>
        </div>
        <div class="flex" style="margin-top:8px;">
          <span>规格：{{goodsMsg.size_name+goodsMsg.size_value}}</span>
          <span>库存：{{num}}</span>
        </div>
      </van-col>
    </van-row>
    <!-- <div class="DHL flex">
      <p>快递：包邮</p>
      <p>已售：3654份</p>
    </div>-->
    <van-divider />
    <!-- 商品详情展示 -->
    <div class="datail">
      <p style="margin-bottom:15px;">商品详情</p>
      <div v-html="detail"></div>
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
import axios from "axios";
import { Dialog } from "vant";
export default {
  data() {
    return {
      goods_id: "",
      size_id: "", //规格id
      num: "", //云仓提货的库存
      initdata: {}, //产品详情
      sizes: {}, //商品规则
      sizeArr: [], //规格名字数组
      active: 0, //点击规格
      goodsMsg: {}, //当前规格商品弹窗信息

      button: 0, //点击加入购物车 1  点击立即购买 2
      current: 0, //轮播图当前
      show: false, //商品规格弹窗
      value: 1, //购买数量
      detail: ""
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.goods_id = this.$route.query.goods_id;
    this.size_id = this.$route.query.size_id;
    this.num = this.$route.query.num;
    this.init();
  },
  methods: {
    init() {
      this.axios
        .post("/api/goods/goodsInfo", { goods_id: this.goods_id })
        .then(data => {
          this.$set(data, "lunbo", data.carousel_images.split(","));
          this.initdata = data;
          this.detail = data.details.replace(/<img/g, '<img width="100%"');
          data.size.forEach((item, i) => {
            if (item.goods_size_id == this.size_id) {
              this.sizes = data.size[i];
            }
          });

          data.size.forEach(item => {
            this.sizeArr.push(item.size_name + item.size_value);
          });
          if (this.size_id) {
            data.size.forEach((item, i) => {
              if (item.goods_size_id == this.size_id) {
                this.goodsMsg = data.size[i];
                this.active = i;
              }
            });
            console.log(this.goodsMsg);
          } else {
            this.goodsMsg = data.size[0];
            this.size_id = this.goodsMsg.goods_size_id;
          }
        });
    },
    // 点击商品规格
    getSize(i) {
      this.active = i;
      this.goodsMsg = this.sizes[i]; //商品弹窗信息
      this.value = 1;
      console.log(this.sizeArr);
      this.size_id = this.goodsMsg.goods_size_id;
    },

    onChange(index) {
      this.current = index;
    },
    // 点击加入购物车和立即购买
    text(i) {
      this.show = true;
      this.button = i;
    }
  }
};
</script>
<style lang="less" scoped>
.box {
  padding-top: 44px;
}
.van-goods-action {
  z-index: 2;
}

.Show1 {
  height: 300px;
  background: #f1f1f1;
}

.custom-indicator {
  background: rgba(28, 28, 28, 0.5);
  padding: 5px 15px;
  text-align: center;
  border-radius: 14px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
}

.article {
  font-size: 18px;
  color: #333;
  margin: 10px 0;
  font-weight: 600;
}
.price {
  font-size: 20px;
  font-weight: 700;
  margin-right: 15px;
  img {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
  // i {
  //   font-size: 14px;
  //   font-weight: normal;
  //   margin-right: -5px;
  // }
}
.yard {
  margin: 1.25rem;

  img {
    width: 30px;
    height: 30px;
    display: inline;
  }
}

.DHL {
  margin: 0 15px;
}

.datail {
  // padding: 0 15px;
  p {
    font-size: 16px;
    color: #333;
    margin-top: 15px;
    margin-left: 12px;
    border-left: 3px solid red;
    height: 18px;
    line-height: 18px;
    padding-left: 10px;
  }
}

.head {
  margin: 15px;
  display: flex;

  img {
    width: 110px;
    height: 110px;
    border: 1px solid #cecece;
    border-radius: 10px;
  }

  .Font {
    margin: 13px;

    .price {
      font-size: 20px;
      color: #f00;
      margin-bottom: 30px;

      b {
        font-size: 28px;
      }
    }
  }
}

.size {
  margin: 15px;

  p {
    font-size: 14px;
    margin-bottom: 10px;
  }

  span {
    display: block;
    margin-right: 20px;
    padding: 7px 20px;
    background: #eee5e5;
    border-radius: 10px;
    &.active {
      background-color: rgb(241, 76, 76);
      color: #fff;
    }
  }
}

.colour {
  margin: 15px;

  p {
    font-size: 14px;
    margin-bottom: 10px;
  }

  h6 {
    display: inline;
  }

  img {
    margin-right: 5px;
    width: 20px;
    height: 20px;
    display: inline;
  }

  span {
    height: 30px;
    margin-right: 20px;
    padding: 10px;
    background: #eee5e5;
    border-radius: 10px;
    &.active {
      background-color: rgb(241, 76, 76);
      color: #fff;
    }
  }
}

.num {
  margin: 15px;
  margin-bottom: 60px;
  font-size: 14px;
}
</style>