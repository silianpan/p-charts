<template>
  <div id="app">
    <demo-pie1 />
    <demo-pie2 />
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
</style>
