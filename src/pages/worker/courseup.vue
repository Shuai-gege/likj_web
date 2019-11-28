<template>
  <div class="courseup">
    <!-- 头部公共搜索框 -->
    <tabbar title="上传直播课程"></tabbar>
    <div class="con">
      <!-- 标题 -->
      <van-cell-group>
        <van-field
          v-model="title"
          rows="1"
          autosize
          label="标题："
          type="textarea"
          maxlength="50"
          placeholder="请输入标题"
          show-word-limit
        />
      </van-cell-group>
      <van-cell-group>
        <!-- 作者 -->
        <van-field v-model="value" label="作者：" placeholder="请输入作者名" />
      </van-cell-group>

      <van-cell-group>
        <!-- 简介 -->
        <van-field
          v-model="about"
          rows="4"
          autosize
          label="课程简介："
          type="textarea"
          maxlength="400"
          placeholder="请输入课程简介"
          show-word-limit
        />
      </van-cell-group>
      <!-- banner图 -->
      <div class="banner">
        <p>上传banner图</p>
        <van-uploader
          v-model="fileList"
          multiple
          :max-count="1"
          :after-read="afterRead"
          :delete="del"
        />
      </div>
      <!-- 开始结束时间 -->
      <div class="time">
        <van-cell-group>
          <van-field
            v-model="starttime"
            clearable
            label="开始时间："
            placeholder="请输入开始时间"
            disabled
            @click="start"
          />
          <van-field
            v-model="endtime"
            clearable
            label="结束时间："
            disabled
            placeholder="请输入结束时间"
            @click="end"
          />
        </van-cell-group>
        <van-popup v-model="show" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="confirm"
            @cancel="cancel"
            :formatter="formatter"
          />
        </van-popup>
        <!-- 结束时间控件 -->
        <van-popup v-model="show1" position="bottom">
          <van-datetime-picker
            v-model="currentDate1"
            type="datetime"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="confirm1"
            @cancel="cancel1"
            :formatter="formatter"
          />
        </van-popup>
      </div>
      <!-- 视频链接 -->
      <van-cell-group class="mp4">
        <van-field
          v-model="video"
          rows="1"
          autosize
          label="视频链接："
          type="textarea"
          maxlength="200"
          placeholder="请输入视频链接"
          show-word-limit
        />
      </van-cell-group>
      <!-- 谁可以见 -->
      <van-cell icon="friends-o" title="谁可以见" is-link @click="getWho" />
      <van-popup v-model="showWho" position="bottom" round class="xuanze">
        <!-- <p>指定团队可见</p> -->
        <van-checkbox-group v-model="result" checked-color="#fc4c4c" @change="getResult">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in list"
              clickable
              :key="index"
              :title="item.agent_name"
              @click="toggle(index)"
            >
              <van-checkbox :name="item.agent_level_id" ref="checkboxes" slot="right-icon" />
            </van-cell>
          </van-cell-group>
          <van-button type="primary" class="all" @click="checkAll">全选</van-button>
        </van-checkbox-group>
      </van-popup>
    </div>
    <!-- 按钮 -->
    <van-button type="primary" size="large" color="#fc4c4c" @click="submit">上传</van-button>
  </div>
</template> 
<script>
import tabbar from "../../components/navbar";
import { upload } from "../../common/js/common";
import { getTime } from "../../common/js/common";

import Vue from "vue";
import { ImagePreview } from "vant";
Vue.use(ImagePreview);
export default {
  data() {
    return {
      title: "", //标题
      value: "", //作者名
      about: "", //课程简介
      fileList: [], //上传banner图
      starttime: "", //开始时间
      endtime: "", //结束时间
      video: "", //视频链接
      img1: "", //上传的图片
      // 时间
      show: false, //开始时间弹窗
      show1: false, //结束时间弹窗
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2020, 11, 31),
      currentDate: new Date(), //开始标准时间
      currentDate1: new Date(), //结束标准时间
      starttime: "", //开始时间
      starttime1: "", //开始时间时间戳
      endtime: "", //结束时间
      endtime1: "", //结束时间时间戳
      showWho: false, //谁可以看弹窗
      result: [],
      list: []
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.axios.post("/api/course/userLevel").then(data => {
      this.list = data;
    });
  },
  methods: {
    getWho() {
      this.showWho = true;
    },
    checkAll() {
      let arr = [];
      this.list.forEach(item => {
        arr.push(item.agent_level_id);
      });
      this.result = arr;
    },

    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    getResult() {
      console.log(11111111111, this.result);
    },
    afterRead() {
      upload(this.fileList[0].content, this.fileList[0].file.name).then(
        data => {
          this.img1 = data.url;
          console.log(this.img1);
        }
      );
    },
    // 删除图片
    del() {
      this.img1 = "";
    },
    // 上传
    submit() {
      if (!this.title) {
        this.$toast("请输入标题");
      } else if (!this.value) {
        this.$toast("请输入作者");
      } else if (!this.about) {
        this.$toast("请输入课程简介");
      } else if (!this.img1) {
        this.$toast("请上传banner图");
      } else if (!this.starttime) {
        this.$toast("请输入开始时间");
      } else if (!this.endtime) {
        this.$toast("请输入结束时间");
      } else if (!this.video) {
        this.$toast("请输入视频链接");
      } else {
        this.axios
          .post("/api/course/addLive", {
            course_title: this.title,
            course_author: this.value,
            course_stime: this.starttime1,
            course_etime: this.endtime1,
            course_url: this.video,
            course_con: this.about,
            course_img: this.img1,
            user_level: this.result.join(",")
          })
          .then(data => {
            this.$toast("上传成功，请等待审核");
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          });
      }
    },
    // 选择开始时间
    start() {
      this.show = true;
    },
    // 选择结束时间
    end() {
      this.show1 = true;
    },
    // 点击确定
    confirm() {
      this.show = false;
      this.starttime1 = parseInt(new Date(this.currentDate).getTime() / 1000);
      this.starttime = getTime(this.starttime1, 1);
      console.log(this.starttime1);
    },
    // 点击取消
    cancel() {
      this.show = false;
    },
    confirm1() {
      this.show1 = false;
      this.endtime1 = parseInt(new Date(this.currentDate1).getTime() / 1000);
      this.endtime = getTime(this.endtime1, 1);
      console.log(this.endtime1);
    },
    cancel1() {
      this.show1 = false;
    },
    // 处理控件显示的时间格式
    formatter(type, value) {
      // 格式化选择器日期
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      } else if (type === "hour") {
        return `${value}时`;
      } else if (type === "minute") {
        return `${value}分`;
      }
      return value;
    }
  }
};
</script>

<style lang="less" scoped>
.courseup {
  padding-top: 44px;
  .con {
    margin-top: -1px;
    margin-bottom: 100px;
    .banner {
      padding: 5px 10px;
      p {
        font-size: 14px;
        padding: 5px 0;
        margin-bottom: 10px;
      }
    }
    .mp4 {
      border-bottom: 1px solid #f5f5f5;
    }
    .xuanze {
      min-height: 30%;
    }
  }
  .van-button--large {
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .all {
    background-color: #fc4c4c;
    border-color: #fc4c4c;
    display: block;
    margin: 10px auto;
    width: 100px;
  }
}
</style>
