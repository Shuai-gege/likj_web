<template>
  <!-- 头部公共搜索框 -->
  <div class="storeTabbar">
    <div class="cont flex">
      <div class="leftimg flex" @click="goBack">
        <!-- <van-icon name="arrow-left" /> -->
        <img src="../image/cat.png" alt />
        <span>分类</span>
      </div>
      <input type="search" @keyup.13="searchGoods" placeholder="请输入关键词" v-model="searchVal" />
      <p @click="searchGoods">搜索</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["searchVal"],
  mounted() {},
  methods: {
    //
    goBack() {
      this.$emit("cat");
    },
    searchGoods() {
      this.$emit("gosearch", this.searchVal);
    }
  }
};
</script>

<style lang="less" scoped>
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
      // width: 30px;
      // height: 20px;
      flex-direction: column;
      font-size: 10px;
      color: #333;
      img {
        width: 28px;
        height: 22px;
      }
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
</style>

