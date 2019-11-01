<template>
  <!-- 商品列表 -->
  <div class="list flex">
    <div class="null" v-if="list.length==0" style="text-align:center;width:100%;">暂无商品</div>
    <li @click="godetail(item.goods_id)" v-for="(item,i) in list" :key="i">
      <van-image
        width="100%"
        height="160px"
        radius="5"
        fit="cover"
        :src="item.cover_Image"
        style="border-radius: 5px;"
      />
      <div class="name erhang">{{item.name}}</div>
      <!-- 小标签 -->
      <!-- <span
        style="border:1px solid #ffe1e1;padding:0 8px 2px;border-radius:5px;color:#fc4c4c;display:inline-block;margin-left:6px;"
      >{{item.label}}</span>-->
      <!-- <div class="pro yihang">匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气</div> -->
      <div class="price" v-if="item.price==item.self_price">
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
    </li>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["list"],
  mounted() {},
  methods: {
    godetail(id) {
      this.$router.push({
        path: "detail",
        query: {
          goods_id: id
        }
      });
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
    background: #f5f5f5;
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
  }
}
</style>

