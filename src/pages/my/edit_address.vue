<template>
  <div class="edit">
    <tabbar title="编辑收货地址"></tabbar>
    <van-address-edit
      :area-list="areaList"
      :address-info="info"
      show-postal
      show-delete
      show-set-default
      show-search-result
      @save="onSave"
      @delete="onDelete"
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
      address_id: "",
      info: {}
    };
  },
  mounted() {
    this.address_id = this.$route.query.id;
    this.init();
  },
  methods: {
    init() {
      this.axios
        .post("/api/Address/edit", {
          address_id: this.address_id
        })
        .then(data => {
          this.$set(data, "tel", data.phone);
          this.$set(data, "addressDetail", data.details);
          this.$set(data, "postalCode", data.mail);
          this.$set(data, "city", data.city_name);
          this.$set(data, "county", data.district_name);
          this.$set(data, "isDefault", data.status == 1 ? true : false);
          this.$set(data, "areaCode", data.district_id + "");
          this.$set(data, "province", data.province_name);
          this.info = data;
          console.log(this.info);
        });
    },
    onSave(con) {
      this.$toast("save");
      console.log(con);

      this.axios
        .post("/api/Address/edit", {
          address_id: this.address_id,
          name: con.name,
          phone: con.tel,
          mail: con.postalCode,
          areas_id: con.areaCode,
          details: con.addressDetail,
          type: 1,
          status: con.isDefault ? 1 : 0
        })
        .then(data => {
          this.$toast("编辑成功");
          this.$router.push("/address");
        });
    },
    onDelete() {
      this.axios
        .post("/api/Address/del", {
          address_id: this.address_id
        })
        .then(data => {
          this.$toast("删除成功");
          this.$router.push("/address");
        });
    }
  }
};
</script>