<template>
  <p-map :data="adata" :options="options" />
</template>

<script>
import dataJson from './data/map1.json'
export default {
  data() {
    return {
      adata: [],
      options: {
        title: 'xxx区域分布',
        fieldMap: {
          name: 'province',
          value: 'num'
        }
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.adata = dataJson
    }, 5000)
  }
}
</script>
