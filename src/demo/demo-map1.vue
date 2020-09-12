<template>
  <p-map :data="dataJson" :options="options" />
</template>

<script>
import dataJson from './data/map1.json'
export default {
  data() {
    return {
      dataJson,
      options: {
        title: 'xxx区域分布',
        fieldMap: {
          name: 'province',
          value: 'num'
        }
      }
    }
  }
}
</script>
