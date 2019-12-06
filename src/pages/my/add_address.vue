<template>
  <div class="add">
    <tabbar title="添加收货地址"></tabbar>
    <van-address-edit
      :area-list="areaList"
      :address-info="info"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      style="margin-top:44px;"
    />
    <!-- <p style="margin:5px 10px;">图片智能识别</p>
    <van-uploader v-model="oDizhi" :after-read="afterRead" :max-count="1" style="margin:5px 10px;" />
    <img :src="oDizhi" alt style="margin:5px 10px;" />-->
    <van-cell-group>
      <van-field
        v-model="message"
        rows="3"
        autosize
        label="智能填写："
        type="textarea"
        maxlength="100"
        placeholder="粘贴如：河南省郑州市二七区二七广场450000，王小二，13688668866"
        show-word-limit
      />
      <button @click="text" class="btn">确定</button>
    </van-cell-group>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
import areaList from "../../common/js/newArea";
import { upload } from "../../common/js/common";
import axios from "axios";
export default {
  components: {
    tabbar
  },
  data() {
    return {
      areaList,
      searchResult: [],
      message: "", //复制的地址文本
      textAdd: {}, //文本转化的地址对象
      info: {}, //把转化的地址填进去
      oDizhi: [] //地址截图
    };
  },
  mounted() {
    this.img_add();
    this.axios.post("/api/we_chat/getAccessToken").then(data => {});
  },
  methods: {
    afterRead() {
      upload(this.oDizhi[0].content, this.oDizhi[0].file.name).then(data => {
        this.front_card_image = data.url;
        console.log("1111", localStorage.getItem("baseURL") + data.url);
      });
    },
    // 智能识别图片——顺丰快宝开放平台http://open.kuaidihelp.com/home
    img_add() {
      axios
        .get("https://kop.kuaidihelp.com/api", {
          method: "cloud.address.ocr",
          app_id: "",
          sign: "",
          ts: new Date().getTime(),
          url: "https://s2.ax1x.com/2019/12/05/Q8sV81.png"
        })
        .then(res => {});
    },
    // 输入地址文本
    text() {
      console.log(this.smartParse(this.message));
      this.textAdd = this.smartParse(this.message);
      this.$set(this.info, "name", this.textAdd.name);
      this.$set(this.info, "tel", this.textAdd.phone);
      this.$set(this.info, "addressDetail", this.textAdd.address);
      this.$set(this.info, "postalCode", this.textAdd.zipCode);
      this.$set(this.info, "city", this.textAdd.city);
      this.$set(this.info, "county", this.textAdd.county);
      this.$set(this.info, "isDefault", true);
      this.$set(this.info, "areaCode", this.textAdd.countyCode);
      this.$set(this.info, "province", this.textAdd.province);
      console.log(this.info);
    },

    // 保存按钮
    onSave(con) {
      console.log(con);
      this.$toast("save");
      this.axios
        .post("/api/Address/add", {
          name: con.name,
          phone: con.tel,
          mail: con.postalCode,
          areas_id: con.areaCode,
          details: con.addressDetail,
          type: 1,
          status: con.isDefault ? 1 : 0
        })
        .then(data => {
          this.$toast("添加成功");
          setTimeout(() => {
            this.$router.push("/address");
          }, 1000);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.add {
  .van-button::before {
    background: #f0f;
  }
  .van-cell-group {
    position: relative;
  }
  .btn {
    color: #fff;
    padding: 0 6px 1px;
    background: #fc4c4c;
    border-radius: 5px;
    position: absolute;
    bottom: 10px;
    left: 12px;
  }
}
</style>
