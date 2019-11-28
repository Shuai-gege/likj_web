<template>
  <div class="money">
    <navbar title="云仓"></navbar>
    <div class="null" v-if="list.length==0">云仓暂无商品~快去挑选吧</div>
    <!-- 商品 -->
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="car" v-for="(item,i) in list" :key="i">
        <div class="cardateil flex_l">
          <!-- 点击图片勾选 -->
          <van-checkbox v-model="item.checked" checked-color="#fc4c4c" @change="change"></van-checkbox>
          <van-image
            width="90px"
            height="90px"
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
              style="font-size:16px;color:#333;margin-bottom:5px;"
              class="yihang"
            >{{item.name}}</p>
            <p style="color:#FF4444;font-size:13px;margin:10px 0" class="flex">
              <span @click="toDetail(item.goods_id,item.goods_size_id,item.num)">
                ￥
                <span style="font-size:17px;margin-left:-3px;">{{item.self_price}}</span>
              </span>
              <van-stepper v-model="item.buy_num" :max="item.num" @change="changeNum($event,i)" />
            </p>
            <div
              class="size flex"
              style="margin-top:5px;"
              @click="toDetail(item.goods_id,item.goods_size_id,item.num)"
            >
              <i
                style="background:#f5f5f5;padding:2px 8px;border-radius:8px;"
              >{{item.size_name+item.size_value}}</i>
              <i>库存：{{item.num}}</i>
            </div>
          </div>
        </div>
      </div>
    </mescroll-vue>
    <!-- 提交订单 -->
    <van-submit-bar :price="price" button-text="提货" @submit="onSubmit" class="btm">
      <van-checkbox v-model="checked1" checked-color="#fc4c4c" @click="changeQuan">全选</van-checkbox>
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
    init() {
      this.axios
        .post("/api/goods_order/warehouseList", {
          page: this.page
        })
        .then(data => {
          data.forEach(item => {
            this.$set(item, "checked", false);
            this.$set(item, "buy_num", 1);
          });
          this.list = data;
        });
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
        .post("/api/goods_order/warehouseList", {
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

    // 提交订单
    onSubmit() {
      let cart_ids = [];
      this.list.forEach(item => {
        if (item.checked) {
          cart_ids.push(
            item.goods_id + "|" + item.goods_size_id + "|" + item.buy_num
          );
        }
      });
      if (cart_ids.length == 0) {
        this.$toast("请选择商品");
      } else {
        this.$router.push({
          path: "/confirmOrder",
          query: {
            type: 1,
            cart_ids: cart_ids.join(",")
          }
        });
      }
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
      padding-left: 10px;
    }
  }
  .shangpin {
    margin: 8px 0;
  }
}
</style>
