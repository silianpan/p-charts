<template>
  <div id="app">
    <h1>p-charts</h1>
    <h2>饼图（pie）</h2>
    <div class="container">
      <demo-pie1 />
      <demo-pie2 />
    </div>
    <h2>条形图（bar）</h2>
    <div class="container">
      <demo-bar1 />
      <demo-bar2 />
    </div>
    <h2>柱状图（column）</h2>
    <demo-column1 />
    <demo-column2 />
    <demo-column3 />
    <h2>折线图（line）</h2>
    <demo-line-chart1 />
    <demo-line-chart2 />
  </div>
</template>

<script>
import DemoPie1 from '@/demo/demo-pie1'
import DemoPie2 from '@/demo/demo-pie2'
import DemoBar1 from '@/demo/demo-bar1'
import DemoBar2 from '@/demo/demo-bar2'
import DemoColumn1 from '@/demo/demo-column1'
import DemoColumn2 from '@/demo/demo-column2'
import DemoColumn3 from '@/demo/demo-column3'
import DemoLineChart1 from '@/demo/demo-line-chart1'
import DemoLineChart2 from '@/demo/demo-line-chart2'
export default {
  name: 'app',
  components: {
    DemoPie1,
    DemoPie2,
    DemoBar1,
    DemoBar2,
    DemoColumn1,
    DemoColumn2,
    DemoColumn3,
    DemoLineChart1,
    DemoLineChart2
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(2, 50%);
}
</style>
