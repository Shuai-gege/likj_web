<template>
  <div class="rank">
    <navbar title="排行榜"></navbar>
    <div class="con">
      <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div id="main" style="width: 100%;height:400px;"></div>
    </div>
  </div>
</template>

<script>
import navbar from "../../../components/navbar";
export default {
  components: {
    navbar
  },
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    init() {
      this.axios.post("").then(data => {});
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        xAxis: {
          type: "category"
          //   data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        dataset: {
          // 提供一份数据。
          source: [
            ["1", "2015", "2016", "2017"],
            ["2", 43.3, 85.8, 93.7],
            ["3", 83.1, 73.4, 55.1],
            ["4", 86.4, 65.2, 82.5],
            ["5", 72.4, 53.9, 39.1]
          ]
        },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      });
    }
  }
};
</script>
<style lang="less" scoped>
.rank {
  padding-top: 44px;
  .con {
    margin-top: -1px;
  }
}
</style>
