<template>
  <!-- 商品列表 -->
  <div class="list flex">
    <!-- <div class="null" v-if="list.length==0" style="text-align:center;width:100%;">暂无商品</div> -->
    <li v-for="(item,i) in list" :key="i">
      <van-image
        width="100%"
        height="160px"
        radius="5"
        fit="cover"
        :src="item.cover_Image"
        style="border-radius: 5px;"
        @click="godetail(item.goods_id,item.goods_size_id,item.stock)"
      />
      <div
        class="name erhang"
        @click="godetail(item.goods_id,item.goods_size_id,item.stock)"
      >{{item.name}}</div>
      <div class="flex" @click="godetail(item.goods_id,item.goods_size_id,item.stock)">
        <div class="price" v-if="item.price==item.self_price||!item.self_price">
          <i style="margin-right:-5px;font-weight:400;font-size:12px;">￥</i>
          {{item.price}}
        </div>
        <div v-else class="price">
          <i style="margin-right:-5px;font-weight:400;">￥</i>
          {{item.self_price}}
          <s
            style="color:#999;font-size:10px;margin-left:5px;font-weight:400;"
          >￥{{item.price}}</s>
        </div>
        <div class="num" v-if="store">库存：{{item.stock}}</div>
      </div>
      <!-- 品牌分类 -->
      <div class="cat flex_l">
        <div class="item">{{item.brand_name}}</div>
        <div class="item">{{item.category_name}}</div>
      </div>
      <!-- 上下架开关 -->
      <div v-if="store" class="flex_r" style="color:#999;padding:3px;">
        <span style="color:#85C4D3;margin:0 3px;">下架</span>
        <van-switch
          :value="item.checked"
          @input="onInput(i,item.id)"
          size="15px"
          active-color="#FFB305"
        />
        <span style="color:#fc4c4c;margin:0 3px;">上架</span>
      </div>
    </li>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  data() {
    return {};
  },
  props: ["list", "store"],
  mounted() {},
  methods: {
    godetail(id, size_id, num) {
      if (this.store) {
        this.$router.push({
          path: "/stockdetail",
          query: {
            goods_id: id,
            size_id: size_id,
            num: num
          }
        });
      } else {
        this.$router.push({
          path: "/detail",
          query: {
            goods_id: id
          }
        });
      }
    },
    // 上下架开关
    onInput(i, id) {
      this.$emit("upDown", i, id);
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  padding: 12px;
  flex-wrap: wrap;
  margin-top: -1px;

  .null {
    background: #fff;
  }
  li {
    background-color: #fff;
    width: 48%;
    margin-bottom: 10px;
    // box-shadow: 1px 3px 5px #f5f5f5;
    border-radius: 5px;
    border: 1px solid #f5f5f5;
    padding: 5px;
    .name {
      font-size: 14px;
      margin: 5px 5px 3px;
      color: #333;
      height: 40px;
    }
    .pro {
      font-size: 12px;
      color: #666;
      margin: 0 5px;
    }
    .price {
      font-size: 16px;
      color: #f00;
      font-weight: 700;
      margin: 4px 5px;
      i {
        font-size: 14px;
      }
    }
    .cat {
      .item {
        padding: 1px 6px;
        border-radius: 5px;
        font-size: 12px;
        margin-right: 5px;
        background-color: #12c9a1;
        color: #fff;
        &:nth-of-type(1) {
          background-color: #fa9d9d;
        }
      }
    }
  }
  .van-switch--on {
    margin: 0 5px;
  }
}
</style>

