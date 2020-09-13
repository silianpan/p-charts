<template>
  <p-pie
    :data="PieJson"
    :options="options"
    ref="pieRef"
    @pie-title-click="handleTitleClick"
    @pie-label-click="handleLabelClick"
  />
</template>

<script>
import PieJson from './data/pie2.json'
export default {
  data() {
    return {
      PieJson,
      options: {
        title: 'demo-pie2-收入总计、支出总计占比（万元）',
        colorList: [
          '#2593fc',
          '#38c060',
          '#27c1c1',
          '#705dc8',
          '#3b4771',
          '#f9cb34'
        ],
        fieldMap: {
          time: 'year',
          name: 'subject',
          value: 'budgetNum'
        }
      }
    }
  },
  methods: {
    updateData() {
      this.$refs.pieRef.initData()
    },
    handleTitleClick() {
      console.log('title-click')
    },
    handleLabelClick(data) {
      console.log('label-click', data)
    }
  }
}
</script>
