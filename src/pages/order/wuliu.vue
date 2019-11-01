<template>
  <div class="wuliu">
    <tabbar title="物流信息"></tabbar>
    <div class="con">
      <div class="goods">
        <div class="top flex_l">
          <van-image width="2.5rem" height="2.5rem" fit="cover" :src="initdata.cover_Image" />
          <div class="pro">
            <div class="name erhang">{{initdata.name}}</div>
            <div class="price">
              <i>￥</i>
              {{initdata.goods_money}}
            </div>
          </div>
        </div>
      </div>
      <div class="compony">
        <p>
          物流公司：
          <i>{{initdata.company}}</i>
        </p>
        <p>
          物流单号：
          <i>{{initdata.express_no}}</i>
        </p>
        <!-- 2=在途中,3=签收,4=问题件 -->
        <p>
          物流状态：
          <i v-if="initdata.state==2">在途中</i>
          <i v-if="initdata.state==3">已签收</i>
          <i v-if="initdata.state==4">处理问题中</i>
        </p>
      </div>
      <van-steps direction="vertical" :active="0" active-color="#fc4c4c">
        <van-step v-for="(item,i) in wuliu" :key="i">
          <h3>{{item.AcceptStation}}</h3>
          <p>{{item.AcceptTime}}</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
export default {
  components: {
    tabbar
  },
  data() {
    return {
      order_id: "",
      initdata: {},
      wuliu: []
    };
  },
  mounted() {
    this.order_id = this.$route.query.order_id;
    console.log(this.order_id);

    this.init();
  },
  methods: {
    init() {
      this.axios
        .post("/api/goods_order/getExpressInfo", {
          order_id: this.order_id
        })
        .then(data => {
          console.log(data);

          this.initdata = data;
          this.wuliu = data.traces;
        });
    }
  }
};
</script>
<style lang="less">
.wuliu {
  .con {
    margin-top: 44px;
    .goods {
      margin-top: -1px;
      padding: 10px;
      border-bottom: 1px solid #f5f5f5;
      img {
        border-radius: 5px;
        border: 1px solid #f5f5f5;
      }
      .pro {
        flex: 1;
        margin-left: 10px;
        .name {
          font-size: 16px;
          margin-bottom: 10px;
          color: #333;
        }
        .price {
          color: red;
          font-size: 14px;
          i {
            font-size: 10px;
          }
        }
      }
      .foot {
        margin-top: 5px;
        text-align: right;
      }
    }
    .compony {
      padding: 10px;
      font-size: 14px;
      color: #333;
      i {
        color: #999;
      }
    }
    .van-step__title {
      font-size: 12px;
      h3 {
        font-weight: normal;
      }
    }
  }
}
</style>