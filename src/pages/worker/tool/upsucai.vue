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
            rows="8"
            autosize
            type="textarea"
            maxlength="700"
            placeholder="说点什么..."
            show-word-limit
          />
        </van-cell-group>
        <!-- 图片上传 -->
        <div class="flex" style="padding-left:10px;">
          <van-uploader
            v-model="fileList1"
            :after-read="afterRead1"
            @delete="del1"
            multiple
            :max-count="1"
          />
          <van-uploader
            v-model="fileList2"
            :after-read="afterRead2"
            @delete="del2"
            multiple
            :max-count="1"
          />
          <van-uploader
            v-model="fileList3"
            :after-read="afterRead3"
            @delete="del3"
            multiple
            :max-count="1"
          />
          <van-uploader
            v-model="fileList4"
            :after-read="afterRead4"
            @delete="del4"
            multiple
            :max-count="1"
          />
        </div>
      </div>
      <!-- 选择 -->
      <div class="pick">
        <van-cell
          icon="apps-o"
          :class="cat=='请选择'?'':'active'"
          title="选择分类"
          is-link
          :value="cat"
          @click="sort"
        />
        <!-- <van-cell
          icon="friends-o"
          :class="who =='请选择'?'':'active1'"
          title="谁可以见"
          is-link
          :value="who"
          @click="sort1"
        />-->
      </div>
      <div class="fujian" style="background:#fff;margin:10px 0;padding:2px 0 10px;">
        <div style="margin:10px;">
          上传附件
          <i style="color:#fc4c4c">（除了图片）</i>
        </div>

        <input style="margin-left:10px;" type="file" @change="getFile($event)" />
      </div>

      <!-- 弹出层 -->
      <!-- 选择分类 -->
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
      <!-- 谁可以见 -->
      <!-- <van-popup v-model="show1" position="bottom" round :style="{ height: '30%' }">
        <div class="look">
          <div class="title">谁可以见</div>
          <van-radio-group v-model="radio" checked-color="#fc4c4c" class="team" @change="getWho">
            <van-radio name="1" style="margin:20px 0;">我的下级可见</van-radio>
            <van-radio name="2">我的团队可见</van-radio>
          </van-radio-group>
        </div>
      </van-popup>-->
    </div>
    <div class="btn">
      <van-button type="primary" size="large" color="#fc4c4c" @click="submit">发布</van-button>
    </div>
  </div>
</template>
<script>
import tabbar from "../../../components/navbar";
import { upload } from "../../../common/js/common";
import { upfile } from "../../../common/js/common";
export default {
  data() {
    return {
      message: "", //素材文本
      fileList1: [], //图片上传
      fileList2: [], //图片上传
      fileList3: [], //图片上传
      fileList4: [], //图片上传

      img: [],
      img1: "",
      img2: "",
      img3: "",
      img4: "",
      show: false, //选择分类弹出框
      cat: "请选择", //类别
      // show1: false, //说可以见弹出框
      // who: "请选择", //谁
      // radio: "", //指定团队
      actions: [], //分类
      category_id: "", //分类id
      catArr: [], //传过来的分类
      fujian: "" //附件
    };
  },
  components: {
    tabbar
  },
  mounted() {
    // 接受分类数组
    this.catArr = this.$route.query.cat.slice(1);
    this.catArr.forEach(item => {
      this.actions.push({
        name: item.text
      });
    });
  },
  methods: {
    submit() {
      if (
        !this.message &&
        !this.img1 &&
        !this.img2 &&
        !this.img3 &&
        !this.img4
      ) {
        this.$toast("请上传素材内容");
      } else if (this.cat == "请选择") {
        this.$toast("请选择分类");
      } else if (this.who == "请选择") {
        this.$toast("请选择谁可以看");
      } else {
        let arr = [this.img1, this.img2, this.img3, this.img4];
        this.img = arr.filter(item => {
          return item;
        });
        console.log(this.img);

        this.axios
          .post("/api/matter/creatMatter", {
            content: this.message,
            images: this.img.length == 0 ? "" : this.img.join(","),
            enclosure: this.fujian,
            category_id: this.category_id
            // powers: this.radio
          })
          .then(data => {
            this.$toast("上传成功，请等待审核");
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          });
      }
    },
    sort() {
      this.show = true;
    },
    // sort1() {
    //   this.show1 = true;
    // },
    // 选择分类
    onSelect(item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      this.show = false;
      this.cat = item.name;
      this.catArr.forEach(item => {
        if (item.text == this.cat) {
          console.log(item);
          this.category_id = item.value;
        }
      });
    },
    // 选择人
    // getWho(val) {
    //   this.show1 = false;
    //   this.who = val == 1 ? "我的下级" : "我的团队";
    // },
    afterRead1() {
      upload(this.fileList1[0].content, this.fileList1[0].file.name).then(
        data => {
          this.img1 = data.url;
          console.log(this.img1);
        }
      );
    },
    afterRead2() {
      upload(this.fileList2[0].content, this.fileList2[0].file.name).then(
        data => {
          this.img2 = data.url;
        }
      );
    },
    afterRead3() {
      upload(this.fileList3[0].content, this.fileList3[0].file.name).then(
        data => {
          this.img3 = data.url;
        }
      );
    },
    afterRead4() {
      upload(this.fileList4[0].content, this.fileList4[0].file.name).then(
        data => {
          this.img4 = data.url;
        }
      );
    },
    del1() {
      this.img1 = "";
    },
    del2() {
      this.img2 = "";
    },
    del3() {
      this.img3 = "";
    },
    del4() {
      this.img4 = "";
    },
    // 上传附件
    getFile(e) {
      console.log(e.target.files[0]);
      if (!/image\/\w+/.test(e.target.files[0].type)) {
        upfile(e).then(data => {
          this.fujian = data.url;
        });
      } else {
        this.$toast("请上传除了图片以外的附件");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.upsucai {
  font-size: 14px;
  padding-top: 44px;
  margin-top: -1px;
  min-height: 100vh;
  background: #f5f6f7;
  color: #333;
  .con {
    margin-top: -1px;
    padding-bottom: 50px;
    .com_title {
      padding: 6px 12px;
      color: #333;
    }
    .text {
      background: #fff;
    }
    .pick {
      margin-top: 15px;
      .active {
        color: #fc4c4c;
        .van-cell__value {
          color: #fc4c4c;
        }
      }
      .active1 {
        color: #f79a0f;
        .van-cell__value {
          color: #f79a0f;
        }
      }
      .van-icon-apps-o:before {
        font-size: 20px;
      }
      .van-icon-friends-o:before {
        font-size: 20px;
      }
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
        padding: 10px 130px;
        .van-radio {
          margin-bottom: 10px;
        }
      }
    }
  }
  .btn {
    margin-top: 80px;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
