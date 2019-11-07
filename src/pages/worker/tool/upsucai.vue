<template>
  <div class="upsucai">
    <!-- 头部公共搜索框 -->
    <tabbar title="上传素材"></tabbar>
    <div class="con">
      <!-- 文本、图片 -->
      <div class="text">
        <van-cell-group>
          <van-field
            v-model="message"
            rows="7"
            autosize
            type="textarea"
            maxlength="700"
            placeholder="说点什么..."
            show-word-limit
          />
        </van-cell-group>
        <!-- 图片上传 -->
        <div class="flex" style="padding-left:10px;">
          <van-uploader v-model="fileList" multiple :max-count="1" />
          <van-uploader v-model="fileList1" multiple :max-count="1" />
          <van-uploader v-model="fileList2" multiple :max-count="1" />
          <van-uploader v-model="fileList3" multiple :max-count="1" />
        </div>
      </div>
      <!-- 选择 -->
      <div class="pick">
        <van-cell icon="apps-o" title="选择分类" is-link value="内容" @click="sort" />
        <van-cell icon="friends-o" title="谁可以见" is-link value="内容" @click="sort1" />
      </div>
      <div class="btn">
        <van-button type="primary" size="large" color="#fc4c4c" @click="submit">发布</van-button>
      </div>
      <!-- 弹出层 -->
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
      <van-popup v-model="show1" position="bottom" round :style="{ height: '50%' }">
        <div class="look">
          <div class="title">谁可以见</div>
          <p>指定团队可见</p>
          <van-radio-group
            v-model="radio"
            checked-color="#fc4c4c"
            class="team"
            style="border-bottom:1px solid #f5f6f7;"
          >
            <van-radio name="1">所有团队可见</van-radio>
            <van-radio name="2">自己团队可见</van-radio>
          </van-radio-group>
          <p>指定层级可见</p>
          <van-radio-group v-model="radio1" checked-color="#fc4c4c" class="team">
            <van-radio name="1">所有层级可见</van-radio>
            <van-radio name="2">部分层级可见</van-radio>
          </van-radio-group>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import tabbar from "../../../components/navbar";
export default {
  data() {
    return {
      message: "", //素材文本
      fileList: [], //图片上传
      fileList1: [], //图片上传
      fileList2: [], //图片上传
      fileList3: [], //图片上传
      show: false, //弹出框
      show1: false, //弹出框
      radio: "1", //指定团队
      radio1: "1", //指定层级
      actions: [
        //弹出框选项
        { name: "图片" },
        { name: "纯文案" },
        { name: "图文" }
      ]
    };
  },
  components: {
    tabbar
  },
  mounted() {},
  methods: {
    submit() {
      if (!this.message) {
        this.$toast("说点什么吧");
      } else if (!this.fileList) {
        this.$toast("上传图片吗？");
      }
    },
    sort() {
      this.show = true;
    },
    sort1() {
      this.show1 = true;
    },
    onSelect(item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.show = false;
    }
  }
};
</script>

<style lang="less" scoped>
.upsucai {
  font-size: 14px;
  padding-top: 44px;
  min-height: 100vh;
  background: #f5f5f5;
  color: #333;
  .con {
    .text {
      background: #fff;
    }
    .pick {
      margin-top: 20px;
      .van-icon-apps-o:before {
        font-size: 20px;
      }
      .van-icon-friends-o:before {
        font-size: 20px;
      }
    }
    .btn {
      margin-top: 40%;
      padding: 0 15px;
    }
    .van-popup--bottom.van-popup--round {
      max-height: 350px;
    }
    .look {
      .title {
        font-size: 16px;
        text-align: center;
        border-bottom: 1px solid #f5f6f7;
        padding: 10px 0;
      }
      p {
        padding: 10px 15px;
      }
      .team {
        padding: 10px 30px;
        .van-radio {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
