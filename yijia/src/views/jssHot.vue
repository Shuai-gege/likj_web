<template>
  <div class="category">
    <!-- 头部 -->
    <head1></head1>
    <!-- tab切换 -->
    <div class="list flex">
      <div class="left">
        <div class="item flex active" @click="clickTab">一级分类</div>
        <div class="item flex" @click="clickTab">一级分类</div>
        <div class="item flex" @click="clickTab">一级分类</div>
        <div class="item flex" @click="clickTab">一级分类</div>
        <div class="item flex" @click="clickTab">一级分类</div>
        <div class="item flex" @click="clickTab">一级分类</div>
        <div class="item flex" @click="clickTab">一级分类</div>
        <div class="item flex" @click="clickTab">一级分类</div>
        <div class="item flex" @click="clickTab">一级分类</div>
        <div class="item flex" @click="clickTab">一级分类</div>
        <div class="item flex" @click="clickTab">一级分类</div>
        <div class="item flex" @click="clickTab">一级分类</div>
        <div class="item flex" @click="clickTab">一级分类</div>
        <div class="item flex" @click="clickTab">一级分类</div>
        <div class="item flex" @click="clickTab">一级分类</div>
      </div>
      <div class="right flex">
        <div class="item flex">
          <img src="../image/login.gif" alt />
          <div>二级分类</div>
        </div>
        <div class="item flex">
          <img src="../image/login.gif" alt />
          <div>二级分类</div>
        </div>
        <div class="item flex">
          <img src="../image/login.gif" alt />
          <div>二级分类</div>
        </div>
        <div class="item flex">
          <img src="../image/login.gif" alt />
          <div>二级分类</div>
        </div>
        <div class="item flex">
          <img src="../image/login.gif" alt />
          <div>二级分类</div>
        </div>
        <div class="item flex">
          <img src="../image/login.gif" alt />
          <div>二级分类</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import head1 from "./jssHead";
import Vue from "vue";
import {
  Popup,
  Image,
  Grid,
  GridItem,
  Divider,
  Cell,
  CellGroup,
  Tab,
  Tabs
} from "vant";
Vue.use(Image)
  .use(Grid)
  .use(GridItem)
  .use(Cell)
  .use(Tab)
  .use(Tabs)
  .use(CellGroup)
  .use(Divider);
export default {
  data() {
    return {};
  },
  components: {
    head1
  },
  methods: {
    clickTab() {}
  }
};
</script>
<style lang="less" scoped>
.category {
  height: 100vh;
  padding: 54px 0 50px;
  .list {
    // border-top: 1px solid #f5f5f5;
    align-items: flex-start;
    // height: 80%;
    // padding-top: 10px;

    .left {
      width: 84px;
      background: rgba(245, 245, 245, 1);
      height: 84.5vh;
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
      max-height: 82.5vh;
      overflow: auto;
      font-size: 24px;
      flex-wrap: wrap;
      align-items: flex-start;
      padding: 0 10px;
      .item {
        flex-direction: column;
        width: 30%;
        margin-bottom: 20px;

        img {
          width: 90px;
          height: 90px;
          margin-bottom: 15px;
        }
      }
    }
  }
}
</style>