<template>
  <div class="mystore">
    <!-- 头部公共搜索框 -->
    <tabbar title="我的店铺"></tabbar>
    <div class="con">
      <!-- 店主信息 -->
      <van-row class="flex user">
        <van-col span="18" offset="1" class="Logo">
          <div class="Logo flex_l">
            <van-image width="2rem" height="2rem" radius="10" :src="initdata.shop_logo" />
            <div style="line-height:20px;">
              <p style="margin-bottom:10px;">{{initdata.shop_name}}</p>
              <span style="font-size:12px;" v-if="initdata.status==0">审核状态：审核中...</span>
              <span style="font-size:12px;" v-if="initdata.status==-1">审核状态：审核失败</span>
              <span style="font-size:12px;" v-if="initdata.status==1">店铺状态：运营中</span>
              <span style="font-size:12px;" v-if="initdata.status==2">店铺状态：已关闭</span>
              <p v-if="initdata.status==-1">失败原因：{{initdata.remark}}</p>
              <p v-if="initdata.status==2">关闭原因：{{initdata.remark}}</p>
            </div>
          </div>
        </van-col>
        <van-col span="4" v-if="initdata.status==1">
          <div class="new" style="margin-bottom:5px;" @click="$router.push('/newstore')">管理仓库</div>
          <div class="new" style="background:#ff3f61" @click="$router.push('/storeorder')">店铺订单</div>
        </van-col>
      </van-row>
      <!-- 商品列表 -->
      <div>
        <list :list="list" store="1" @upDown="updown"></list>
      </div>
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
import list from "../../components/com-list";
import Vue from "vue";
import { Dialog } from "vant";
export default {
  data() {
    return {
      list: [],
      initdata: {}
    };
  },
  components: {
    tabbar,
    list: list
  },
  mounted() {
    this.axios.post("/api/agent/agentShop").then(data => {
      if (data.goods.length) {
        data.goods.forEach(item => {
          this.$set(item, "checked", item.status == 1 ? true : false);
        });
      }
      this.list = data.goods;
      this.initdata = data;
    });
  },
  methods: {
    // 上下架   1上架 2 下架
    updown(i, id) {
      console.log(i, id);
      if (this.list[i].checked) {
        Dialog.confirm({
          title: "提醒",
          message: "是否下架？"
        })
          .then(() => {
            this.updown_api(id, 2);
            this.list[i].checked = false;
          })
          .catch(() => {
            // on cancel
          });
      } else {
        Dialog.confirm({
          title: "提醒",
          message: "是否上架？"
        })
          .then(() => {
            this.updown_api(id, 1);
            this.list[i].checked = true;
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    // 上下架接口  1上架 2 下架
    updown_api(id, type) {
      this.axios.post("/api/goods/chgGoodsStatus", {
        goods_id: id,
        status: type
      });
    }
  }
};
</script>

<style lang="less" scoped>
.mystore {
  padding-top: 44px;
  .con {
    margin-top: -1px;
    .user {
      color: #fff;
      background: url(../../image/bgt2.png) no-repeat center center;
      background-size: 100%;
      .Logo {
        margin: 10px 10px;
        font-size: 12px;
        .van-image {
          margin-right: 15px;
        }
      }
      .new {
        background: #ff9505;
        text-align: center;
        padding: 5px;
        border-radius: 5px;
      }
    }
  }
}
</style>
