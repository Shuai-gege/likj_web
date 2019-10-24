<template>
  <div class="backMoney">
    <tabbar title="退款"></tabbar>
    <div class="detail">
      <div class="con">
        <div class="top flex_l">
          <van-image
            width="2.5rem"
            height="2.5rem"
            fit="contain"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="pro">
            <div class="name erhang">商品名字商品名字商品</div>
            <div class="price">
              <i>￥</i>88.00
            </div>
          </div>
        </div>
      </div>
      <div class="item" @click="showstatus">
        <van-cell title="货物状态" :value="status" :class="{'pop1':radio}" />
      </div>
      <div class="item" @click="showreason">
        <van-cell title="退款原因" :value="reason" :class="{'pop2':radio1}" />
      </div>
      <div class="items flex">
        <p>退款金额：</p>
        <input type="text" placeholder="￥88.0" />
      </div>
      <div class="upload">
        <p>上传凭证</p>
        <!-- <input type="file" @change="aa($event)" /> -->
        <van-uploader
          v-model="fileList"
          multiple
          :before-read="beforeRead"
          :after-read="afterRead"
          :max-count="6"
        />
      </div>
      <van-button
        type="danger"
        size="large"
        style="width:90%;margin:50px auto;display:block;border-radius:10px;height:50px;"
        @click="submit"
      >提交</van-button>
    </div>
    <!-- 货物状态弹窗 -->
    <van-popup v-model="show1" round position="bottom" :style="{ height: '40%' }">
      <van-cell title="货物状态" size="large" style="text-align:center;" />
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell title="未收到货" clickable @click="getStatus('1')">
            <van-radio checked-color="#fc4c4c" slot="right-icon" name="1" />
          </van-cell>
          <van-cell title="已收到货" clickable @click="getStatus('2')">
            <van-radio checked-color="#fc4c4c" slot="right-icon" name="2" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
    <!-- 退款原因弹窗 -->
    <van-popup v-model="show2" round position="bottom" :style="{ height: '40%' }">
      <van-cell title="退款原因" size="large" style="text-align:center;" />
      <van-radio-group v-model="radio1">
        <van-cell-group>
          <van-cell title="多买/错买/不想要" clickable @click="getReason('1')">
            <van-radio checked-color="#fc4c4c" slot="right-icon" name="1" />
          </van-cell>
          <van-cell title="快递一直未送到" clickable @click="getReason('2')">
            <van-radio checked-color="#fc4c4c" slot="right-icon" name="2" />
          </van-cell>
          <van-cell title="商品与描述不符" clickable @click="getReason('3')">
            <van-radio checked-color="#fc4c4c" slot="right-icon" name="3" />
          </van-cell>
          <van-cell title="其他" clickable @click="getReason('4')">
            <van-radio checked-color="#fc4c4c" slot="right-icon" name="4" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
import { dataURLtoFile } from "../../common/js/common";
export default {
  components: {
    tabbar
  },
  data() {
    return {
      fileList: [],
      status: "请选择",
      show1: false, //货物状态弹窗
      radio: 0, //未收到货 1    已收到货 2
      reason: "请选择",
      show2: false, //退款原因弹窗
      radio1: 0 //退款原因
    };
  },
  mounted() {},
  methods: {
    showstatus() {
      this.show1 = true;
    },
    getStatus(i) {
      this.show1 = false;
      this.radio = i;
      this.status = i == "1" ? "未收到货" : "已收到货";
    },
    showreason() {
      this.show2 = true;
    },
    getReason(i) {
      this.show2 = false;
      this.radio1 = i;
      switch (i) {
        case "1":
          this.reason = "多买/错买/不想要";
          break;
        case "2":
          this.reason = "快递一直未送到";
          break;
        case "3":
          this.reason = "商品与描述不符";
          break;
        case "4":
          this.reason = "其他";
          break;
      }
    },
    beforeRead(file) {
      if (
        file.type !== "image/jpg/" &&
        file.type !== "image/png" &&
        file.type !== "image/bmp" &&
        file.type !== "image/jpeg"
      ) {
        this.$toast("请上传 jpg/png/bmp/jpeg 格式图片");
        return false;
      }
      return true;
    },

    // 返回 Promise
    asyncBeforeRead(file) {
      return new Promise((resolve, reject) => {
        if (
          file.type !== "image/jpg/" &&
          file.type !== "image/png" &&
          file.type !== "image/bmp" &&
          file.type !== "image/jpeg"
        ) {
          this.$toast("请上传 jpg/png/bmp/jpeg  格式图片");
          reject();
        } else {
          resolve();
        }
      });
    },
    // aa(e) {
    //   console.log(e.target.files[0]);
    //   let file = e.target.files[0];
    //   // 实例化FormData
    //   var formdata = new FormData();
    //   // 将文件信息存入formdata，键名为file
    //   // formdata会将文件信息序列化为ajax可识别的数据类型
    //   formdata.append("file", file);
    //   console.log(formdata);
    //   $.ajax({
    //     type: "post",
    //     url:
    //       "http://lj.tieqiao.shop/api/common/upload?token=7f9e2ca2-ea65-4ca9-9f71-2945fc49bd2c",
    //     data: formdata, // formdata直接赋值给data
    //     processData: false, //formdata已将数据序列化，无需在处理
    //     contentType: false, //formdata无需设置请求头
    //     success: function(res) {
    //       console.log(res);
    //       // // 将图片预览在img标签
    //       // $('#imgshow').attr('src', res.picAddr);
    //     }
    //   });
    //   // this.axios
    //   //   .post("/api/common/upload", {
    //   //     file: formdata
    //   //   })
    //   //   .then(data => {
    //   //     consoe.log(data);
    //   //   });
    // },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file.content);
      console.log(dataURLtoFile(file.content));

      this.axios
        .post("/api/common/upload", {
          file: dataURLtoFile(file.content, "name")
        })
        .then(data => {
          consoe.log(data);
        });
    },
    submit() {
      if (this.radio && this.radio1) {
      } else {
        this.$toast("请选择货物状态和退款原因");
      }
    }
  }
};
</script>
<style lang="less">
.backMoney {
  color: #333;
  font-size: 13px;
  background-color: #f5f5f5;
  min-height: 93.4vh;
  .detail {
    margin-top: 44px;
    padding-top: 5px;
    .con {
      margin: 10px;
      background-color: #fff;
      padding: 10px;
      border-radius: 5px;
      img {
        border-radius: 5px;
        border: 1px solid #f5f5f5;
      }
      .pro {
        flex: 1;
        margin-left: 10px;
        .name {
          font-size: 16px;
          margin-bottom: 10px;
          color: #333;
        }
        .price {
          color: red;
          font-size: 14px;
          i {
            font-size: 10px;
          }
        }
      }
    }
    .item {
      .pop1 {
        .van-cell__value {
          color: #fc4c4c;
        }
      }
      .pop2 {
        .van-cell__value {
          color: #fc4c4c;
        }
      }
      padding: 5px 10px;
      .van-cell {
        padding: 13px 10px;
        border-radius: 5px;
        &.price {
          font-size: 16px;
          .van-cell__value {
            color: #fc4c4c;
          }
        }
      }
    }
    .items {
      background-color: #fff;
      padding: 13px;
      margin: 5px 10px;
      border-radius: 5px;
      font-size: 14px;
      color: #333;
      p {
        width: 24%;
      }
      input {
        flex: 1;
      }
    }
    .upload {
      background-color: #fff;
      margin: 10px;
      border-radius: 5px;
      padding: 8px;
      p {
        margin-bottom: 10px;
      }
    }
  }
}
</style>