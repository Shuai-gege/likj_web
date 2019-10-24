<template>
  <div class="category">
    <!-- 头部 -->
    <head1 @gosearch="search"></head1>
    <!-- tab切换 -->
    <div class="list flex">
      <div class="left">
        <div
          :class="index==i?'active':''"
          class="item flex"
          @click="clickTab(i,item.goods_category_id)"
          v-for="(item,i) in left"
          :key="i"
        >{{item.name}}</div>
      </div>
      <div class="right">
        <div class="null" v-if="!haslist">暂无商品</div>
        <div
          class="item flex_l"
          @click="toDetail(item.goods_id)"
          v-for="(item,i) in right"
          :key="i"
        >
          <van-image width="100" height="100" fit="cover" :src="item.cover_Image" />
          <div class="pro">
            <div class="name erhang">{{item.name}}</div>
            <!-- <van-tag plain type="primary" style="margin:6px 3px">{{item.label}}</van-tag> -->
            <span
              style="font-size:10px; border:1px solid #ffe1e1;padding:0 8px 2px;border-radius:5px;color:#fc4c4c;display:inline-block;margin-top:5px;"
            >{{item.label}}</span>
            <div class="price" v-if="item.price==item.self_price">
              <i style="margin-right:-5px;font-weight:400;font-size:12px;">￥</i>
              {{item.price}}
            </div>
            <div v-else class="price">
              <i style="margin-right:-5px;font-weight:400;font-size:12px;">￥</i>
              {{item.price}}
              <s
                style="color:#999;font-size:10px;margin-left:10px;"
              >￥{{item.self_price}}</s>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import head1 from "../../components/small-search";
export default {
  data() {
    return {
      left: [], //一级分类
      index: 0, //当前高亮
      cat_id: null, //分类id
      right: [], //分类列表
      haslist: true // 右边列表是否有数据
    };
  },
  components: {
    head1
  },
  methods: {
    init() {
      this.axios.post("/api/goods/goodsCategory").then(data => {
        this.left = data;
        this.cat_id = data[0].goods_category_id;
        this.init_r();
      });
    },
    init_r() {
      this.axios
        .post("/api/goods/index", {
          classify_id: this.cat_id
        })
        .then(data => {
          this.right = data;
          if (data.length == 0) {
            this.haslist = false;
          } else {
            this.haslist = true;
          }
        });
    },
    clickTab(i, cat_id) {
      this.index = i;
      this.cat_id = cat_id;
      this.init_r();
    },
    toDetail(id) {
      this.$router.push({
        path: "/detail",
        query: {
          goods_id: id
        }
      });
    },
    search(value) {
      this.$router.push({
        path: "/goodsList",
        query: {
          searchValue: value
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.category {
  font-size: 13px;
  height: 100vh;
  padding: 0 0 50px;
  .list {
    margin-top: -1px;
    align-items: flex-start;
    border-top: 1px solid #f5f5f5;
    .left {
      width: 84px;
      background: rgba(245, 245, 245, 1);
      height: 85.5vh;
      overflow: auto;

      .item {
        width: 100%;
        height: 60px;
        justify-content: space-around;
        position: relative;

        &.active {
          background-color: #fff;
          color: #fc5e62;

          &:before {
            content: "";
            width: 6px;
            height: 40px;
            position: absolute;
            left: 0;
            top: 50%;
            margin-top: -20px;
            background-color: #fc5e62;
          }
        }
      }
    }

    .right {
      flex: 1;
      margin-top: 10px;
      max-height: 83.5vh;
      overflow: auto;
      font-size: 15px;
      padding: 0 10px;
      .item {
        width: 100%;
        margin-bottom: 15px;
        color: #333;

        .pro {
          flex: 1;
          margin-left: 15px;
        }
        .price {
          font-size: 16px;
          color: #fc5e62;
          margin-top: 5px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>