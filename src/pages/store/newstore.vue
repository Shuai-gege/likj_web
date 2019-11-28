<template>
  <div class="money">
    <navbar title="管理仓库"></navbar>
    <!-- 商品 -->
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="car" v-for="(item,i) in list" :key="i">
        <div class="cardateil flex_l">
          <!-- 点击图片勾选 -->
          <van-checkbox v-model="item.checked" checked-color="#fc4c4c" @change="change"></van-checkbox>
          <van-image
            width="2.2rem"
            height="2.2rem"
            fit="cover"
            radius="5"
            :src="item.cover_Image"
            style="margin-left:6px;margin-top:8px;"
            @click="toDetail(item.goods_id,item.goods_size_id,item.num)"
          />
          <!-- 商品名字、价钱 -->
          <div class="item" style="width:182px;">
            <p
              @click="toDetail(item.goods_id,item.goods_size_id,item.num)"
              style="font-size:16px;color:#333;margin-bottom:3px;"
              class="yihang"
            >{{item.name}}</p>
            <p style="color:#FF4444;font-size:13px;margin-top:5px;" class="flex">
              <span @click="toDetail(item.goods_id,item.goods_size_id,item.num)">
                ￥
                <span style="font-size:17px;margin-left:-3px;">{{item.price}}</span>
              </span>
              <van-stepper v-model="item.buy_num" :max="item.num" @change="changeNum($event,i)" />
            </p>
            <div
              class="size flex"
              style="margin-top:10px;"
              @click="toDetail(item.goods_id,item.goods_size_id,item.num)"
            >
              <i
                style="background:#f5f5f5;padding:2px 8px;border-radius:8px;"
              >{{item.size_name+item.size_value}}</i>
              <span v-if="item.is_in">
                现有库存：
                <i style="color:#fc4c4c;">{{item.stock}}</i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </mescroll-vue>
    <!-- 提交订单 -->
    <van-submit-bar button-text="入库" @submit="add" class="btm">
      <van-checkbox v-model="checked1" checked-color="#fc4c4c" @click="changeQuan">全选</van-checkbox>
      <van-button type="primary" size="large" @click="sub">出库</van-button>
    </van-submit-bar>
  </div>
</template>

<script>
import navbar from "@/components/navbar";
import MescrollVue from "mescroll.js/mescroll.vue";
import { Dialog } from "vant";
export default {
  components: {
    navbar,
    MescrollVue // 注册mescroll组件
  },
  data() {
    return {
      type: 0, //0 直接购买 2 放入云仓
      checked1: false, //全选
      list: [], //列表数据
      price: 0, //总价

      mescroll: null, // mescroll实例对象
      mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
      }
    };
  },
  mounted() {
    // this.init();
  },
  methods: {
    // 入库
    add() {
      let goods = [];
      let flag1 = false; //是否选了商品
      this.list.forEach(item => {
        if (item.checked) {
          flag1 = true;
          goods.push(
            item.goods_id + "|" + item.goods_size_id + "|" + item.buy_num
          );
        }
      });
      if (!flag1) {
        this.$toast("请选择商品");
      } else {
        this.axios
          .post("/api/goods/addAgentShopGoods", {
            goods: goods.join(","),
            up_type: 1
          })
          .then(data => {
            this.$toast("入库成功");
            let _this = this;
            setTimeout(() => {
              _this.$router.go(-1);
            }, 1000);
          });
      }
    },
    // 出库
    sub() {
      let goods = [];
      let flag = ""; //库存是否够出库
      let flag1 = false; //是否选了商品
      this.list.forEach(item => {
        if (item.checked) {
          flag1 = true;
          // 出库判断库存>buy_num
          if (item.buy_num > item.stock) {
            flag = item.name;
          } else {
            goods.push(
              item.goods_id + "|" + item.goods_size_id + "|" + item.buy_num
            );
          }
        }
      });
      if (!flag1) {
        this.$toast("请选择商品");
      } else if (flag) {
        this.$toast(flag + "库存不足");
      } else {
        this.axios
          .post("/api/goods/addAgentShopGoods", {
            goods: goods.join(","),
            up_type: 2
          })
          .then(data => {
            this.$toast("出库成功");
            let _this = this;
            setTimeout(() => {
              _this.$router.go(-1);
            }, 1000);
          });
      }
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      console.log(page);
      // this.init(page.num, mescroll);
      this.axios
        .post("/api/goods/getGoods", {
          page: page.num
        })
        .then(data => {
          // this.list = data;
          // 请求的列表数据
          data.forEach(item => {
            this.$set(item, "checked", false);
            this.$set(item, "buy_num", 1);
          });
          let arr = data;
          // 如果是第一页需手动置空列表
          if (page.num === 1) {
            this.list = [];
          }
          // 把请求到的数据添加到列表
          this.list = this.list.concat(arr);
          if (page.num > 1) {
            this.change();
          }
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
    // 点击复选框时触发，引发全选
    change() {
      let flag = 0;
      this.list.forEach(item => {
        if (!item.checked) {
          flag = 1;
          this.checked1 = false;
        }
      });
      if (!flag) {
        this.checked1 = true;
      }
      this.getPrice();
    },
    // 点击全选时触发
    changeQuan() {
      if (!this.checked1) {
        this.list.forEach(item => {
          item.checked = true;
        });
      } else {
        this.list.forEach(item => {
          item.checked = false;
        });
      }
      this.getPrice();
    },
    // 改变数量
    changeNum(e, i) {
      console.log(e); //数量
      console.log(i); //索引
      this.list[i].buy_num = e;
      this.getPrice();
    },
    // 计算总价格
    getPrice() {
      let price = 0;
      this.list.forEach(item => {
        if (item.checked) {
          price += parseFloat(item.self_price) * item.buy_num;
        }
      });
      this.price = price * 100;
    },
    // 详情
    toDetail(goods_id, size_id, number) {
      console.log(number); //库存

      this.$router.push({
        path: "/stockdetail",
        query: {
          num: number,
          goods_id: goods_id,
          size_id: size_id
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.money {
  background: #f5f5f5;
  padding: 44px 10px 50px;
  min-height: 100vh;
  color: #666;

  .mescroll {
    position: fixed;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
    height: auto;
  }
  .car {
    padding: 0 10px 0 5px;
    background-color: #fff;
    height: 120px;
    border-radius: 10px;
    margin: 10px 6px;
    .item {
      flex: 1;
      margin-left: 10px;
    }
  }
  .cardateil {
    padding: 8px 0;
  }
  .btn {
    height: 110px;
    border-radius: 15px;
  }
  .btm {
    .van-submit-bar__bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .van-checkbox {
      width: 30%;
      margin-left: 4%;
    }
    button {
      width: 28%;

      &:nth-of-type(1) {
        background: #05c3a4;
        border-color: #05c3a4;
        margin-left: 10%;
      }
    }
  }
  .shangpin {
    margin: 8px 0;
  }
}
</style>
