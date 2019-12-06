<!--  -->
<template>
  <div class="box">
    <navbar title="试试"></navbar>
    <div class="con">
      <van-cell-group>
        <van-field
          v-model="username"
          required
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          @click-right-icon="$toast('question')"
        />

        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
      </van-cell-group>
      <van-button type="primary" size="large" @click="oCun">存</van-button>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import navbar from "@/components/navbar";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    navbar
  },
  data() {
    //这里存放数据
    return {
      username: "",
      password: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    oCun() {
      localStorage.setItem(("user", this.username), ("pass", this.password));
    }
  },

  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

.box {
  padding-top: 44px;
  .con {
    margin-top: -1px;
  }
}
</style>