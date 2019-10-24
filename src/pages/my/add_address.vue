<template>
  <div class="add">
    <tabbar title="添加收货地址"></tabbar>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      style="margin-top:44px;"
    />
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
import areaList from "../../common/js/newArea";
export default {
  components: {
    tabbar
  },
  data() {
    return {
      areaList,
      searchResult: []
    };
  },

  methods: {
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
          this.$router.push("/address");
        });
    }
  }
};
</script>