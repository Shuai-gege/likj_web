<!--  -->
<template>
  <div class="box">
    <navbar title="我的会员"></navbar>
    <div class="con">
      <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
        <div class="null" v-if="list.length==0">暂无会员，快去邀请吧！</div>
        <div class="flex_l oItem" v-for="(item,i) in list" :key="i">
          <img :src="item.wx_avatar" alt />
          <div class="username">
            <p>{{item.wx_nickname}}</p>
            <p v-if="item.mobile">
              <van-icon name="phone" />
              {{item.mobile}}
            </p>
            <p v-if="item.sex != 1">男</p>
            <p v-else>女</p>
          </div>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import navbar from "../../components/navbar";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    navbar,
    MescrollVue
  },
  data() {
    //这里存放数据
    return {
      mescrollUp: {
        callback: this.upCallback
      },
      mescroll: null,

      page: "1", //代理分页
      list: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      console.log(page);
      this.axios
        .post("/api/agent_team/myLowerUser", {
          page: page.num
        })
        .then(data => {
          // 请求的列表数据
          let arr = data;
          // 如果是第一页需手动置空列表
          if (page.num === 1) {
            this.list = [];
          }
          // 把请求到的数据添加到列表
          this.list = this.list.concat(arr);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length, true);
          });
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    }
  },

  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.axios.post("/api/agent_team/myLowerUser").then(data => {
    //   this.list = data;
    // });
    // console.log(this.list);
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

.box {
  padding-top: 44px;
  .con {
    margin-top: -1px;
    min-height: 100vh;
    background: #f5f5f5;
    .mescroll {
      position: fixed;
      top: 44px;
      bottom: 0;
      height: auto;
    }
    .oItem {
      padding: 10px;
      margin: 10px;
      border-radius: 10px;
      background: #fff;
      img {
        width: 55px;
        height: 55px;
      }
      .username {
        margin-left: 5px;
        p:nth-child(1) {
          color: #333;
          font-size: 14px;
        }
        p:nth-child(2) {
          color: #999;
          margin: 2px 0;
        }
        p:nth-child(3) {
          color: #999;
        }
      }
    }
  }
}
</style>