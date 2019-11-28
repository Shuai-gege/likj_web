<template>
  <div class="wuliuCode">
    <!-- 头部公共搜索框 -->
    <tabbar title="物流信息"></tabbar>
    <div class="con">
      <van-cell-group>
        <van-field
          v-model="username"
          required
          clearable
          label="物流单号"
          placeholder="请输入物流单号"
          right-icon="scan"
          @click-right-icon="scanWuliu"
        />
        <van-field
          v-model="username1"
          required
          clearable
          disabled
          label="物流公司"
          @click="wuliu"
          placeholder="请输入物流公司"
        />
        <!-- <van-field
          v-model="message"
          rows="2"
          autosize
          label="留言"
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />-->
      </van-cell-group>
      <!-- 订单商品 -->
      <div class="con1">
        <div class="top" v-for="(item,i) in list" :key="i">
          <div class="good flex_l">
            <van-image width="2rem" height="2rem" fit="cover" radius="5" :src="item.cover_Image" />
            <div class="pro">
              <div class="name yihang">{{item.name}}</div>
              <div class="price flex">
                <span>
                  <i>￥</i>
                  {{item.price}}
                </span>
                <span style="color:#666;" v-if="item.unit_info">{{item.unit_info.str}}</span>
              </div>
              <div class="size">{{item.space_name}}</div>
            </div>
          </div>
          <div class="fake">
            <div class="item flex_l">
              <span
                v-if="item.unit_info.one_name&&item.unit_info.one_num!=0"
              >{{item.unit_info.one_name}}：已扫 {{item.code1.length}} {{item.unit_info.one_name}}</span>
              <span
                v-if="item.unit_info.two_name&&item.unit_info.two_num!=0"
              >{{item.unit_info.two_name}}：已扫 {{item.code2.length}} {{item.unit_info.two_name}}</span>
              <span
                v-if="item.unit_info.three_name&&item.unit_info.three_num!=0"
              >{{item.unit_info.three_name}}：已扫 {{item.code3.length}} {{item.unit_info.three_name}}</span>
            </div>
          </div>
        </div>
        <van-button color="#fc4c4c" plain size="small" icon="scan" @click="scanFake">扫描防伪码</van-button>
      </div>
      <van-popup v-model="show" round position="bottom" :style="{ height: '50%' }">
        <van-picker
          show-toolbar
          title="选择物流公司"
          :columns="columns"
          @cancel="onCancel"
          @confirm="onConfirm"
        />
      </van-popup>
    </div>
    <van-button class="btn" type="danger" size="large" @click="submit">确定</van-button>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
import { scan } from "../../common/js/common";
export default {
  data() {
    return {
      order_id: "", //订单id
      username: "", //物流单号
      username1: "", //物流公司
      message: "", //留言

      show: false, //物流弹窗
      columns: [], //物流公司合集
      initdata: [], //物流接口
      companyCode: "", //选择的物流公司的code
      list: [] //商品信息
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.order_id = this.$route.query.order_id;
    this.init();
    this.init1();
  },
  methods: {
    // 获取物流公司
    init() {
      this.axios.post("/api/express/getExpress").then(data => {
        data.forEach(item => {
          this.columns.push(item.company);
        });
        this.initdata = data;
      });
    },
    // 获取商品信息
    init1() {
      this.axios
        .post("/api/goods_order/orderDetails", {
          id: this.order_id
        })
        .then(data => {
          data.goods_list.forEach(item => {
            this.$set(item, "show", false);
            this.$set(item, "code1", []);
            this.$set(item, "code2", []);
            this.$set(item, "code3", []);
          });
          this.list = data.goods_list;
          console.log(111111111, this.list);
        });
    },
    // 扫描物流单号
    scanWuliu() {
      scan().then(code => {
        //扫码后获取结果参数赋值给Input
        this.username = code;
        // 根据物流单号获取物流公司
        this.axios
          .post("/api/express/getExpressCompany", {
            code: this.username
          })
          .then(data => {
            this.username1 = data.company;
            this.companyCode = data.code;
          });
      });
    },
    isShow(i) {
      if (this.list[i].show) {
        this.list[i].show = false;
      } else {
        this.list[i].show = true;
      }
    },
    // 扫描防伪码 i商品索引  num code1 code2 code3 index code码数组的索引
    scanFake() {
      scan().then(code => {
        console.log(888888888888, code);
        this.axios
          .post("/api/anticf/queryDeliver", {
            code: code
          })
          .then(data => {
            // {goods_id: 24, size_id: 57, unit: 1}
            this.list.forEach(item => {
              if (data.size_id == item.size_id) {
                if (data.unit == 1) {
                  if (item.unit_info.one_num == 0) {
                    this.$toast(
                      "该商品没有" + item.unit_info.one_name + "的订单"
                    );
                  } else if (item.unit_info.one_num == item.code1.length) {
                    this.$toast(
                      "该商品" + item.unit_info.one_name + "的码已扫完"
                    );
                  } else {
                    let flag = false;
                    item.code1.forEach(item => {
                      if (item == code) {
                        this.$toast("该商品已扫过");
                        flag = true;
                      }
                    });
                    if (!flag) {
                      item.code1.push(code);
                    }
                  }
                } else if (data.unit == 2) {
                  if (item.unit_info.two_num == 0) {
                    this.$toast(
                      "该商品没有" + item.unit_info.two_name + "的订单"
                    );
                  } else if (item.unit_info.two_num == item.code1.length) {
                    this.$toast(
                      "该商品" + item.unit_info.two_name + "的码已扫完"
                    );
                  } else {
                    let flag = false;
                    item.code2.forEach(item => {
                      if (item == code) {
                        this.$toast("该商品已扫过");
                        flag = true;
                      }
                    });
                    if (!flag) {
                      item.code2.push(code);
                    }
                  }
                } else if (data.unit == 3) {
                  if (item.unit_info.three_num == 0) {
                    this.$toast(
                      "该商品没有" + item.unit_info.three_name + "的订单"
                    );
                  } else if (item.unit_info.three_num == item.code1.length) {
                    this.$toast(
                      "该商品" + item.unit_info.three_name + "的码已扫完"
                    );
                  } else {
                    let flag = false;
                    item.code3.forEach(item => {
                      if (item == code) {
                        this.$toast("该商品已扫过");
                        flag = true;
                      }
                    });
                    if (!flag) {
                      item.code3.push(code);
                    }
                  }
                }
              }
            });
          });
        console.log(2222222222, this.list);
      });
    },
    wuliu() {
      this.show = true;
    },
    onConfirm(value, index) {
      this.show = false;
      this.username1 = value;
      this.companyCode = this.initdata[index].code;
    },
    onCancel() {
      this.show = false;
    },
    submit() {
      console.log(2222222222, this.list);
      let obj = {};
      this.list.forEach(item => {
        let code1 = item.code1.filter(item => {
          return item;
        });
        let code2 = item.code2.filter(item => {
          return item;
        });
        let code3 = item.code3.filter(item => {
          return item;
        });
        obj[item.size_id + "_one_code"] = code1;
        obj[item.size_id + "_two_code"] = code2;
        obj[item.size_id + "_three_code"] = code3;
      });
      console.log(obj);

      if (!this.username) {
        this.$toast("请输入物流单号");
      } else if (!this.username1) {
        this.$toast("请选择物流公司");
      } else {
        this.axios
          .post("/api/goods_order/deliveryGoods", {
            express_no: this.username,
            express_code: this.companyCode,
            remark: this.message,
            order_id: this.order_id,
            goods_code: JSON.stringify(obj)
          })
          .then(data => {
            this.$toast("发货成功");
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.wuliuCode {
  min-height: 100vh;
  padding-top: 44px;
  .con {
    margin-top: -1px;
    margin-bottom: 70px;
    .con1 {
      margin: 10px;
      background-color: #fff;
      border-radius: 5px;
      .top {
        margin: 10px 0;
      }
      .pro {
        flex: 1;
        margin-left: 10px;
        .name {
          font-size: 14px;
          margin-bottom: 10px;
          color: #333;
        }
        .price {
          color: red;
          font-size: 13px;
          i {
            font-size: 10px;
          }
        }
        .size {
          padding: 1px 10px;
          background-color: #f5f6f7;
          color: #999;
          font-size: 10px;
          margin-top: 6px;
          display: inline-block;
          border-radius: 8px;
        }
      }
      .fake {
        padding: 10px 0;
        .item {
          border: 1px solid #f5f6f7;
          padding: 10px 8px;
          color: #0a6bfc;
          span {
            margin-right: 30px;
          }
          .van-cell {
            margin-top: 0;
          }
        }
      }
      .item {
        padding-top: 5px;
        .van-cell {
          margin-top: -8px;
          padding: 7px 0;
          &.price {
            font-size: 16px;
            .van-cell__value {
              color: #fc4c4c;
            }
          }
        }
      }
    }
  }
  .btn {
    display: block;
    position: fixed;
    bottom: 0;
  }
}
</style>
