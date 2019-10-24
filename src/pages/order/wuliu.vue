<template>
  <div class="wuliu">
    <tabbar title="物流信息"></tabbar>
    <div class="con">
      <div class="goods">
        <div class="top flex_l">
          <van-image
            width="2.5rem"
            height="2.5rem"
            fit="contain"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="pro">
            <div class="name erhang">商品名字商品名字商品</div>
            <div class="price">
              <i>￥</i>88.00
            </div>
          </div>
        </div>
      </div>

      <van-steps direction="vertical" :active="0" active-color="#fc4c4c">
        <van-step>
          <h3>【城市】物流状态1</h3>
          <p>2016-07-12 12:40</p>
        </van-step>
        <van-step>
          <h3>【城市】物流状态2</h3>
          <p>2016-07-11 10:00</p>
        </van-step>
        <van-step>
          <h3>快件已发货</h3>
          <p>2016-07-10 09:30</p>
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
    return {};
  },
  mounted() {},
  methods: {}
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
    .van-step__title {
      font-size: 12px;
      h3 {
        font-weight: normal;
      }
    }
  }
}
</style>