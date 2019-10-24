<template>
  <div class="search">
    <!-- 头部公共搜索框 -->
    <search @gosearch="searchGoods"></search>
    <!-- 历史搜索 -->
    <div class="history">
      <div class="title flex">
        <span>历史搜索</span>
        <i class="iconfont icon-iconfont-shanchu" @click="delHistory"></i>
      </div>
      <p v-show="!hasHistory">暂无历史搜索记录</p>
      <ul class="con flex" v-if="hasHistory">
        <li @click="searchGoods(item)" v-for="(item,i) in hisList" :key="i">{{item}}</li>
      </ul>
    </div>
    <!-- 热门推荐 -->
    <!-- <div class="hot">
      <p>热门推荐</p>
      <ul class="flex hot_con">
        <li @click="toGoodsList($event)" v-for="(item,i) in list" :key="i">{{item}}</li>
      </ul>
    </div>-->
  </div>
</template>
<script>
import search from "../../components/small-search";
export default {
  data() {
    return {
      searchValue: "", //搜索词
      hasHistory: true, //是否有历史记录
      hisList: [] //历史搜索，存本地
    };
  },
  components: {
    search
  },
  mounted() {
    if (localStorage.getItem("hisList")) {
      this.hisList = JSON.parse(localStorage.getItem("hisList"));
    }
  },
  directives: {
    // input自动聚焦：自定义指令
    focus: {
      inserted: function(el, { value }) {
        if (value) {
          el.focus();
        }
      }
    }
  },
  methods: {
    // 点击返回按钮
    goBack() {
      this.$router.go(-1);
    },
    //   点击搜索，跳转到商品列表页面 value 子组件传过来的值
    searchGoods(value) {
      this.searchValue = value;
      console.log(this.hisList);
      if (!this.hisList.includes(this.searchValue) && this.searchValue) {
        this.hisList.push(this.searchValue);
        localStorage.setItem("hisList", JSON.stringify(this.hisList));
      }
      this.$router.push({
        path: "/goodsList",
        query: {
          searchValue: this.searchValue
        }
      });
    },

    // 点击删除历史记录
    delHistory() {
      this.hisList = [];
      this.hasHistory = false;
      localStorage.removeItem("hisList");
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  font-size: 14px;
  color: #0c0b0b;
  background-color: #f5f5f5;
  min-height: 100vh;
  // 搜索顶部
  .storeTabbar {
    height: 44px;
    .cont {
      position: fixed;
      top: 0px;
      left: 0;
      right: 0;
      z-index: 9;
      width: 100%;
      background: #fff;
      padding: 0 12px;
      height: 44px;
      .leftimg {
        width: 10px;
        height: 20px;
        i {
          font-size: 20px;
        }
      }
      p {
        width: 50px;
        //   height: 56px;
        padding: 5px 0;
        line-height: normal;
        background: rgb(238, 67, 55);
        border-radius: 14px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
      }
      input {
        width: 250px;
        height: 28px;
        opacity: 0.8;
        border-radius: 14px;
        padding-left: 25px;
        background-size: 21px 21px;
        background-color: #f5f5f5;
      }
    }
  }
  //   历史搜索
  .history {
    background-color: #fff;
    margin: 10px 12px;
    padding: 10px 0 10px 10px;
    border-radius: 8px;
    min-height: 200px;
    .title {
      margin-bottom: 15px;
      margin-right: 10px;
      font-weight: 700;
      img {
        width: 18px;
        height: 17px;
      }
    }
    .con {
      justify-content: flex-start;
      flex-wrap: wrap;
      li {
        padding: 2px 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        background: rgba(245, 245, 245, 1);
        border-radius: 13px;
      }
    }
  }
  // 热门推荐
  .hot {
    p {
      font-weight: 700;
      margin-left: 20px;
      margin-bottom: 15px;
    }
    .hot_con {
      flex-wrap: wrap;
      justify-content: flex-start;
      li {
        margin-bottom: 15px;
        width: 33.3%;
        text-align: center;
      }
    }
  }
}
</style>

