<template>
  <div class="box">
    <!-- 头部 -->
    <tabbar title="商品详情"></tabbar>
    <!-- 中间部分 -->
    <van-row>
      <van-col span="24" v-if="initdata.lunbo">
        <van-swipe @change="onChange" :height="270" :autoplay="3000">
          <van-swipe-item class="Show1" v-for="(item ,i) in initdata.lunbo" :key="i">
            <van-image width="100%" height="270" fit="cover" :src="item" />
          </van-swipe-item>
          <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{initdata.lunbo.length}}</div>
        </van-swipe>
      </van-col>
      <van-col span="22" offset="1">
        <div class="flex_l">
          <span class="price flex_l" style="font-size:20px;color:#f00" v-if="sizes[0]">
            <img src="../../image/图标/jinbi.png" alt />
            {{sizes[0].self_price}}
            <s>￥{{sizes[0].price}}</s>
          </span>
          <!-- <van-tag round type="warning">标签</van-tag> -->
          <!-- <p>
            价格
            <s>￥16</s>
          </p>-->
        </div>
      </van-col>
      <van-col span="22" offset="1">
        <div class="article">
          {{initdata.name}}
          <!-- <van-tag mark type="warning">{{initdata.label}}</van-tag> -->
        </div>
        <!-- 小标签 -->
        <!-- <p>剩余：{{initdata.number}}</p> -->
      </van-col>
    </van-row>
    <!-- <div class="DHL flex">
      <p>快递：包邮</p>
      <p>已售：3654份</p>
    </div>-->
    <van-divider />
    <!-- 商品详情展示 -->
    <div class="datail">
      <p class="title">商品详情</p>
      <div v-html="detail"></div>
    </div>

    <!-- 选择规格 -->
    <van-action-sheet v-model="show" round title="选择商品规格">
      <div class="head flex_l">
        <img :src="goodsMsg.size_image" alt />
        <div class="Font">
          <p class="price">
            ￥
            <b>{{goodsMsg.self_price}}</b>
          </p>
          <!-- 最低提货量 -->
          <p style="color:#666;font-size:14px;">
            最低提货
            <i style="color:#F04C46;">{{goodsMsg.self_pick}}</i>
          </p>
          <div class="number flex" style="color:#666,;font-size:13px;width:200px;margin-top:15px;">
            <p>库存：{{goodsMsg.stock}}</p>
            <p>销量：{{goodsMsg.sales}}</p>
          </div>
        </div>
      </div>
      <!-- 规格-->
      <div class="size">
        <p>商品规格</p>
        <div class="flex_l">
          <span
            :class="active==i?'active':''"
            v-for="(item,i) in sizeArr"
            :key="i"
            @click="getSize(i)"
          >{{item}}</span>
        </div>
      </div>
      <van-divider />
      <van-divider />
      <!-- 步进器 -->
      <div class="flex num">
        <p>购买数量</p>
        <van-stepper
          v-model="value"
          :min="goodsMsg.self_pick"
          :max="goodsMsg.stock"
          :disabled="goodsMsg.stock==0"
        />
      </div>
      <!-- 按钮 -->
      <van-button type="primary" color="#f04c46" size="large" @click="gopay">确定</van-button>
    </van-action-sheet>

    <!-- 尾部 -->
    <van-goods-action style="border-top:1px solid #f5f5f5;">
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" v-if="type!=1" text="购物车" @click="$router.push('/car')" />
      <van-goods-action-button v-if="!type" type="warning" text="加入购物车" @click="text(1)" />
      <van-goods-action-button v-if="!type" type="danger" text="立即购买" @click="text(2)" />
      <van-goods-action-button
        v-if="type"
        type="danger"
        style="margin-left:150px;"
        text="立即提货"
        @click="text(2)"
      />
    </van-goods-action>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
import axios from "axios";
import { Dialog } from "vant";
export default {
  data() {
    return {
      type: null, //列表类型 0 商城列表  1 本地仓库列表
      goods_id: "",
      size_id: "", //规格id
      initdata: {}, //产品详情
      sizes: [], //商品规则
      sizeArr: [], //规格名字数组
      active: 0, //点击规格
      goodsMsg: {}, //当前规格商品弹窗信息

      button: 0, //点击加入购物车 1  点击立即购买 2
      current: 0, //轮播图当前
      show: false, //商品规格弹窗
      value: 1, //购买数量
      detail: "" //详情
    };
  },
  components: {
    tabbar
  },
  methods: {
    init() {
      this.axios
        .post("/api/goods/goodsInfo", { goods_id: this.goods_id })
        .then(data => {
          this.$set(data, "lunbo", data.carousel_images.split(","));
          this.initdata = data;
          // console.log("jiu详情", data.details);
          this.detail = data.details.replace(/<img/g, '<img width="100%"');
          // this.detail = data.details
          //   .replace(/width="*[0-9]*"/g, 'width="100%"')
          //   .replace(/height="*[0-9]*"/g, 'height="auto"');
          // console.log("xin详情", this.detail);

          this.sizes = data.size;
          data.size.forEach(item => {
            this.sizeArr.push(item.size_name + item.size_value);
          });
          if (this.size_id) {
            data.size.forEach((item, i) => {
              if (item.goods_size_id == this.size_id) {
                this.goodsMsg = data.size[i];
                this.value = this.goodsMsg.self_pick;
                this.active = i;
              }
            });
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
      this.value = this.goodsMsg.self_pick;
      console.log(this.sizeArr);
      this.size_id = this.goodsMsg.goods_size_id;
    },
    // 点击弹窗确定按钮
    gopay() {
      if (this.goodsMsg.self_pick - 1 >= this.value) {
        this.$toast("您的最低购买数量为" + this.goodsMsg.self_pick);
      } else {
        if (this.goodsMsg.stock == 0) {
          this.$toast("该商品库存不足");
        } else {
          if (this.button == 2) {
            if (this.type != 1) {
              this.type = 2;
              this.$router.push({
                path: "/confirmOrder",
                query: {
                  type: this.type,
                  cart_ids:
                    this.goods_id + "|" + this.size_id + "|" + this.value
                }
              });
            } else {
              this.$router.push({
                path: "/confirmOrder",
                query: {
                  type: this.type,
                  cart_ids:
                    this.goods_id + "|" + this.size_id + "|" + this.value
                }
              });
            }
          } else {
            this.axios
              .post("/api/goods/editCart", {
                goods_id: this.goods_id,
                size_id: this.goodsMsg.goods_size_id,
                num: this.value,
                type: 1
              })
              .then(data => {
                this.$toast("加入购物车成功");
              });
          }
          this.show = false;
        }
      }
    },
    onChange(index) {
      this.current = index;
    },
    // 点击加入购物车和立即购买
    text(i) {
      this.show = true;
      this.button = i;
    }
  },
  mounted() {
    this.goods_id = this.$route.query.goods_id;
    this.size_id = this.$route.query.size_id;
    this.type = this.$route.query.type;
    this.init();
  },
  beforeRouteLeave: (to, from, next) => {
    Dialog.close();
    next();
  }
};
</script>
<style lang="less" scoped>
.box {
  padding-top: 44px;
  padding-bottom: 55px;
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
  font-size: 14px;
  color: #333;
  margin: 10px 0;
  font-weight: 700;
}
.price {
  font-size: 20px;
  font-weight: 700;
  margin-right: 15px;
  margin-top: 15px;
  img {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
  s {
    font-size: 12px;
    color: #999;
    margin-left: 15px;
    font-weight: 400;
  }
  // i {
  //   font-size: 18px;
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
  .title {
    font-size: 16px;
    color: #333;
    margin-top: 15px;
    border-left: 3px solid red;
    height: 18px;
    line-height: 18px;
    padding-left: 10px;
    margin: 0 0 15px 10px;
  }
  p {
    img {
      width: 100% !important;
      height: auto;
    }
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
      margin-bottom: 10px;

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