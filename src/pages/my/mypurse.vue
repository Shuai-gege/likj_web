<template>
  <div class="mypurse">
    <navbar title="我的钱包"></navbar>
    <!-- 余额 -->
    <div class="zonge">
      <div class="flex" style="font-size:10px;">
        <div>
          可提现余额（元）
          <p style="font-size:20px;">{{initdata.money}}</p>
        </div>

        <div class="btn">
          <span
            class="flex"
            style="font-size:12px;padding:1px 10px;background:#FDDFA9;color:#333;border-radius:30px;margin-bottom:5px;"
            @click="$router.push('/topup')"
          >
            <img src="../../image/提现.png" alt style="width:15px;height:15px;" />
            充值
          </span>
          <!-- <span
            class="flex"
            style="font-size:12px;padding:1px 10px;background:#FDDFA9;color:#333;border-radius:30px;"
            @click="$router.push('/tixian')"
          >
            <img src="../../image/提现.png" alt style="width:15px;height:15px;" />
            提现
          </span>-->
        </div>
      </div>

      <div class="flex" style="margin-top:20px;font-size:12px;color:#FDDFA9;padding:0 20px;">
        <div class="item">
          <span>货款(元)</span>
          <p style="text-align:center;">{{initdata.payment_for_goods}}</p>
        </div>
        <div class="item">
          <span>保证金(元)</span>
          <p style="text-align:center;">{{initdata.margin}}</p>
        </div>
        <div class="item">
          <span>奖金(元)</span>
          <p style="text-align:center;">{{initdata.bonus}}</p>
        </div>
      </div>
    </div>
    <!--  -->
    <van-tabs v-model="active" @click="yue">
      <van-tab title="余额明细">
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="box">
            <div class="null" v-if="list.length==0">暂无记录</div>
            <div class="flex minxi" v-for="(item,i) in list" :key="i">
              <div>
                <p style="font-size:13px;margin-bottom:10px;color:black;">{{item.msg}}</p>
                <p style="font-size:13px;color:#CDC9C9;">
                  <span>{{item.createtime}}</span>
                </p>
              </div>
              <div>
                <p
                  style="font-size:14px;color:#04BE02"
                  v-if="item.fluctuate_type == 1"
                  class="flex_r"
                >
                  <img src="../../image/图标/jinbi.png" alt class="money" />
                  +{{item.amount}}
                </p>
                <p
                  style="font-size:14px;color:#fc4c4c"
                  v-if="item.fluctuate_type == 2"
                  class="flex_r"
                >
                  <img src="../../image/图标/jinbi.png" alt class="money" />
                  -{{item.amount}}
                </p>
              </div>
            </div>
          </div>
        </mescroll-vue>
      </van-tab>
      <van-tab title="货款明细">
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="box">
            <div class="null" v-if="list.length==0">暂无记录</div>
            <div class="flex minxi" v-for="(item,i) in list" :key="i">
              <div>
                <p style="font-size:13px;margin-bottom:10px;color:black;">{{item.msg}}</p>
                <p style="font-size:13px;color:#CDC9C9;">
                  <span>{{item.createtime}}</span>
                </p>
              </div>
              <div>
                <p
                  style="font-size:14px;color:#04BE02"
                  v-if="item.fluctuate_type == 1"
                  class="flex_r"
                >
                  <img src="../../image/图标/jinbi.png" alt class="money" />
                  +{{item.amount}}
                </p>
                <p
                  style="font-size:14px;color:#fc4c4c"
                  v-if="item.fluctuate_type == 2"
                  class="flex_r"
                >
                  <img src="../../image/图标/jinbi.png" alt class="money" />
                  -{{item.amount}}
                </p>
              </div>
            </div>
          </div>
        </mescroll-vue>
      </van-tab>
      <van-tab title="提现记录">
        <mescroll-vue ref="mescroll2" :up="mescrollUp2" @init="mescrollInit2">
          <div class="box">
            <div class="null" v-if="list2.length==0">暂无提现记录</div>
            <div
              class="flex minxi"
              v-for="(item,i) in list2"
              :key="i"
              @click="todetail(item.cash_id)"
            >
              <div>
                <p
                  style="font-size:13px;margin-bottom:10px;color:black;"
                >提现到{{item.currency_type==1?'余额':'奖金'}}</p>
                <p style="font-size:13px;color:#CDC9C9;">
                  <span>{{item.createtime}}</span>
                </p>
              </div>
              <div>
                <p style="font-size:14px;color:#fc4c4c;text-align:right" class="flex_r">
                  <img src="../../image/图标/jinbi.png" alt />
                  {{item.money}}
                </p>
                <p style="font-size:14px;color:#fc4c4c;text-align:right" v-if="item.status==1">待审核</p>
                <p style="font-size:14px;color:#04BE02;text-align:right" v-if="item.status==2">已审核</p>
                <p style="font-size:14px;color:#fc4c4c;text-align:right" v-if="item.status==3">审核失败</p>
              </div>
            </div>
          </div>
        </mescroll-vue>
      </van-tab>
      <van-tab title="充值记录">
        <mescroll-vue ref="mescroll" :down="mescrollDown1" :up="mescrollUp1" @init="mescrollInit1">
          <div class="box">
            <div class="null" v-if="list1.length==0">暂无充值记录</div>
            <div
              class="flex minxi"
              v-for="(item,i) in list1"
              :key="i"
              @click="todetail1(item.recharge_id)"
            >
              <div>
                <p
                  style="font-size:13px;margin-bottom:10px;color:black;"
                  v-if="item.recharge_way==1"
                >充值到余额</p>
                <p
                  style="font-size:13px;margin-bottom:10px;color:black;"
                  v-if="item.recharge_way==2"
                >充值到货款</p>
                <p
                  style="font-size:13px;margin-bottom:10px;color:black;"
                  v-if="item.recharge_way==3"
                >充值到保证金</p>
                <p style="font-size:13px;color:#CDC9C9;">
                  <span>{{item.createtime}}</span>
                </p>
              </div>
              <div>
                <p style="font-size:14px;color:#fc4c4c;text-align:right" class="flex_r">
                  <img src="../../image/图标/jinbi.png" alt />
                  {{item.amount}}
                </p>
                <p style="font-size:14px;color:#fc4c4c;text-align:right" v-if="item.status==1">待审核</p>
                <p style="font-size:14px;color:#04BE02;text-align:right" v-if="item.status==2">已审核</p>
                <p style="font-size:14px;color:#fc4c4c;text-align:right" v-if="item.status==3">审核失败</p>
              </div>
            </div>
          </div>
        </mescroll-vue>
      </van-tab>
      <van-tab title="保证金">
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="box">
            <div class="null" v-if="list.length==0">暂无记录</div>
            <div class="flex minxi" v-for="(item,i) in list" :key="i">
              <div>
                <p style="font-size:13px;margin-bottom:10px;color:black;">{{item.msg}}</p>
                <p style="font-size:13px;color:#CDC9C9;">
                  <span>{{item.createtime}}</span>
                </p>
              </div>
              <div>
                <p
                  style="font-size:14px;color:#04BE02"
                  v-if="item.fluctuate_type == 1"
                  class="flex_r"
                >
                  <img src="../../image/图标/jinbi.png" alt class="money" />
                  +{{item.amount}}
                </p>
                <p
                  style="font-size:14px;color:#fc4c4c"
                  v-if="item.fluctuate_type == 2"
                  class="flex_r"
                >
                  <img src="../../image/图标/jinbi.png" alt class="money" />
                  -{{item.amount}}
                </p>
              </div>
            </div>
          </div>
        </mescroll-vue>
      </van-tab>
    </van-tabs>
    <!-- 可提现，货款，奖金 -->
    <!-- <div class="tixian">
      <van-cell title="可提现余额" is-link :value="initdata.money" @click="tap(1)" />
      <van-cell title="货款" is-link :value="initdata.payment_for_goods" @click="tap(2)" />
      <van-cell title="奖金" is-link :value="initdata.bonus" @click="$router.push('/bonus')" />
      <van-cell title="保证金" is-link :value="initdata.margin" @click="tap(4)" />
    </div>
    <p style="margin:10px 0 10px 20px;">更多</p>-->
    <!-- 收款账号、利润 -->
    <!-- <div class="lirun"> -->
    <!-- <van-cell title="收款账号设置" is-link to="/myshoukuan" /> -->
    <!-- <van-cell title="充值记录" is-link @click="chongzhi" />
    <van-cell title="提现记录" is-link @click="tixian" />-->
    <!-- <van-cell title="利润明细" is-link @click="tap(4)" /> -->
    <!-- </div> -->
    <!-- 按钮 -->
    <!-- <van-button
      type="primary"
      size="large"
      color="#fc4c4c"
      to="/topup"
      style="margin-bottom:10px;"
    >充值</van-button>

    <van-button
      type="primary"
      size="large"
      color="#F19553"
      to="/tixian"
      style="margin-bottom:30px;"
    >提现</van-button>-->
  </div>
</template>
<script>
import navbar from "@/components/navbar";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  data() {
    return {
      value: 1,
      type: "1", //1余额，2货款，3保证金
      type1: "", //1提交，2查看
      initdata: "", //后台数据
      type2: "", //1充值记录，2提现记录
      active: 0, //tab切换
      list: [], //请求数据,余额，货款，保证金
      list1: [], //充值数据
      list2: [], //提现数据
      mescroll: null, // mescroll实例对象
      mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
      },
      mescrollDown1: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp1: {
        // 上拉加载的配置.
        callback: this.upCallback1 // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
      },
      mescrollDown2: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp2: {
        // 上拉加载的配置.
        callback: this.upCallback2 // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
      }
    };
  },
  components: {
    navbar,
    MescrollVue // 注册mescroll组件
  },
  mounted() {
    this.axios.post("/api/user/index").then(data => {
      console.log(data);
      this.initdata = data;
    });
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      console.log(page);
      // this.init(page.num, mescroll);
      this.axios
        .post("/api/property_administer/propertyDetails", {
          page: page.num,
          assets_type: this.type
        })
        .then(data => {
          console.log(this.type);
          // this.list = data;
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
    },

    // 充值记录
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit1(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback1(page, mescroll) {
      console.log(page);
      // this.init(page.num, mescroll);
      this.axios
        .post("/api/property_administer/rechargeList", {
          page: page.num
        })
        .then(data => {
          console.log(this.type);
          // this.list = data;
          // 请求的列表数据
          let arr = data;
          // 如果是第一页需手动置空列表
          if (page.num === 1) {
            this.list1 = [];
          }
          // 把请求到的数据添加到列表
          this.list1 = this.list1.concat(arr);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length, true);
          });
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    },

    // 提现
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit2(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback2(page, mescroll) {
      console.log(page);
      // this.init(page.num, mescroll);
      this.axios
        .post("/api/property_administer/cashList", {
          page: page.num
        })
        .then(data => {
          console.log(this.type);
          // this.list = data;
          // 请求的列表数据
          let arr = data;
          // 如果是第一页需手动置空列表
          if (page.num === 1) {
            this.list2 = [];
          }
          // 把请求到的数据添加到列表
          this.list2 = this.list2.concat(arr);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length, true);
          });
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    },

    chongzhi() {
      this.$router.push({
        path: "/chongzhilist"
      });
    },
    tixian() {
      this.$router.push({
        path: "/tixianlist"
      });
    },
    yue(name) {
      if (name == 0) {
        this.type = 1;
        this.mescroll.resetUpScroll();
      } else if (name == 1) {
        this.type = 2;
        this.mescroll.resetUpScroll();
      } else if (name == 4) {
        this.type = 3;
        this.mescroll.resetUpScroll();
      }
    },
    todetail(id) {
      this.$router.push({
        path: "/tixianinfo",
        query: {
          id: id
        }
      });
    },
    todetail1(id) {
      this.$router.push({
        path: "/recordinfo",
        query: {
          id: id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.mypurse {
  background: #f5f5f5;
  min-height: 100vh;
  padding-top: 45px;
  .zonge {
    margin-top: -1px;
    color: #fdc083;
    background: #182128;
    padding: 20px 12px 10px;
    .item {
      color: #cea57c;
      span {
        color: #806850;
      }
    }
  }
  .tixian {
    margin: 10px 0;
  }
  .lirun {
    margin-bottom: 50px;
  }

  .mescroll {
    position: fixed;
    top: 235px;
    bottom: 0;
    height: auto;
  }
  .yue {
    margin: 55px 0 15px 0;
    padding: 20px;
    background: #fff;
  }
  .box {
    // margin-top: 44px;
    background: #f5f5f5;
    min-height: 100vh;
    padding-bottom: 5px;
    .minxi {
      padding: 10px 20px;
      background: #fff;
      width: 94%;
      margin: 7px auto;
      border-radius: 5px;
      .money {
        margin-right: 8px;
        width: 15px;
        height: 20px;
      }
    }
  }
  min-height: 100vh;
  img {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
  font-size: 14px;
  background: #f5f5f5;
  .box {
    background: #f5f5f5;
    .minxi {
      padding: 10px 20px;
      background: #fff;
      margin-bottom: 1px;
      width: 94%;
      margin: 0 auto;
      margin-top: 10px;
      border-radius: 10px;
    }
  }
}
</style>