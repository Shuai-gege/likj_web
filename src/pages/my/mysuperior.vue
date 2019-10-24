<template>
  <div class="mysuperior">
    <navbar title="我的上级"></navbar>
    <!-- 我的上级头像 -->
    <div class="touxiang flex">
      <div class="flex_l">
        <img :src="info.wx_avatar" alt />
        <div class="superiorname">
          <p style="width:40px;">{{info.wx_nickname}}</p>
          <p style="margin-top:10px;">{{info.agent_name}}</p>
        </div>
      </div>

      <!-- <p>未上传二维码</p> -->
    </div>
    <!-- 我的上级信息 -->
    <div class="data">
      <van-cell-group>
        <van-field :value="sex" label="性别" disabled />
      </van-cell-group>
    </div>

    <!-- 收款账户信息 -->
    <van-cell-group>
      <van-cell title="上级收款账户" is-link @click="shangji" />
    </van-cell-group>
  </div>
</template>
<script>
import navbar from "@/components/navbar";
export default {
  data() {
    return {
      info: {}, //请求数据
      sex: "" //性别
    };
  },
  components: {
    navbar
  },
  methods: {
    shangji() {
      this.$router.push({
        path: "/shangjishoukuan",
        query: {
          id: localStorage.getItem("agent_id"),
          type: 2
        }
      });
    }
  },
  mounted() {
    this.axios.post("/api/agent_team/mySuperior").then(data => {
      this.info = data;
      if (data.wx_sex == 1) {
        this.sex = "男";
      } else {
        this.sex = "女";
      }
    });
  }
};
</script>
<style lang="less" scoped>
.mysuperior {
  font-size: 14px;
  background: #f5f5f5;
  .touxiang {
    margin-top: 55px;
    padding: 15px;
    background: #fff;
    img {
      width: 70px;
      height: 70px;
      border-radius: 10px;
    }
    .superiorname {
      padding: 10px;
    }
  }
  .data {
    margin: 7px 0;
  }
  .flex_c {
    background: #fff;
    margin: 7px 0;
  }
}
</style>