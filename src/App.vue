<template>
  <div id="app">
    <h1>p-charts</h1>
    <div class="container">
      <demo-pie1 />
      <demo-pie2 />
    </div>
  </div>
</template>

<script>
import DemoPie1 from '@/demo/demo-pie1'
import DemoPie2 from '@/demo/demo-pie2'
export default {
  name: 'app',
  components: {
    DemoPie1,
    DemoPie2
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
