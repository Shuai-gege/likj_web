<template>
  <div class="goodsList">
    <!-- 头部公共搜索框 -->
    <search @cat="cat" @gosearch="searchGoods"></search>
    <!-- 分类 -->
    <van-popup
      v-model="show"
      position="left"
      :overlay-style="{background:'transparent'}"
      :style="{ width: '50%',height:'100%', background:'#182128' }"
    >
      <div style="color:#fff" class="cat">
        <div class="item" @click="getCat('')">全部分类</div>
        <div
          class="item"
          v-for="(item,i) in catList"
          :key="i"
          @click="getCat(item.goods_category_id)"
        >{{item.name}}</div>
      </div>
    </van-popup>
    <!-- 商品列表 -->
    <list :list="list"></list>
  </div>
</template>
<script>
import search from "../../components/small-search";
import list from "../../components/com-list";
export default {
  data() {
    return {
      show: false, //分类弹窗
      catList: [], //分类列表
      searchValue: "", //搜索词
      classify_id: "", //分类id
      list: [], //初始收据
      page: 1 //当前页
    };
  },
  components: {
    search: search,
    list: list
  },
  mounted() {
    this.init();
    this.initCat();
  },
  methods: {
    // 分类接口
    initCat() {
      this.axios.post("/api/goods/goodsCategory").then(data => {
        this.catList = data;
      });
    },
    // 普通列表
    init() {
      this.axios
        .post("/api/goods/index", {
          search: this.searchValue,
          classify_id: this.classify_id,
          page: 1
        })
        .then(data => {
          this.list = data;
        });
    },
    // 点击分类图标
    cat() {
      this.show = true;
    },
    // 点击分类类目
    getCat(id) {
      console.log(id);
      this.show = false;
      this.classify_id = id;
      this.init();
    },
    // 搜索
    searchGoods(value) {
      console.log(value);
      this.searchValue = value;
      // 重置上拉
      this.init();
    },
    // 点击返回按钮
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.goodsList {
  font-size: 12px;
  color: #0c0b0b;
  min-height: 100vh;
  background: #f5f5f5;
  .cat {
    color: #fff;
    padding: 20px 10px;
    .item {
      margin-bottom: 15px;
    }
  }
}
</style>

