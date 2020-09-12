<template>
  <p-map :data="dataJson" />
</template>

<script>
import dataJson from './data/map1.json'
export default {
  data() {
    return {
      dataJson
    }
  }
}
</script>
